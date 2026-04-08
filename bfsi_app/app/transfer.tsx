import { View, Text, TextInput, ScrollView, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft, Send, User, ArrowRight, CheckCircle2, X } from 'lucide-react-native';
import { Button } from '../components/ui/button';

export default function TransferScreen() {
    const router = useRouter();
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const recentContacts = [
        { name: 'John Smith', account: '****4521', avatar: 'JS' },
        { name: 'Sarah Wilson', account: '****7832', avatar: 'SW' },
        { name: 'Mike Brown', account: '****1234', avatar: 'MB' },
    ];

    const handleTransfer = () => {
        if (amount) {
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
                        <Text className="text-2xl font-bold text-foreground mb-2">Transfer Successful!</Text>
                        <Text className="text-muted-foreground text-center mb-4">
                            Your money has been sent successfully
                        </Text>
                        <View className="bg-muted/50 rounded-xl p-4 w-full mb-6">
                            <Text className="text-muted-foreground text-sm text-center">Amount Transferred</Text>
                            <Text className="text-3xl font-bold text-foreground text-center">${amount || '0.00'}</Text>
                            {recipient && (
                                <Text className="text-muted-foreground text-sm text-center mt-2">To: {recipient}</Text>
                            )}
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
                    <Text className="text-xl font-bold text-white">Transfer Money</Text>
                </View>
            </View>

            <ScrollView className="flex-1 p-6">
                {/* Amount Input */}
                <View className="bg-card rounded-2xl p-6 border border-border mb-6">
                    <Text className="text-muted-foreground text-sm mb-2">Enter Amount</Text>
                    <View className="flex-row items-center">
                        <Text className="text-3xl font-bold text-foreground mr-2">$</Text>
                        <TextInput
                            className="flex-1 text-3xl font-bold text-foreground"
                            placeholder="0.00"
                            placeholderTextColor="#9ca3af"
                            keyboardType="decimal-pad"
                            value={amount}
                            onChangeText={setAmount}
                        />
                    </View>
                </View>

                {/* Recipient */}
                <View className="bg-card rounded-2xl p-6 border border-border mb-6">
                    <Text className="text-muted-foreground text-sm mb-4">Send To</Text>
                    <View className="flex-row items-center border border-input rounded-xl bg-background px-4">
                        <User size={20} color="#64748b" />
                        <TextInput
                            className="flex-1 py-3.5 px-3 text-foreground"
                            placeholder="Account number or name"
                            placeholderTextColor="#64748b"
                            value={recipient}
                            onChangeText={setRecipient}
                        />
                    </View>
                </View>

                {/* Recent Contacts */}
                <Text className="text-lg font-bold text-foreground mb-4">Recent Recipients</Text>
                <View className="gap-3 mb-8">
                    {recentContacts.map((contact, i) => (
                        <TouchableOpacity
                            key={i}
                            className="flex-row items-center bg-card p-4 rounded-xl border border-border"
                            onPress={() => setRecipient(contact.name)}
                        >
                            <View className="h-12 w-12 rounded-full bg-primary/10 items-center justify-center mr-4">
                                <Text className="text-primary font-bold">{contact.avatar}</Text>
                            </View>
                            <View className="flex-1">
                                <Text className="text-foreground font-medium">{contact.name}</Text>
                                <Text className="text-muted-foreground text-sm">{contact.account}</Text>
                            </View>
                            <ArrowRight size={20} color="#9ca3af" />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Transfer Button */}
                <Button size="lg" className="w-full" onPress={handleTransfer}>
                    <Send size={20} color="white" />
                    <Text className="text-white font-bold ml-2">Transfer Now</Text>
                </Button>
            </ScrollView>
        </View>
    );
}
