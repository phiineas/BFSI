import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Gift, Percent, Star, ArrowRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const BANNER_WIDTH = width - 48;

const bannerAds = [
    {
        id: 1,
        title: 'Get 5% Cashback',
        subtitle: 'On all credit card spends this month',
        icon: Percent,
        colors: ['#E91E24', '#c81e1e'] as const,
    },
    {
        id: 2,
        title: 'Refer & Earn $50',
        subtitle: 'Invite friends and get rewards',
        icon: Gift,
        colors: ['#7c3aed', '#6d28d9'] as const,
    },
    {
        id: 3,
        title: 'Premium Rewards',
        subtitle: 'Unlock exclusive benefits today',
        icon: Star,
        colors: ['#0891b2', '#0e7490'] as const,
    },
];

export function AdBanner() {
    const scrollRef = useRef<ScrollView>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            const nextIndex = (currentIndex + 1) % bannerAds.length;
            setCurrentIndex(nextIndex);
            scrollRef.current?.scrollTo({ x: nextIndex * (BANNER_WIDTH + 12), animated: true });
        }, 5000);

        return () => clearInterval(timer);
    }, [currentIndex]);

    return (
        <View className="py-4">
            <ScrollView
                ref={scrollRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                snapToInterval={BANNER_WIDTH + 12}
                decelerationRate="fast"
                contentContainerStyle={{ paddingHorizontal: 24, gap: 12 }}
                onMomentumScrollEnd={(e) => {
                    const index = Math.round(e.nativeEvent.contentOffset.x / (BANNER_WIDTH + 12));
                    setCurrentIndex(index);
                }}
            >
                {bannerAds.map((ad) => {
                    const Icon = ad.icon;
                    return (
                        <TouchableOpacity key={ad.id} activeOpacity={0.9}>
                            <LinearGradient
                                colors={ad.colors}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{ width: BANNER_WIDTH, borderRadius: 16, padding: 16 }}
                            >
                                <View className="flex-row items-center">
                                    <View className="bg-white/20 h-10 w-10 rounded-full items-center justify-center mr-3">
                                        <Icon size={20} color="white" />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-white font-bold text-base">{ad.title}</Text>
                                        <Text className="text-white/80 text-xs">{ad.subtitle}</Text>
                                    </View>
                                    <ArrowRight size={20} color="white" />
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            {/* Dots */}
            <View className="flex-row justify-center gap-1.5 mt-3">
                {bannerAds.map((_, index) => (
                    <View
                        key={index}
                        className={`h-1.5 rounded-full ${index === currentIndex ? 'w-4 bg-primary' : 'w-1.5 bg-muted-foreground/30'}`}
                    />
                ))}
            </View>
        </View>
    );
}
