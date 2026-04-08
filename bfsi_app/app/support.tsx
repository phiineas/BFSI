import { View, Text, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import React, { useState } from 'react';
import { useRouter, Stack } from 'expo-router';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Phone, Mail, MessageCircle, MapPin, Clock, Send, HelpCircle, CreditCard, Shield, FileText, ArrowLeft } from 'lucide-react-native';

const supportChannels = [
    {
        icon: Phone,
        title: "Phone Support",
        description: "Talk to our experts",
        contact: "1800-123-4567",
        availability: "24/7 Available",
        color: "hsl(var(--primary))",
        bgColor: "bg-primary/10"
    },
    {
        icon: Mail,
        title: "Email Support",
        description: "Get detailed assistance",
        contact: "support@securebank.com",
        availability: "Response in 24 hrs",
        color: "hsl(var(--destructive))",
        bgColor: "bg-destructive/10"
    },
    {
        icon: MessageCircle,
        title: "Live Chat",
        description: "Instant messaging",
        contact: "Start Chat",
        availability: "9 AM - 9 PM",
        color: "hsl(var(--foreground))",
        bgColor: "bg-muted"
    },
    {
        icon: MapPin,
        title: "Branch Locator",
        description: "Visit us in person",
        contact: "Find Branch",
        availability: "500+ Branches",
        color: "hsl(var(--secondary-foreground))",
        bgColor: "bg-secondary"
    }
];

const quickLinks = [
    { icon: HelpCircle, title: "General Queries" },
    { icon: CreditCard, title: "Account Issues" },
    { icon: Shield, title: "Security & Privacy" },
    { icon: FileText, title: "Documentation" },
];

export default function SupportScreen() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            Alert.alert("Success", "Message sent! We'll get back to you shortly.", [
                { text: "OK", onPress: () => router.back() }
            ]);
        }, 1500);
    };

    return (
        <View className="flex-1 bg-background">
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View className="p-4 flex-row items-center border-b border-border bg-background sticky top-0 z-10">
                <TouchableOpacity onPress={() => router.back()} className="p-2">
                    <ArrowLeft size={24} color="#0f172a" />
                </TouchableOpacity>
                <Text className="text-lg font-semibold ml-2 text-foreground">Support</Text>
            </View>

            <ScrollView className="flex-1">
                {/* Hero */}
                <View className="bg-primary/5 py-8 px-6">
                    <Badge variant="secondary" className="mb-4 self-center bg-primary/20"><Text className="text-primary font-bold">24/7 Support</Text></Badge>
                    <Text className="text-3xl font-bold text-foreground text-center mb-2">How Can We Help?</Text>
                    <Text className="text-muted-foreground text-center">Our dedicated team is here to assist you.</Text>
                </View>

                {/* Channels */}
                <View className="p-6 gap-4">
                    <Text className="text-xl font-bold text-foreground mb-2">Contact Us</Text>
                    <View className="flex-row flex-wrap gap-4">
                        {supportChannels.map((channel, i) => {
                            const Icon = channel.icon;
                            return (
                                <Card key={i} className="w-[47%]">
                                    <CardContent className="p-4 items-center text-center pt-6">
                                        <View className={`h-10 w-10 items-center justify-center rounded-lg ${channel.bgColor} mb-3`}>
                                            <Icon size={20} color={channel.color} />
                                        </View>
                                        <Text className="font-semibold text-foreground text-sm">{channel.title}</Text>
                                        <Text className="text-xs text-muted-foreground mt-1">{channel.contact}</Text>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </View>
                </View>

                {/* Contact Form */}
                <View className="p-6 pt-0">
                    <Card>
                        <CardHeader>
                            <CardTitle>Send Message</CardTitle>
                            <CardDescription>We usually respond within 24 hours.</CardDescription>
                        </CardHeader>
                        <CardContent className="gap-4">
                            <View className="gap-2">
                                <Text className="text-sm font-medium text-foreground">Name</Text>
                                <Input placeholder="Your Name" value={formData.name} onChangeText={(t) => setFormData({ ...formData, name: t })} />
                            </View>
                            <View className="gap-2">
                                <Text className="text-sm font-medium text-foreground">Email</Text>
                                <Input placeholder="you@example.com" value={formData.email} onChangeText={(t) => setFormData({ ...formData, email: t })} />
                            </View>
                            <View className="gap-2">
                                <Text className="text-sm font-medium text-foreground">Message</Text>
                                <Input
                                    placeholder="How can we help?"
                                    multiline
                                    numberOfLines={4}
                                    className="h-24 text-top"
                                    value={formData.message}
                                    onChangeText={(t) => setFormData({ ...formData, message: t })}
                                />
                            </View>
                            <Button className="mt-2" onPress={handleSubmit} disabled={isSubmitting}>
                                <Text className="text-primary-foreground">{isSubmitting ? "Sending..." : "Send Message"}</Text>
                                <Send size={16} color="#ffffff" className="ml-2" />
                            </Button>
                        </CardContent>
                    </Card>
                </View>

                {/* Quick Links */}
                <View className="p-6 pt-0 mb-8">
                    <Text className="text-xl font-bold text-foreground mb-4">Quick Help</Text>
                    <View className="gap-3">
                        {quickLinks.map((link, i) => {
                            const Icon = link.icon;
                            return (
                                <TouchableOpacity key={i} className="flex-row items-center p-3 bg-card border border-border rounded-lg">
                                    <View className="bg-primary/10 p-2 rounded-lg mr-3">
                                        <Icon size={16} color="#2563eb" />
                                    </View>
                                    <Text className="font-medium text-foreground">{link.title}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
