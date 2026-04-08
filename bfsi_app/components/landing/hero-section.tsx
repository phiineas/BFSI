import { View, Text, Dimensions, FlatList, ImageBackground, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import React, { useState, useRef } from 'react';
import { useRouter } from 'expo-router';
import { Landmark, TrendingUp, Umbrella, ArrowRight } from 'lucide-react-native';
import { Button } from '../ui/button';

const { width, height } = Dimensions.get('window');
const SLIDE_HEIGHT = height * 0.75;

const slides = [
    {
        id: '1',
        src: require('../../assets/images/skyline0.jpg'),
        title: "Banking Made",
        highlight: "Simple & Secure",
        description: "Experience modern banking with competitive rates, instant approvals, and 24/7 support.",
        icon: Landmark,
        stat: { value: "2M+", label: "Happy Customers" },
    },
    {
        id: '2',
        src: require('../../assets/images/skyline2.jpeg'),
        title: "Grow Your",
        highlight: "Wealth Today",
        description: "High-yield savings accounts and smart investment options to build your future.",
        icon: TrendingUp,
        stat: { value: "8.5%", label: "Max Returns" },
    },
    {
        id: '3',
        src: require('../../assets/images/skyline3.png'),
        title: "Loans That",
        highlight: "Work For You",
        description: "Flexible financing solutions with competitive rates and quick approvals.",
        icon: Umbrella,
        stat: { value: "24hrs", label: "Approval Time" },
    },
];

export function HeroSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);
    const router = useRouter();

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const index = event.nativeEvent.contentOffset.x / slideSize;
        const roundIndex = Math.round(index);

        if (roundIndex !== currentIndex) {
            setCurrentIndex(roundIndex);
        }
    };

    return (
        <View style={{ height: SLIDE_HEIGHT }}>
            <FlatList
                ref={flatListRef}
                data={slides}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false} // Hide scroll bar
                keyExtractor={(item) => item.id}
                onScroll={onScroll} // Track scroll
                renderItem={({ item }) => {
                    const Icon = item.icon;
                    return (
                        <View style={{ width, height: SLIDE_HEIGHT }} className="relative">
                            <ImageBackground
                                source={item.src}
                                className="absolute inset-0 w-full h-full"
                                resizeMode="cover"
                            >
                                <View className="absolute inset-0 bg-black/60" />
                                <View className="flex-1 justify-center px-6 pt-10">
                                    <View className="flex-row items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 self-start mb-6 border border-white/20">
                                        <View className="h-2 w-2 rounded-full bg-primary" />
                                        <Text className="text-white text-xs font-medium">Trusted by 2M+ customers</Text>
                                    </View>

                                    <Text className="text-4xl font-bold text-white leading-tight">
                                        {item.title}
                                    </Text>
                                    <Text className="text-4xl font-bold text-primary leading-tight mb-4">
                                        {item.highlight}
                                    </Text>

                                    <Text className="text-white/90 text-lg mb-8 leading-relaxed">
                                        {item.description}
                                    </Text>

                                    <View className="flex-row gap-4 mb-12">
                                        <Button
                                            size="lg"
                                            className="bg-primary px-6 border-0"
                                            onPress={() => router.push('/(tabs)/products')}
                                        >
                                            Explore Products
                                            <ArrowRight size={18} color="black" />
                                        </Button>
                                    </View>

                                    {/* Stat */}
                                    <View className="flex-row items-center gap-4 border-t border-white/20 pt-6">
                                        <View className="h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                                            <Icon size={24} color="#2563eb" />
                                        </View>
                                        <View>
                                            <Text className="text-white/70 text-sm">{item.stat.label}</Text>
                                            <Text className="text-2xl font-bold text-white">{item.stat.value}</Text>
                                        </View>
                                    </View>
                                </View>
                            </ImageBackground>
                        </View>
                    );
                }}
            />
            {/* Dots */}
            <View className="absolute bottom-10 left-0 right-0 flex-row justify-center gap-2">
                {slides.map((_, index) => (
                    <View
                        key={index}
                        className={`h-2 rounded-full ${index === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-white/50'}`}
                    />
                ))}
            </View>
        </View>
    );
}
