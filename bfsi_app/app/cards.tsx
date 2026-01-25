import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft, CreditCard, Plus, Lock, Eye, Settings, CheckCircle2, X, AlertTriangle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../components/ui/button';

const myCards = [
    {
        id: 1,
        name: 'Sapphire Platinum',
        number: '**** **** **** 4589',
        expiry: '12/28',
        balance: '$12,450.00',
        colors: ['#0f172a', '#334155'] as const,
        locked: false,
    },
    {
        id: 2,
        name: 'Rubyx Gold',
        number: '**** **** **** 7832',
        expiry: '08/27',
        balance: '$5,200.00',
        colors: ['#7f1d1d', '#991b1b'] as const,
        locked: false,
    },
];

export default function CardsScreen() {
    const router = useRouter();
    const [cards, setCards] = useState(myCards);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<'lock' | 'pin' | 'settings'>('lock');
    const [selectedCard, setSelectedCard] = useState<number | null>(null);

    const handleAction = (action: 'lock' | 'pin' | 'settings', cardId: number) => {
        setSelectedCard(cardId);
        setModalType(action);
        setShowModal(true);

        if (action === 'lock') {
            setCards(cards.map(c => c.id === cardId ? { ...c, locked: !c.locked } : c));
        }
    };

    const getCard = () => cards.find(c => c.id === selectedCard);

    return (
        <View className="flex-1 bg-background">
            <Stack.Screen options={{ headerShown: false }} />

            {/* Action Modal */}
            <Modal visible={showModal} transparent animationType="fade">
                <View className="flex-1 bg-black/50 items-center justify-center p-6">
                    <View className="bg-card rounded-3xl p-8 w-full max-w-sm items-center">
                        {modalType === 'lock' && (
                            <>
                                <View className="h-20 w-20 rounded-full bg-orange-100 items-center justify-center mb-6">
                                    <Lock size={40} color="#f59e0b" />
                                </View>
                                <Text className="text-2xl font-bold text-foreground mb-2">
                                    Card {getCard()?.locked ? 'Locked' : 'Unlocked'}
                                </Text>
                                <Text className="text-muted-foreground text-center mb-4">
                                    {getCard()?.locked
                                        ? 'Your card is now temporarily frozen'
                                        : 'Your card is now active'}
                                </Text>
                                <View className="bg-muted/50 rounded-xl p-4 w-full mb-6">
                                    <Text className="text-foreground font-medium text-center">{getCard()?.name}</Text>
                                    <Text className="text-muted-foreground text-sm text-center">{getCard()?.number}</Text>
                                </View>
                            </>
                        )}
                        {modalType === 'pin' && (
                            <>
                                <View className="h-20 w-20 rounded-full bg-blue-100 items-center justify-center mb-6">
                                    <Eye size={40} color="#3b82f6" />
                                </View>
                                <Text className="text-2xl font-bold text-foreground mb-2">Your Card PIN</Text>
                                <Text className="text-muted-foreground text-center mb-4">
                                    Keep this PIN confidential
                                </Text>
                                <View className="bg-muted/50 rounded-xl p-6 w-full mb-6">
                                    <Text className="text-4xl font-bold text-foreground text-center tracking-[0.5em]">1234</Text>
                                </View>
                                <View className="flex-row items-center gap-2 mb-4">
                                    <AlertTriangle size={16} color="#f59e0b" />
                                    <Text className="text-muted-foreground text-xs">This will hide in 30 seconds</Text>
                                </View>
                            </>
                        )}
                        {modalType === 'settings' && (
                            <>
                                <View className="h-20 w-20 rounded-full bg-green-100 items-center justify-center mb-6">
                                    <Settings size={40} color="#22c55e" />
                                </View>
                                <Text className="text-2xl font-bold text-foreground mb-2">Card Settings</Text>
                                <Text className="text-muted-foreground text-center mb-6">
                                    Manage your card preferences
                                </Text>
                                <View className="w-full gap-3 mb-6">
                                    {['Spending Limit: $5,000/day', 'International: Enabled', 'Online Payments: Enabled'].map((setting, i) => (
                                        <View key={i} className="flex-row items-center justify-between bg-muted/50 p-4 rounded-xl">
                                            <Text className="text-foreground text-sm">{setting}</Text>
                                            <CheckCircle2 size={20} color="#22c55e" />
                                        </View>
                                    ))}
                                </View>
                            </>
                        )}
                        <Button size="lg" className="w-full" onPress={() => setShowModal(false)}>
                            <Text className="text-white font-bold">Done</Text>
                        </Button>
                    </View>
                </View>
            </Modal>

            {/* Header */}
            <View className="bg-primary pt-14 pb-6 px-6">
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-4">
                        <TouchableOpacity onPress={() => router.back()}>
                            <ArrowLeft size={24} color="white" />
                        </TouchableOpacity>
                        <Text className="text-xl font-bold text-white">My Cards</Text>
                    </View>
                    <TouchableOpacity>
                        <Plus size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView className="flex-1 p-6">
                {/* Cards */}
                <View className="gap-6 mb-8">
                    {cards.map((card) => (
                        <View key={card.id} className={`rounded-2xl overflow-hidden shadow-lg ${card.locked ? 'opacity-60' : ''}`}>
                            <LinearGradient
                                colors={card.colors}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={{ padding: 24 }}
                            >
                                <View className="flex-row justify-between items-start mb-8">
                                    <View>
                                        <Text className="text-white/80 text-sm">{card.name}</Text>
                                        {card.locked && (
                                            <View className="flex-row items-center gap-1 mt-1">
                                                <Lock size={12} color="#f59e0b" />
                                                <Text className="text-orange-400 text-xs">Locked</Text>
                                            </View>
                                        )}
                                    </View>
                                    <CreditCard size={28} color="white" />
                                </View>
                                <Text className="text-white text-xl tracking-widest font-mono mb-6">
                                    {card.number}
                                </Text>
                                <View className="flex-row justify-between items-end">
                                    <View>
                                        <Text className="text-white/60 text-xs">EXPIRES</Text>
                                        <Text className="text-white font-medium">{card.expiry}</Text>
                                    </View>
                                    <View className="items-end">
                                        <Text className="text-white/60 text-xs">BALANCE</Text>
                                        <Text className="text-white font-bold text-lg">{card.balance}</Text>
                                    </View>
                                </View>
                            </LinearGradient>
                        </View>
                    ))}
                </View>

                {/* Quick Actions */}
                <Text className="text-lg font-bold text-foreground mb-4">Card Actions</Text>
                <View className="gap-3">
                    {[
                        { icon: Lock, label: 'Lock Card', desc: 'Temporarily freeze your card', action: 'lock' as const },
                        { icon: Eye, label: 'View PIN', desc: 'View your card PIN securely', action: 'pin' as const },
                        { icon: Settings, label: 'Card Settings', desc: 'Manage limits and preferences', action: 'settings' as const },
                    ].map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <TouchableOpacity
                                key={i}
                                className="flex-row items-center bg-card p-4 rounded-xl border border-border"
                                onPress={() => handleAction(item.action, cards[0].id)}
                            >
                                <View className="h-10 w-10 rounded-full bg-primary/10 items-center justify-center mr-4">
                                    <Icon size={20} color="#E91E24" />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-foreground font-medium">{item.label}</Text>
                                    <Text className="text-muted-foreground text-sm">{item.desc}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>
        </View>
    );
}
