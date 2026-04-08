import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart } from 'lucide-react-native';
import { Button } from '../ui/button';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.75; // 75% of screen width for better sizing

const getGradientColors = (gradientClass: string): readonly [string, string, ...string[]] => {
    if (gradientClass.includes('slate-900')) return ['#0f172a', '#1e293b', '#0f172a'];
    if (gradientClass.includes('red-950')) return ['#450a0a', '#7f1d1d', '#450a0a'];
    if (gradientClass.includes('orange-700')) return ['#c2410c', '#ea580c', '#c2410c'];
    return ['#0f172a', '#1e293b'];
};

const creditCards = [
    {
        id: "sapphire",
        name: "Sapphire",
        badge: "HOT SELLER",
        bgGradient: "from-slate-900 via-slate-800 to-slate-900",
        image: require('../../assets/images/Gemini_Generated_Image_2ntywm2ntywm2nty.png'),
        bestFor: "Premium lifestyle offers",
        features: ["Lounge Access", "Golf Rounds", "BookMyShow Offer"],
    },
    {
        id: "rubyx",
        name: "Rubyx",
        badge: "EXCLUSIVE",
        bgGradient: "from-red-950 via-red-900 to-red-950",
        image: require('../../assets/images/card-ruby.png'),
        bestFor: "High-end lifestyle perks",
        features: ["Welcome Vouchers", "Golf Rounds", "Lounge Access"],
    },
    {
        id: "coral",
        name: "Coral",
        badge: "POPULAR",
        bgGradient: "from-orange-700 via-orange-600 to-orange-700",
        image: require('../../assets/images/card-coral.png'),
        bestFor: "Everyday or on-the-go",
        features: ["Lounge Access", "BookMyShow", "INOX Offers"],
    },
];

export function CreditCardsSection() {
    const router = useRouter();

    return (
        <View className="py-8 bg-background">
            <View className="px-6 mb-6">
                <Text className="text-xl font-bold text-foreground">Choose Your Credit Card</Text>
                <Text className="text-muted-foreground text-sm mt-1">Premium cards for your lifestyle</Text>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 24, gap: 16 }}
                snapToInterval={CARD_WIDTH + 16}
                decelerationRate="fast"
            >
                {creditCards.map((card) => (
                    <View
                        key={card.id}
                        style={{ width: CARD_WIDTH }}
                        className="rounded-2xl overflow-hidden shadow-lg"
                    >
                        <LinearGradient
                            colors={getGradientColors(card.bgGradient)}
                            style={{ padding: 20 }}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            {/* Badge */}
                            <View className="flex-row justify-between items-start mb-4">
                                <View className="bg-primary px-3 py-1 rounded-full">
                                    <Text className="text-white text-xs font-bold">{card.badge}</Text>
                                </View>
                                <TouchableOpacity className="bg-white/10 p-2 rounded-full">
                                    <Heart size={16} color="white" />
                                </TouchableOpacity>
                            </View>

                            {/* Card Image - Fixed size */}
                            <View className="items-center mb-4" style={{ height: 120 }}>
                                <Image
                                    source={card.image}
                                    style={{ width: '90%', height: 120 }}
                                    resizeMode="contain"
                                />
                            </View>

                            {/* Card Info */}
                            <Text className="text-lg font-bold text-white">{card.name}</Text>
                            <Text className="text-white/70 text-sm mb-3">{card.bestFor}</Text>

                            {/* Features */}
                            <View className="flex-row flex-wrap gap-2 mb-4">
                                {card.features.map((feature, i) => (
                                    <View key={i} className="bg-white/10 px-2 py-1 rounded">
                                        <Text className="text-white/80 text-xs">{feature}</Text>
                                    </View>
                                ))}
                            </View>

                            {/* Buttons */}
                            <View className="flex-row gap-3">
                                <Button
                                    className="flex-1 bg-white/20"
                                    onPress={() => router.push(`/apply/${card.id}` as any)}
                                >
                                    <Text className="text-white font-bold text-sm">APPLY</Text>
                                </Button>
                                <Button
                                    className="flex-1 border border-white/30 bg-transparent"
                                    onPress={() => router.push(`/card-details/${card.id}` as any)}
                                >
                                    <Text className="text-white font-bold text-sm">DETAILS</Text>
                                </Button>
                            </View>
                        </LinearGradient>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}
