import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { products } from '../../constants/products';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Star, ArrowRight, CheckCircle2 } from 'lucide-react-native';
import { Button } from '../../components/ui/button';
import { logScreenView, logViewProductList } from '../../utils/analytics';

const categories = [
    { id: "all", name: "All Products" },
    { id: "accounts", name: "Accounts" },
    { id: "loans", name: "Loans" },
    { id: "insurance", name: "Insurance" },
]

export default function ProductsScreen() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const router = useRouter();

    const filteredProducts = selectedCategory === "all"
        ? products
        : products.filter(p => p.category === selectedCategory);

    React.useEffect(() => {
        logScreenView({
            screen_name: 'ProductsScreen',
            screen_class: 'ProductsScreen',
            screen_category: 'product_listing',
        });

        logViewProductList({
            product_category: selectedCategory,
            product_count: filteredProducts.length,
            filter_applied: selectedCategory,
            user_segment: 'general'
        });
    }, [selectedCategory]);

    return (
        <View className="flex-1 bg-background">
            <View className="py-4 border-b border-border bg-background z-10">
                <Text className="text-2xl font-bold text-foreground px-6 mb-4">Products</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-6 gap-3">
                    {categories.map((cat) => (
                        <TouchableOpacity
                            key={cat.id}
                            onPress={() => setSelectedCategory(cat.id)}
                            className={`px-4 py-2 rounded-full border ${selectedCategory === cat.id ? 'bg-primary border-primary' : 'bg-background border-border'}`}
                        >
                            <Text className={`text-sm font-medium ${selectedCategory === cat.id ? 'text-primary-foreground' : 'text-foreground'}`}>
                                {cat.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <ScrollView contentContainerClassName="p-6 gap-6" showsVerticalScrollIndicator={false}>
                {filteredProducts.map((product) => {
                    const Icon = product.icon;
                    return (
                        <Card key={product.id} className="bg-card">
                            <CardHeader className="flex-row items-start gap-4 space-y-0">
                                <View className="h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                                    <Icon size={24} color="hsl(0, 84%, 51%)" />
                                </View>
                                <View className="flex-1">
                                    <View className="flex-row justify-between items-start">
                                        <View className="flex-1">
                                            <CardTitle className="text-xl">{product.title}</CardTitle>
                                            <Text className="text-primary font-bold text-lg mt-1">{product.highlight}</Text>
                                        </View>
                                        {product.popular && (
                                            <Badge variant="default"><Text>Popular</Text></Badge>
                                        )}
                                    </View>
                                </View>
                            </CardHeader>
                            <CardContent>
                                <Text className="text-muted-foreground mb-4">{product.description}</Text>

                                <View className="flex-row items-center gap-2 mb-4">
                                    <Star size={16} color="hsl(0, 84%, 51%)" fill="hsl(0, 84%, 51%)" />
                                    <Text className="text-foreground font-medium">{product.rating}</Text>
                                    <Text className="text-muted-foreground text-xs">({product.reviews} reviews)</Text>
                                </View>

                                <View className="gap-2 mb-6">
                                    {product.features.slice(0, 3).map((feature, i) => (
                                        <View key={i} className="flex-row items-center gap-2">
                                            <CheckCircle2 size={16} color="hsl(0, 84%, 51%)" />
                                            <Text className="text-muted-foreground text-sm">{feature}</Text>
                                        </View>
                                    ))}
                                </View>

                                <View className="flex-row gap-3">
                                    <Button
                                        variant="outline"
                                        className="flex-1"
                                        onPress={() => router.push(`/products/${product.id}`)}
                                    >
                                        <Text className="text-foreground">Details</Text>
                                    </Button>
                                    <Button
                                        className="flex-1"
                                        onPress={() => router.push(`/apply/${product.id}` as any)}
                                    >
                                        <Text className="text-primary-foreground">Apply</Text>
                                        <ArrowRight size={16} color="#ffffff" className="ml-2" />
                                    </Button>
                                </View>
                            </CardContent>
                        </Card>
                    );
                })}
            </ScrollView>
        </View>
    );
}
