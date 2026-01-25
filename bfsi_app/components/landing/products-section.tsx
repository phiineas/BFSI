import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { Wallet, Home, Car, Shield, ArrowRight } from 'lucide-react-native';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';

const products = [
    {
        title: "Savings Accounts",
        description: "Grow your money with high-interest savings.",
        icon: Wallet,
        href: "/products/savings-accounts",
        highlight: "Up to 7.5% p.a.",
        features: ["Zero balance", "Instant transfers"],
    },
    {
        title: "Personal Loans",
        description: "Quick personal loans with competitive rates.",
        icon: Car,
        href: "/products/personal-loans",
        highlight: "Starting 10.5% p.a.",
        features: ["Instant approval", "No collateral"],
    },
    {
        title: "Home Loans",
        description: "Make your dream home a reality.",
        icon: Home,
        href: "/products/home-loans",
        highlight: "Starting 8.5% p.a.",
        features: ["Low rates", "30 years tenure"],
    },
    {
        title: "Insurance Plans",
        description: "Protect what matters most.",
        icon: Shield,
        href: "/products/insurance",
        highlight: "From $10/month",
        features: ["Life insurance", "Health coverage"],
    },
];

export function ProductsSection() {
    const router = useRouter();

    return (
        <View className="py-12 px-6 bg-muted/30">
            <View className="mb-8">
                <Text className="text-2xl font-bold text-foreground">Financial Products</Text>
                <Text className="text-muted-foreground mt-2">Everything you need to manage your finances</Text>
            </View>

            <View className="gap-6">
                {products.map((product) => (
                    <Card key={product.title} className="bg-card">
                        <CardHeader className="flex-row items-start gap-4 space-y-0">
                            <View className="h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                                <product.icon size={24} color="hsl(0, 84%, 51%)" />
                            </View>
                            <View className="flex-1">
                                <CardTitle className="text-lg">{product.title}</CardTitle>
                                <Text className="text-primary text-sm font-semibold mt-1">{product.highlight}</Text>
                            </View>
                        </CardHeader>
                        <CardContent>
                            <Text className="text-muted-foreground text-sm mb-4">{product.description}</Text>
                            <View className="gap-2 mb-4">
                                {product.features.map((feature, i) => (
                                    <View key={i} className="flex-row items-center gap-2">
                                        <View className="h-1.5 w-1.5 rounded-full bg-primary" />
                                        <Text className="text-muted-foreground text-xs">{feature}</Text>
                                    </View>
                                ))}
                            </View>
                            <Button
                                variant="ghost"
                                className="w-full flex-row justify-between pl-0"
                                onPress={() => router.push(product.href as any)}
                            >
                                <Text className="text-primary font-medium">Learn More</Text>
                                <ArrowRight size={16} color="hsl(0, 84%, 51%)" />
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </View>

            <Button variant="outline" className="mt-8 mx-auto" onPress={() => router.push('/(tabs)/products')}>
                <Text className="text-foreground">View All Products</Text>
                <ArrowRight size={16} color="#0f172a" className="ml-2" />
            </Button>
        </View>
    );
}
