import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import React, { useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft, Shield, Lock, Fingerprint, Eye, Smartphone, Bell, ArrowRight } from 'lucide-react-native';

export default function PrivacySecurityScreen() {
    const router = useRouter();
    const [settings, setSettings] = useState({
        biometric: true,
        twoFactor: true,
        loginAlerts: true,
        transactionAlerts: true,
        marketingEmails: false,
    });

    const toggleSetting = (key: keyof typeof settings) => {
        setSettings({ ...settings, [key]: !settings[key] });
    };

    return (
        <View className="flex-1 bg-background">
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View className="bg-primary pt-14 pb-6 px-6">
                <View className="flex-row items-center gap-4">
                    <TouchableOpacity onPress={() => router.back()}>
                        <ArrowLeft size={24} color="white" />
                    </TouchableOpacity>
                    <Text className="text-xl font-bold text-white">Privacy & Security</Text>
                </View>
            </View>

            <ScrollView className="flex-1 p-6">
                {/* Security Section */}
                <Text className="text-lg font-bold text-foreground mb-4">Security</Text>
                <View className="bg-card rounded-2xl border border-border mb-6">
                    <TouchableOpacity className="flex-row items-center p-4 border-b border-border">
                        <View className="h-10 w-10 rounded-full bg-primary/10 items-center justify-center mr-4">
                            <Lock size={20} color="#E91E24" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-foreground font-medium">Change Password</Text>
                            <Text className="text-muted-foreground text-xs">Last changed 30 days ago</Text>
                        </View>
                        <ArrowRight size={20} color="#9ca3af" />
                    </TouchableOpacity>

                    <View className="flex-row items-center p-4 border-b border-border">
                        <View className="h-10 w-10 rounded-full bg-primary/10 items-center justify-center mr-4">
                            <Fingerprint size={20} color="#E91E24" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-foreground font-medium">Biometric Login</Text>
                            <Text className="text-muted-foreground text-xs">Use fingerprint or face ID</Text>
                        </View>
                        <Switch
                            value={settings.biometric}
                            onValueChange={() => toggleSetting('biometric')}
                            trackColor={{ false: '#e2e8f0', true: '#E91E24' }}
                            thumbColor="white"
                        />
                    </View>

                    <View className="flex-row items-center p-4">
                        <View className="h-10 w-10 rounded-full bg-primary/10 items-center justify-center mr-4">
                            <Smartphone size={20} color="#E91E24" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-foreground font-medium">Two-Factor Authentication</Text>
                            <Text className="text-muted-foreground text-xs">Extra layer of security</Text>
                        </View>
                        <Switch
                            value={settings.twoFactor}
                            onValueChange={() => toggleSetting('twoFactor')}
                            trackColor={{ false: '#e2e8f0', true: '#E91E24' }}
                            thumbColor="white"
                        />
                    </View>
                </View>

                {/* Notifications Section */}
                <Text className="text-lg font-bold text-foreground mb-4">Notifications</Text>
                <View className="bg-card rounded-2xl border border-border mb-6">
                    <View className="flex-row items-center p-4 border-b border-border">
                        <View className="h-10 w-10 rounded-full bg-blue-100 items-center justify-center mr-4">
                            <Bell size={20} color="#3b82f6" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-foreground font-medium">Login Alerts</Text>
                            <Text className="text-muted-foreground text-xs">Get notified on new logins</Text>
                        </View>
                        <Switch
                            value={settings.loginAlerts}
                            onValueChange={() => toggleSetting('loginAlerts')}
                            trackColor={{ false: '#e2e8f0', true: '#E91E24' }}
                            thumbColor="white"
                        />
                    </View>

                    <View className="flex-row items-center p-4 border-b border-border">
                        <View className="h-10 w-10 rounded-full bg-green-100 items-center justify-center mr-4">
                            <Shield size={20} color="#22c55e" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-foreground font-medium">Transaction Alerts</Text>
                            <Text className="text-muted-foreground text-xs">Notify for every transaction</Text>
                        </View>
                        <Switch
                            value={settings.transactionAlerts}
                            onValueChange={() => toggleSetting('transactionAlerts')}
                            trackColor={{ false: '#e2e8f0', true: '#E91E24' }}
                            thumbColor="white"
                        />
                    </View>

                    <View className="flex-row items-center p-4">
                        <View className="h-10 w-10 rounded-full bg-purple-100 items-center justify-center mr-4">
                            <Eye size={20} color="#8b5cf6" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-foreground font-medium">Marketing Emails</Text>
                            <Text className="text-muted-foreground text-xs">Offers and promotions</Text>
                        </View>
                        <Switch
                            value={settings.marketingEmails}
                            onValueChange={() => toggleSetting('marketingEmails')}
                            trackColor={{ false: '#e2e8f0', true: '#E91E24' }}
                            thumbColor="white"
                        />
                    </View>
                </View>

                {/* Privacy Section */}
                <Text className="text-lg font-bold text-foreground mb-4">Privacy</Text>
                <View className="bg-card rounded-2xl border border-border">
                    <TouchableOpacity className="flex-row items-center p-4 border-b border-border">
                        <Text className="flex-1 text-foreground">Privacy Policy</Text>
                        <ArrowRight size={20} color="#9ca3af" />
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row items-center p-4 border-b border-border">
                        <Text className="flex-1 text-foreground">Terms of Service</Text>
                        <ArrowRight size={20} color="#9ca3af" />
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row items-center p-4">
                        <Text className="flex-1 text-foreground">Data & Permissions</Text>
                        <ArrowRight size={20} color="#9ca3af" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}
