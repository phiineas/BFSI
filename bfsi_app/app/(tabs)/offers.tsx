import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Gift, CreditCard, Plane, ShoppingBag, Utensils, Fuel, Sparkles, Tag, ArrowRight, TrendingUp } from 'lucide-react-native';

const featuredOffers = [
    {
        icon: CreditCard,
        title: "5% Cashback on All Spends",
        description: "Get unlimited 5% cashback on all credit card transactions",
        validity: "Valid till Mar 31, 2026",
        highlight: "Hot Deal",
        color: "hsl(var(--destructive))",
        bgColor: "bg-destructive/10"
    },
    {
        icon: Plane,
        title: "Free Airport Lounge Access",
        description: "Unlimited domestic and international lounge access",
        validity: "Lifetime benefit",
        highlight: "Premium",
        color: "hsl(var(--primary))",
        bgColor: "bg-primary/10"
    },
    {
        icon: ShoppingBag,
        title: "20% Off on Shopping",
        description: "Extra 20% discount on partner e-commerce platforms",
        validity: "Valid till Feb 28, 2026",
        highlight: "Limited Time",
        color: "hsl(var(--secondary-foreground))",
        bgColor: "bg-secondary"
    },
];

const categoryOffers = {
    cards: [
        { title: "Zero Annual Fee", description: "Lifetime free credit card with premium benefits", icon: CreditCard },
        { title: "Reward Points", description: "Earn 10X reward points on every transaction", icon: Gift },
    ],
    travel: [
        { title: "Flight Discounts", description: "Up to ₹10,000 off on flight bookings", icon: Plane },
        { title: "Hotel Offers", description: "Flat 25% off on hotel bookings worldwide", icon: Sparkles },
    ],
    shopping: [
        { title: "E-commerce Deals", description: "Extra cashback on Amazon, Flipkart, and more", icon: ShoppingBag },
        { title: "Dining Offers", description: "Buy 1 Get 1 free at 5,000+ restaurants", icon: Utensils },
    ],
};

export default function OffersScreen() {
    const [activeTab, setActiveTab] = useState<'cards' | 'travel' | 'shopping'>('cards');
    const router = useRouter();

    return (
        <ScrollView className="flex-1 bg-background" showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View className="bg-primary/5 pt-12 pb-8 px-6">
                <Badge variant="secondary" className="mb-4 self-start bg-primary/20"><Text className="text-primary font-bold">Offers & Rewards</Text></Badge>
                <Text className="text-3xl font-bold text-foreground mb-2">Exclusive Offers</Text>
                <Text className="text-muted-foreground text-lg">Unlock deals just for you.</Text>
            </View>

            <View className="p-6">
                <Text className="text-xl font-bold text-foreground mb-4">Featured Deals</Text>
                <View className="gap-6">
                    {featuredOffers.map((offer, i) => {
                        const Icon = offer.icon;
                        return (
                            <Card key={i} className="overflow-hidden">
                                <View className="absolute top-4 right-4 z-10">
                                    <Badge className="bg-primary"><Text className="text-primary-foreground">{offer.highlight}</Text></Badge>
                                </View>
                                <CardHeader className="flex-row items-center gap-4 space-y-0">
                                    <View className={`h-12 w-12 items-center justify-center rounded-xl ${offer.bgColor}`}>
                                        <Icon size={24} color={offer.color} />
                                    </View>
                                    <View className="flex-1">
                                        <CardTitle className="text-lg pr-12">{offer.title}</CardTitle>
                                    </View>
                                </CardHeader>
                                <CardContent>
                                    <Text className="text-muted-foreground mb-4">{offer.description}</Text>
                                    <View className="flex-row items-center gap-2 mb-4">
                                        <Tag size={14} color="#64748b" />
                                        <Text className="text-xs text-muted-foreground">{offer.validity}</Text>
                                    </View>
                                    <Button className="w-full" onPress={() => router.push('/(tabs)/products' as any)}>
                                        <Text className="text-primary-foreground">Claim Offer</Text>
                                    </Button>
                                </CardContent>
                            </Card>
                        )
                    })}
                </View>

                <View className="mt-10">
                    <Text className="text-xl font-bold text-foreground mb-4">Offers by Category</Text>
                    <View className="flex-row bg-muted/20 p-1 rounded-lg mb-6">
                        {(['cards', 'travel', 'shopping'] as const).map((tab) => (
                            <TouchableOpacity
                                key={tab}
                                onPress={() => setActiveTab(tab)}
                                className={`flex-1 py-2 items-center rounded-md ${activeTab === tab ? 'bg-background shadow-sm' : ''}`}
                            >
                                <Text className={`capitalize font-medium ${activeTab === tab ? 'text-foreground' : 'text-muted-foreground'}`}>{tab}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View className="gap-4">
                        {categoryOffers[activeTab].map((offer, i) => {
                            const Icon = offer.icon;
                            return (
                                <Card key={i}>
                                    <CardHeader className="flex-row gap-4 items-center space-y-0">
                                        <View className="bg-primary/10 h-10 w-10 items-center justify-center rounded-lg">
                                            <Icon size={20} color="hsl(0, 84%, 51%)" />
                                        </View>
                                        <View className="flex-1">
                                            <CardTitle className="text-base">{offer.title}</CardTitle>
                                            <CardDescription>{offer.description}</CardDescription>
                                        </View>
                                    </CardHeader>
                                </Card>
                            )
                        })}
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
