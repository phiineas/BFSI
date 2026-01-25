import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Star, CheckCircle2, Gift, Plane, Film } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../../components/ui/button';

const cardDetails: { [key: string]: any } = {
    sapphire: {
        name: 'Sapphire',
        tagline: 'Premium lifestyle offers',
        colors: ['#0f172a', '#334155'] as const,
        image: require('../../assets/images/Gemini_Generated_Image_2ntywm2ntywm2nty.png'),
        annualFee: '$499',
        minIncome: '$50,000',
        rewards: '5X on travel & dining',
        features: [
            { icon: Plane, text: 'Unlimited airport lounge access' },
            { icon: Gift, text: '10,000 welcome bonus points' },
            { icon: Film, text: 'Buy 1 Get 1 on movies' },
            { icon: Star, text: '5X rewards on travel bookings' },
        ],
        benefits: [
            'Zero forex charges on international transactions',
            'Complimentary golf rounds at premium courses',
            'Priority customer support 24/7',
            'Travel insurance up to $500,000',
        ],
    },
    rubyx: {
        name: 'Rubyx',
        tagline: 'High-end lifestyle perks',
        colors: ['#7f1d1d', '#991b1b'] as const,
        image: require('../../assets/images/card-ruby.png'),
        annualFee: '$299',
        minIncome: '$30,000',
        rewards: '3X on all spends',
        features: [
            { icon: Gift, text: 'Welcome vouchers worth $100' },
            { icon: Plane, text: '8 complimentary lounge visits/year' },
            { icon: Film, text: '25% off on dining' },
            { icon: Star, text: '3X rewards everywhere' },
        ],
        benefits: [
            'Fuel surcharge waiver',
            'EMI conversion on large purchases',
            'Milestone rewards every quarter',
            'Concierge services',
        ],
    },
    coral: {
        name: 'Coral',
        tagline: 'Everyday rewards',
        colors: ['#c2410c', '#ea580c'] as const,
        image: require('../../assets/images/card-coral.png'),
        annualFee: '$99',
        minIncome: '$20,000',
        rewards: '2X on online shopping',
        features: [
            { icon: Plane, text: '4 lounge visits per year' },
            { icon: Film, text: 'MovieMax ticket discounts' },
            { icon: Gift, text: 'Birthday bonus points' },
            { icon: Star, text: '2X on weekend shopping' },
        ],
        benefits: [
            'No annual fee on spending $5,000/year',
            'Instant EMI on POS',
            '1% cashback on utility bills',
            'Add-on cards for family',
        ],
    },
};

export default function CardDetailsScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const card = cardDetails[id || 'sapphire'];

    return (
        <View className="flex-1 bg-background">
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header with Card */}
            <LinearGradient
                colors={card.colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="pt-14 pb-8 px-6"
            >
                <View className="flex-row items-center gap-4 mb-6">
                    <TouchableOpacity onPress={() => router.back()}>
                        <ArrowLeft size={24} color="white" />
                    </TouchableOpacity>
                    <Text className="text-xl font-bold text-white">{card.name} Card</Text>
                </View>

                {/* Card Image */}
                <View className="items-center">
                    <Image
                        source={card.image}
                        style={{ width: 200, height: 130 }}
                        resizeMode="contain"
                    />
                </View>
            </LinearGradient>

            <ScrollView className="flex-1 -mt-4" showsVerticalScrollIndicator={false}>
                {/* Quick Stats */}
                <View className="mx-6 bg-card rounded-2xl p-4 border border-border flex-row mb-6">
                    <View className="flex-1 items-center border-r border-border">
                        <Text className="text-muted-foreground text-xs">Annual Fee</Text>
                        <Text className="text-foreground font-bold text-lg">{card.annualFee}</Text>
                    </View>
                    <View className="flex-1 items-center border-r border-border">
                        <Text className="text-muted-foreground text-xs">Min Income</Text>
                        <Text className="text-foreground font-bold text-lg">{card.minIncome}</Text>
                    </View>
                    <View className="flex-1 items-center">
                        <Text className="text-muted-foreground text-xs">Rewards</Text>
                        <Text className="text-foreground font-bold text-sm">{card.rewards}</Text>
                    </View>
                </View>

                {/* Features */}
                <View className="px-6 mb-6">
                    <Text className="text-lg font-bold text-foreground mb-4">Key Features</Text>
                    <View className="gap-3">
                        {card.features.map((feature: any, i: number) => {
                            const Icon = feature.icon;
                            return (
                                <View key={i} className="flex-row items-center bg-card p-4 rounded-xl border border-border">
                                    <View className="h-10 w-10 rounded-full bg-primary/10 items-center justify-center mr-4">
                                        <Icon size={20} color="#E91E24" />
                                    </View>
                                    <Text className="text-foreground flex-1">{feature.text}</Text>
                                </View>
                            );
                        })}
                    </View>
                </View>

                {/* Benefits */}
                <View className="px-6 mb-8">
                    <Text className="text-lg font-bold text-foreground mb-4">Benefits</Text>
                    <View className="bg-card rounded-2xl p-4 border border-border gap-3">
                        {card.benefits.map((benefit: string, i: number) => (
                            <View key={i} className="flex-row items-start gap-3">
                                <CheckCircle2 size={18} color="#22c55e" />
                                <Text className="text-foreground flex-1 text-sm">{benefit}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Apply Button */}
                <View className="px-6 pb-8">
                    <Button
                        size="lg"
                        className="w-full"
                        onPress={() => router.push(`/apply/${id}` as any)}
                    >
                        <Text className="text-white font-bold">Apply Now</Text>
                    </Button>
                </View>
            </ScrollView>
        </View>
    );
}
