import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import {
    Send,
    QrCode,
    Receipt,
    Smartphone,
    CreditCard,
    MoreHorizontal
} from 'lucide-react-native';

const actions = [
    { icon: Send, label: 'Transfer', route: '/transfer' },
    { icon: QrCode, label: 'Scan QR', route: '/scan-qr' },
    { icon: Receipt, label: 'Pay Bills', route: '/pay-bills' },
    { icon: Smartphone, label: 'Recharge', route: '/recharge' },
    { icon: CreditCard, label: 'Cards', route: '/cards' },
    { icon: MoreHorizontal, label: 'More', route: '/more' },
];

export function QuickActions() {
    const router = useRouter();

    return (
        <View className="px-6 py-6">
            <Text className="text-lg font-bold text-foreground mb-4">Quick Actions</Text>
            <View className="flex-row flex-wrap justify-between">
                {actions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                        <TouchableOpacity
                            key={index}
                            className="items-center w-[30%] mb-4"
                            onPress={() => router.push(action.route as any)}
                        >
                            <View className="h-14 w-14 rounded-full bg-primary/10 items-center justify-center mb-2">
                                <Icon size={24} color="hsl(0, 84%, 51%)" />
                            </View>
                            <Text className="text-foreground text-xs font-medium">{action.label}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}
