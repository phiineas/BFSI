import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft, MessageCircle, Phone, Mail, HelpCircle, FileText, ChevronDown, ChevronUp, Send } from 'lucide-react-native';
import { Button } from '../components/ui/button';

const faqs = [
    { q: 'How do I reset my password?', a: 'Go to Profile > Privacy & Security > Change Password, or use the "Forgot Password" link on the login screen.' },
    { q: 'How can I block my card?', a: 'Navigate to the Cards section, select your card, and tap "Lock Card" to temporarily freeze it.' },
    { q: 'What are the transaction limits?', a: 'Default daily limit is $5,000 for transfers and $10,000 for card payments. You can adjust in Card Settings.' },
    { q: 'How do I enable notifications?', a: 'Go to Profile > Privacy & Security and toggle the notification settings as per your preference.' },
];

export default function HelpSupportScreen() {
    const router = useRouter();
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
    const [message, setMessage] = useState('');

    return (
        <View className="flex-1 bg-background">
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View className="bg-primary pt-14 pb-6 px-6">
                <View className="flex-row items-center gap-4">
                    <TouchableOpacity onPress={() => router.back()}>
                        <ArrowLeft size={24} color="white" />
                    </TouchableOpacity>
                    <Text className="text-xl font-bold text-white">Help & Support</Text>
                </View>
            </View>

            <ScrollView className="flex-1 p-6">
                {/* Contact Options */}
                <Text className="text-lg font-bold text-foreground mb-4">Contact Us</Text>
                <View className="flex-row gap-4 mb-6">
                    <TouchableOpacity className="flex-1 bg-card p-4 rounded-xl border border-border items-center">
                        <View className="h-12 w-12 rounded-full bg-primary/10 items-center justify-center mb-2">
                            <Phone size={24} color="#E91E24" />
                        </View>
                        <Text className="text-foreground font-medium text-sm">Call Us</Text>
                        <Text className="text-muted-foreground text-xs">24/7 Support</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-1 bg-card p-4 rounded-xl border border-border items-center">
                        <View className="h-12 w-12 rounded-full bg-blue-100 items-center justify-center mb-2">
                            <MessageCircle size={24} color="#3b82f6" />
                        </View>
                        <Text className="text-foreground font-medium text-sm">Live Chat</Text>
                        <Text className="text-muted-foreground text-xs">Quick response</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-1 bg-card p-4 rounded-xl border border-border items-center">
                        <View className="h-12 w-12 rounded-full bg-green-100 items-center justify-center mb-2">
                            <Mail size={24} color="#22c55e" />
                        </View>
                        <Text className="text-foreground font-medium text-sm">Email</Text>
                        <Text className="text-muted-foreground text-xs">Reply in 24hrs</Text>
                    </TouchableOpacity>
                </View>

                {/* FAQs */}
                <View className="flex-row items-center justify-between mb-4">
                    <Text className="text-lg font-bold text-foreground">FAQs</Text>
                    <HelpCircle size={20} color="#64748b" />
                </View>
                <View className="bg-card rounded-2xl border border-border mb-6">
                    {faqs.map((faq, i) => (
                        <TouchableOpacity
                            key={i}
                            className={`p-4 ${i < faqs.length - 1 ? 'border-b border-border' : ''}`}
                            onPress={() => setExpandedFaq(expandedFaq === i ? null : i)}
                        >
                            <View className="flex-row items-center justify-between">
                                <Text className="flex-1 text-foreground font-medium pr-4">{faq.q}</Text>
                                {expandedFaq === i ? (
                                    <ChevronUp size={20} color="#64748b" />
                                ) : (
                                    <ChevronDown size={20} color="#64748b" />
                                )}
                            </View>
                            {expandedFaq === i && (
                                <Text className="text-muted-foreground text-sm mt-3">{faq.a}</Text>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Send Message */}
                <Text className="text-lg font-bold text-foreground mb-4">Send us a message</Text>
                <View className="bg-card rounded-2xl border border-border p-4 mb-6">
                    <TextInput
                        className="h-24 text-foreground"
                        placeholder="Describe your issue..."
                        placeholderTextColor="#64748b"
                        multiline
                        textAlignVertical="top"
                        value={message}
                        onChangeText={setMessage}
                    />
                </View>
                <Button size="lg" className="w-full" onPress={() => setMessage('')}>
                    <Send size={20} color="white" />
                    <Text className="text-white font-bold ml-2">Send Message</Text>
                </Button>

                {/* Bottom spacing */}
                <View className="h-8" />
            </ScrollView>
        </View>
    );
}
