import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft, Gift, Headphones, FileText, Bell, Shield, HelpCircle, ArrowRight } from 'lucide-react-native';

const moreOptions = [
    { icon: Gift, label: 'Rewards', desc: 'View and redeem your rewards', color: '#f59e0b' },
    { icon: Headphones, label: 'Customer Support', desc: '24/7 help and assistance', color: '#3b82f6' },
    { icon: FileText, label: 'Statements', desc: 'Download account statements', color: '#8b5cf6' },
    { icon: Bell, label: 'Notifications', desc: 'Manage your alerts', color: '#ec4899' },
    { icon: Shield, label: 'Security', desc: 'Password and biometrics', color: '#10b981' },
    { icon: HelpCircle, label: 'FAQs', desc: 'Frequently asked questions', color: '#6366f1' },
];

export default function MoreScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-background">
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View className="bg-primary pt-14 pb-6 px-6">
                <View className="flex-row items-center gap-4">
                    <TouchableOpacity onPress={() => router.back()}>
                        <ArrowLeft size={24} color="white" />
                    </TouchableOpacity>
                    <Text className="text-xl font-bold text-white">More Options</Text>
                </View>
            </View>

            <ScrollView className="flex-1 p-6">
                <View className="gap-3">
                    {moreOptions.map((option, i) => {
                        const Icon = option.icon;
                        return (
                            <TouchableOpacity key={i} className="flex-row items-center bg-card p-4 rounded-xl border border-border">
                                <View
                                    className="h-12 w-12 rounded-full items-center justify-center mr-4"
                                    style={{ backgroundColor: `${option.color}20` }}
                                >
                                    <Icon size={24} color={option.color} />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-foreground font-medium">{option.label}</Text>
                                    <Text className="text-muted-foreground text-sm">{option.desc}</Text>
                                </View>
                                <ArrowRight size={20} color="#9ca3af" />
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>
        </View>
    );
}
