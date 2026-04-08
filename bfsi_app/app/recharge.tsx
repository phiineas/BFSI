import { View, Text, TextInput, ScrollView, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft, Smartphone, Tv, Wifi, Gamepad2, CheckCircle2 } from 'lucide-react-native';
import { Button } from '../components/ui/button';

const rechargeTypes = [
    { icon: Smartphone, label: 'Mobile', active: true },
    { icon: Tv, label: 'DTH', active: false },
    { icon: Wifi, label: 'Broadband', active: false },
    { icon: Gamepad2, label: 'Gaming', active: false },
];

const quickAmounts = ['10', '20', '50', '100', '200'];

export default function RechargeScreen() {
    const router = useRouter();
    const [activeType, setActiveType] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const handleRecharge = () => {
        if (amount && phoneNumber) {
            setShowSuccess(true);
        }
    };

    const closeSuccess = () => {
        setShowSuccess(false);
        router.back();
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
                        <Text className="text-2xl font-bold text-foreground mb-2">Recharge Successful!</Text>
                        <Text className="text-muted-foreground text-center mb-4">
                            Your recharge has been completed
                        </Text>
                        <View className="bg-muted/50 rounded-xl p-4 w-full mb-6">
                            <Text className="text-muted-foreground text-sm text-center">Amount Recharged</Text>
                            <Text className="text-3xl font-bold text-foreground text-center">${amount || '0.00'}</Text>
                            <Text className="text-muted-foreground text-sm text-center mt-2">{rechargeTypes[activeType].label}: {phoneNumber}</Text>
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
                    <Text className="text-xl font-bold text-white">Recharge</Text>
                </View>
            </View>

            <ScrollView className="flex-1 p-6">
                {/* Recharge Types */}
                <View className="flex-row gap-4 mb-6">
                    {rechargeTypes.map((type, i) => {
                        const Icon = type.icon;
                        return (
                            <TouchableOpacity
                                key={i}
                                className={`flex-1 items-center p-4 rounded-xl border ${activeType === i ? 'bg-primary/10 border-primary' : 'bg-card border-border'}`}
                                onPress={() => setActiveType(i)}
                            >
                                <Icon size={24} color={activeType === i ? '#E91E24' : '#64748b'} />
                                <Text className={`text-xs mt-2 font-medium ${activeType === i ? 'text-primary' : 'text-muted-foreground'}`}>
                                    {type.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Phone Number */}
                <View className="bg-card rounded-2xl p-6 border border-border mb-6">
                    <Text className="text-muted-foreground text-sm mb-4">Mobile Number</Text>
                    <View className="flex-row items-center border border-input rounded-xl bg-background px-4">
                        <Smartphone size={20} color="#64748b" />
                        <TextInput
                            className="flex-1 py-3.5 px-3 text-foreground text-lg"
                            placeholder="Enter mobile number"
                            placeholderTextColor="#64748b"
                            keyboardType="phone-pad"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                        />
                    </View>
                </View>

                {/* Amount */}
                <View className="bg-card rounded-2xl p-6 border border-border mb-6">
                    <Text className="text-muted-foreground text-sm mb-4">Amount</Text>
                    <View className="flex-row items-center mb-4">
                        <Text className="text-2xl font-bold text-foreground mr-2">$</Text>
                        <TextInput
                            className="flex-1 text-2xl font-bold text-foreground"
                            placeholder="0.00"
                            placeholderTextColor="#9ca3af"
                            keyboardType="decimal-pad"
                            value={amount}
                            onChangeText={setAmount}
                        />
                    </View>
                    <View className="flex-row flex-wrap gap-2">
                        {quickAmounts.map((amt, i) => (
                            <TouchableOpacity
                                key={i}
                                className={`px-4 py-2 rounded-full ${amount === amt ? 'bg-primary' : 'bg-muted'}`}
                                onPress={() => setAmount(amt)}
                            >
                                <Text className={`font-medium ${amount === amt ? 'text-white' : 'text-foreground'}`}>${amt}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Recharge Button */}
                <Button size="lg" className="w-full" onPress={handleRecharge}>
                    <Text className="text-white font-bold">Recharge Now</Text>
                </Button>
            </ScrollView>
        </View>
    );
}
