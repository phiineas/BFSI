import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { products } from '../../constants/products';
import { Button } from '../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { ArrowLeft, Star, Percent, Banknote, Calendar, Calculator, CheckCircle2, Users, FileText, BadgeCheck, HelpCircle, ArrowRight, Shield } from 'lucide-react-native';

export default function ProductDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const product = products.find(p => p.id === id);

    React.useEffect(() => {
        if (product) {
            const { logScreenView, logViewProductDetail } = require('../../utils/analytics');

            logScreenView({
                screen_name: 'ProductDetailScreen',
                screen_class: 'ProductDetailScreen',
                screen_category: 'product_detail'
            });

            logViewProductDetail({
                product_id: product.id,
                product_name: product.title,
                product_category: product.category || 'general',
                product_interest_rate: product.interestRate,
                product_rating: 4.5, // Assuming a default or calculated rating if not directly available
                is_popular: product.popular
            });
        }
    }, [product]);

    const handleApply = () => {
        if (product) {
            const { logStartApplication } = require('../../utils/analytics');
            logStartApplication({
                product_id: product.id,
                product_name: product.title,
                product_category: product.category || 'general',
                application_source: 'product_detail'
            });
        }
        router.push(`/apply/${id}`);
    };

    if (!product) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="text-foreground">Product not found</Text>
                <Button onPress={() => router.back()} className="mt-4"><Text>Go Back</Text></Button>
            </View>
        );
    }

    const Icon = product.icon;

    return (
        <ScrollView className="flex-1 bg-background">
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header / Nav */}
            <View className="p-4 flex-row items-center border-b border-border bg-background sticky top-0 z-10">
                <TouchableOpacity onPress={() => router.back()} className="p-2">
                    <ArrowLeft size={24} color="#0f172a" />
                </TouchableOpacity>
                <Text className="text-lg font-semibold ml-2 text-foreground" numberOfLines={1}>{product.title}</Text>
            </View>

            {/* Hero Section */}
            <View className="p-6 bg-primary/5">
                <Badge variant="secondary" className="self-start mb-4"><Text>{product.category}</Text></Badge>
                <Text className="text-3xl font-bold text-foreground mb-2">{product.title}</Text>
                <Text className="text-primary font-medium text-lg mb-4">{product.tagline}</Text>
                <Text className="text-muted-foreground text-base mb-6">{product.description}</Text>

                <View className="flex-row items-center gap-2 mb-6">
                    {/* Stars */}
                    <View className="flex-row">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} size={16} fill={s <= Math.floor(product.rating) ? "#2563eb" : "none"} color={s <= Math.floor(product.rating) ? "#2563eb" : "#64748b"} />
                        ))}
                    </View>
                    <Text className="text-foreground font-bold">{product.rating}</Text>
                    <Text className="text-muted-foreground">({product.reviews} reviews)</Text>
                </View>

                <View className="flex-row gap-4">
                    <Button className="flex-1" onPress={() => router.push(`/apply/${product.id}` as any)}>
                        <Text className="text-primary-foreground font-bold">Apply Now</Text>
                        <ArrowRight size={18} color="#ffffff" className="ml-2" />
                    </Button>
                </View>
            </View>

            {/* Quick Overview Card */}
            <View className="p-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="gap-4">
                        <View className="flex-row justify-between items-center border-b border-border pb-3">
                            <View className="flex-row items-center gap-2">
                                <Percent size={16} color="#64748b" />
                                <Text className="text-muted-foreground">Interest Rate</Text>
                            </View>
                            <Text className="font-semibold text-primary">{product.interestRate}</Text>
                        </View>
                        <View className="flex-row justify-between items-center border-b border-border pb-3">
                            <View className="flex-row items-center gap-2">
                                <Banknote size={16} color="#64748b" />
                                <Text className="text-muted-foreground">Processing Fee</Text>
                            </View>
                            <Text className="font-semibold text-foreground">{product.processingFee}</Text>
                        </View>
                        <View className="flex-row justify-between items-center pb-3">
                            <View className="flex-row items-center gap-2">
                                <Calendar size={16} color="#64748b" />
                                <Text className="text-muted-foreground">Tenure</Text>
                            </View>
                            <Text className="font-semibold text-foreground">{product.tenure}</Text>
                        </View>
                    </CardContent>
                </Card>
            </View>

            {/* Features */}
            <View className="p-6 pt-0">
                <Text className="text-xl font-bold text-foreground mb-4">Features</Text>
                <View className="gap-4">
                    {product.detailedFeatures?.map((feature, i) => (
                        <Card key={i}>
                            <CardHeader className="pb-2 flex-row gap-2 items-center space-y-0">
                                <View className="bg-primary/10 p-2 rounded-lg">
                                    <Shield size={20} color="#2563eb" />
                                </View>
                                <CardTitle className="text-base">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Text className="text-muted-foreground text-sm">{feature.description}</Text>
                            </CardContent>
                        </Card>
                    ))}
                </View>
            </View>

            {/* Eligibility */}
            <View className="p-6 pt-0">
                <Text className="text-xl font-bold text-foreground mb-4">Eligibility</Text>
                <Card>
                    <CardContent className="pt-6">
                        <View className="gap-4">
                            {product.eligibility?.map((item, i) => (
                                <View key={i} className="flex-row justify-between items-center border-b border-border pb-2 last:border-0">
                                    <Text className="text-muted-foreground">{item.label}</Text>
                                    <Text className="font-semibold text-foreground">{item.value}</Text>
                                </View>
                            ))}
                        </View>
                    </CardContent>
                </Card>
            </View>

            <View className="h-20" />
        </ScrollView>
    );
}
