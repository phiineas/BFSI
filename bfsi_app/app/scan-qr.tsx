import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft, QrCode, Camera, Image as ImageIcon } from 'lucide-react-native';
import { Button } from '../components/ui/button';

const { width } = Dimensions.get('window');

export default function ScanQRScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-black">
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View className="pt-14 pb-6 px-6 bg-black/80 absolute top-0 left-0 right-0 z-10">
                <View className="flex-row items-center gap-4">
                    <TouchableOpacity onPress={() => router.back()}>
                        <ArrowLeft size={24} color="white" />
                    </TouchableOpacity>
                    <Text className="text-xl font-bold text-white">Scan QR Code</Text>
                </View>
            </View>

            {/* Camera Placeholder */}
            <View className="flex-1 items-center justify-center">
                {/* QR Frame */}
                <View
                    style={{ width: width * 0.7, height: width * 0.7 }}
                    className="border-2 border-white rounded-3xl items-center justify-center"
                >
                    <QrCode size={80} color="rgba(255,255,255,0.3)" />
                    <Text className="text-white/50 mt-4 text-center">
                        Point camera at QR code
                    </Text>
                </View>

                {/* Corner markers */}
                <View className="absolute" style={{ width: width * 0.7 + 20, height: width * 0.7 + 20 }}>
                    {/* Top left */}
                    <View className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-xl" />
                    {/* Top right */}
                    <View className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-xl" />
                    {/* Bottom left */}
                    <View className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-xl" />
                    {/* Bottom right */}
                    <View className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-xl" />
                </View>
            </View>

            {/* Bottom Actions */}
            <View className="bg-black/80 px-6 pt-6 pb-10">
                <Text className="text-white/70 text-center text-sm mb-6">
                    Scan QR codes to make payments or receive money
                </Text>
                <View className="flex-row gap-4">
                    <Button variant="outline" className="flex-1 border-white/30 bg-white/10">
                        <ImageIcon size={20} color="white" />
                        <Text className="text-white ml-2">Gallery</Text>
                    </Button>
                    <Button className="flex-1 bg-primary">
                        <QrCode size={20} color="white" />
                        <Text className="text-white ml-2">My QR</Text>
                    </Button>
                </View>
            </View>
        </View>
    );
}
