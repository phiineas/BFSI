import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft, Zap, Wifi, Tv, Phone, Droplets, Home, ArrowRight, CheckCircle2 } from 'lucide-react-native';
import { Button } from '../components/ui/button';

const billCategories = [
    { icon: Zap, label: 'Electricity', color: '#f59e0b' },
    { icon: Droplets, label: 'Water', color: '#3b82f6' },
    { icon: Wifi, label: 'Internet', color: '#8b5cf6' },
    { icon: Tv, label: 'DTH / Cable', color: '#ec4899' },
    { icon: Phone, label: 'Landline', color: '#10b981' },
    { icon: Home, label: 'Rent', color: '#6366f1' },
];

const recentBills = [
    { name: 'City Power Corp', amount: '$125.00', status: 'Due in 5 days', type: 'Electricity' },
    { name: 'AquaWorks', amount: '$45.00', status: 'Due in 10 days', type: 'Water' },
    { name: 'FiberNet Pro', amount: '$79.99', status: 'Paid', type: 'Internet' },
];

export default function PayBillsScreen() {
    const router = useRouter();
    const [showSuccess, setShowSuccess] = useState(false);
    const [selectedBill, setSelectedBill] = useState<typeof recentBills[0] | null>(null);

    const handlePayBill = (bill: typeof recentBills[0]) => {
        if (bill.status !== 'Paid') {
            setSelectedBill(bill);
            setShowSuccess(true);
        }
    };

    const closeSuccess = () => {
        setShowSuccess(false);
        setSelectedBill(null);
    };

    return (
        <View className="flex-1 bg-background">
            <Stack.Screen options={{ headerShown: false }} />

            {/* Success Modal */}
            <Modal visible={showSuccess} transparent animationType="fade">
                <View className="flex-1 bg-black/50 items-center justify-center p-6">
                    <View className="bg-card rounded-3xl p-8 w-full max-w-sm items-center">
                        <View className="h-20 w-20 rounded-full bg-green-100 items-center justify-center mb-6">
                            <CheckCircle2 size={48} color="#22c55e" />
                        </View>
                        <Text className="text-2xl font-bold text-foreground mb-2">Payment Successful!</Text>
                        <Text className="text-muted-foreground text-center mb-4">
                            Your bill payment has been processed
                        </Text>
                        <View className="bg-muted/50 rounded-xl p-4 w-full mb-4">
                            <Text className="text-muted-foreground text-sm text-center">Amount Paid</Text>
                            <Text className="text-3xl font-bold text-foreground text-center">{selectedBill?.amount}</Text>
                            <Text className="text-muted-foreground text-sm text-center mt-1">To: {selectedBill?.name}</Text>
                        </View>
                        <View className="bg-muted/50 rounded-xl p-3 w-full mb-6">
                            <Text className="text-muted-foreground text-xs text-center">Transaction ID</Text>
                            <Text className="text-foreground font-medium text-center">TXN-{Math.floor(Math.random() * 900000 + 100000)}</Text>
                        </View>
                        <Button size="lg" className="w-full" onPress={closeSuccess}>
                            <Text className="text-white font-bold">Done</Text>
                        </Button>
                    </View>
                </View>
            </Modal>

            {/* Header */}
            <View className="bg-primary pt-14 pb-6 px-6">
                <View className="flex-row items-center gap-4">
                    <TouchableOpacity onPress={() => router.back()}>
                        <ArrowLeft size={24} color="white" />
                    </TouchableOpacity>
                    <Text className="text-xl font-bold text-white">Pay Bills</Text>
                </View>
            </View>

            <ScrollView className="flex-1 p-6">
                {/* Categories */}
                <Text className="text-lg font-bold text-foreground mb-4">Bill Categories</Text>
                <View className="flex-row flex-wrap gap-4 mb-8">
                    {billCategories.map((cat, i) => {
                        const Icon = cat.icon;
                        return (
                            <TouchableOpacity key={i} className="items-center" style={{ width: '28%' }}>
                                <View
                                    className="h-14 w-14 rounded-full items-center justify-center mb-2"
                                    style={{ backgroundColor: `${cat.color}20` }}
                                >
                                    <Icon size={24} color={cat.color} />
                                </View>
                                <Text className="text-foreground text-xs font-medium text-center">{cat.label}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Recent Bills */}
                <Text className="text-lg font-bold text-foreground mb-4">Recent Bills</Text>
                <View className="gap-3">
                    {recentBills.map((bill, i) => (
                        <TouchableOpacity
                            key={i}
                            className="flex-row items-center bg-card p-4 rounded-xl border border-border"
                            onPress={() => handlePayBill(bill)}
                        >
                            <View className="flex-1">
                                <Text className="text-foreground font-medium">{bill.name}</Text>
                                <Text className="text-muted-foreground text-sm">{bill.type}</Text>
                            </View>
                            <View className="items-end mr-3">
                                <Text className="text-foreground font-bold">{bill.amount}</Text>
                                <Text className={`text-xs ${bill.status === 'Paid' ? 'text-green-500' : 'text-orange-500'}`}>
                                    {bill.status}
                                </Text>
                            </View>
                            {bill.status !== 'Paid' ? (
                                <View className="bg-primary px-3 py-1.5 rounded-lg">
                                    <Text className="text-white text-xs font-bold">PAY</Text>
                                </View>
                            ) : (
                                <CheckCircle2 size={20} color="#22c55e" />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
