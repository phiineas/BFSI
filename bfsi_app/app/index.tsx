import { View, Text, Image } from 'react-native';
import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Shield } from 'lucide-react-native';

export default function SplashScreen() {
    const router = useRouter();

    useEffect(() => {
        // Navigate to login after 2 seconds
        const timer = setTimeout(() => {
            router.replace('/login');
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View className="flex-1 bg-primary items-center justify-center">
            {/* Logo */}
            <View className="h-24 w-24 bg-white rounded-2xl items-center justify-center mb-6">
                <Shield size={56} color="hsl(0, 84%, 51%)" />
            </View>

            {/* Brand Name */}
            <Text className="text-3xl font-bold text-white mb-2">SecureBank</Text>
            <Text className="text-white/80 text-base">Your Trusted Financial Partner</Text>

            {/* Loading indicator */}
            <View className="absolute bottom-16">
                <Text className="text-white/60 text-sm">Loading...</Text>
            </View>
        </View>
    );
}
