import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { AccountCard } from '../../components/landing/account-card';
import { QuickActions } from '../../components/landing/quick-actions';
import { AdBanner } from '../../components/landing/ad-banner';
import { CreditCardsSection } from '../../components/landing/credit-cards-section';
import { ProductsSection } from '../../components/landing/products-section';

export default function HomeScreen() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  return (
    <ScrollView className="flex-1 bg-background" showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View className="bg-primary pt-14 pb-8 px-6 rounded-b-3xl">
        <Text className="text-white/80 text-sm">{greeting}</Text>
        <Text className="text-2xl font-bold text-white">John Doe</Text>
      </View>

      {/* Account Card - overlapping header */}
      <View className="-mt-4">
        <AccountCard />
      </View>

      {/* Quick Actions */}
      <QuickActions />

      {/* Ad Banner - auto scrolling */}
      <AdBanner />

      {/* Credit Cards */}
      <CreditCardsSection />

      {/* Products */}
      <ProductsSection />

      {/* Bottom spacing */}
      <View className="h-24" />
    </ScrollView>
  );
}
