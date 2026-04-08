import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { Phone, LogOut, Settings, HelpCircle, ChevronRight, User, Shield, CreditCard, Wallet } from 'lucide-react-native';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';

export default function ProfileScreen() {
    const router = useRouter();

    const menuItems = [
        { label: "Account Settings", icon: Settings, route: '/account-settings' },
        { label: "Privacy & Security", icon: Shield, route: '/privacy-security' },
        { label: "Help & Support", icon: HelpCircle, route: '/help-support' },
    ];

    const handleLogout = () => {
        router.replace('/login');
    };

    return (
        <ScrollView className="flex-1 bg-background" showsVerticalScrollIndicator={false}>
            <View className="bg-primary pt-16 pb-12 px-6 rounded-b-[30px] shadow-lg">
                <View className="flex-row items-center gap-4">
                    <View className="h-16 w-16 rounded-full bg-white items-center justify-center border-2 border-white/50">
                        <User size={32} color="hsl(0, 84%, 51%)" />
                    </View>
                    <View>
                        <Text className="text-2xl font-bold text-white">John Doe</Text>
                        <Text className="text-white/80">+1 (555) 000-0000</Text>
                    </View>
                </View>
            </View>

            <View className="px-6 -mt-8">
                <Card className="p-4 bg-card shadow-sm flex-row justify-between">
                    <View className="items-center flex-1">
                        <Text className="text-muted-foreground text-xs uppercase mb-1">Savings</Text>
                        <Text className="text-lg font-bold text-foreground">$12,450</Text>
                    </View>
                    <View className="w-[1px] bg-border mx-2" />
                    <View className="items-center flex-1">
                        <Text className="text-muted-foreground text-xs uppercase mb-1">Credit Limit</Text>
                        <Text className="text-lg font-bold text-foreground">$5,000</Text>
                    </View>
                </Card>
            </View>

            <View className="p-6">
                <Text className="text-lg font-bold text-foreground mb-4">My Products</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-4 -mx-6 px-6 pb-2">
                    <View className="w-40 bg-blue-900 p-4 rounded-xl h-24 justify-between">
                        <Wallet size={20} color="white" />
                        <View>
                            <Text className="text-white/70 text-xs">Savings</Text>
                            <Text className="text-white font-bold">**** 4589</Text>
                        </View>
                    </View>
                    <View className="w-40 bg-slate-900 p-4 rounded-xl h-24 justify-between">
                        <CreditCard size={20} color="white" />
                        <View>
                            <Text className="text-white/70 text-xs">Platinum</Text>
                            <Text className="text-white font-bold">**** 8892</Text>
                        </View>
                    </View>
                </ScrollView>

                <View className="mt-8 gap-4">
                    {menuItems.map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <TouchableOpacity
                                key={i}
                                className="flex-row items-center p-4 bg-card rounded-xl border border-border"
                                onPress={() => router.push(item.route as any)}
                            >
                                <View className="bg-muted p-2 rounded-full mr-4">
                                    <Icon size={20} color="#0f172a" />
                                </View>
                                <Text className="flex-1 font-medium text-foreground">{item.label}</Text>
                                <ChevronRight size={20} color="#64748b" />
                            </TouchableOpacity>
                        )
                    })}
                </View>

                <Button variant="destructive" className="mt-8 w-full" onPress={handleLogout}>
                    <LogOut size={18} color="white" className="mr-2" />
                    <Text className="text-white font-bold">Log Out</Text>
                </Button>

                <View className="items-center mt-8 mb-4">
                    <Text className="text-xs text-muted-foreground">Version 1.0.0</Text>
                </View>
            </View>
        </ScrollView>
    );
}
