import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useRouter, Link, Stack } from 'expo-router';
import { Shield, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react-native';
import { Button } from '../components/ui/button';

export default function LoginScreen() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const router = useRouter();

    const handleLogin = () => {
        router.replace('/(tabs)');
    };

    return (
        <ScrollView contentContainerClassName="flex-grow bg-background" keyboardShouldPersistTaps="handled">
            <Stack.Screen options={{ headerShown: false }} />

            {/* Red Header Section */}
            <View className="bg-primary pt-20 pb-16 px-6 rounded-b-[40px]">
                <View className="flex-row items-center gap-3 mb-6">
                    <View className="h-12 w-12 items-center justify-center rounded-xl bg-white">
                        <Shield size={28} color="hsl(0, 84%, 51%)" />
                    </View>
                    <Text className="text-2xl font-bold text-white">SecureBank</Text>
                </View>
                <Text className="text-3xl font-bold text-white">Welcome Back</Text>
                <Text className="text-white/80 mt-2">Sign in to continue</Text>
            </View>

            {/* Form Card */}
            <View className="px-6 -mt-8">
                <View className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                    {/* Email */}
                    <View className="mb-5">
                        <Text className="text-sm font-medium text-foreground mb-2">Email Address</Text>
                        <View className="flex-row items-center border border-input rounded-xl bg-background px-4">
                            <Mail size={20} color="#64748b" />
                            <TextInput
                                className="flex-1 py-3.5 px-3 text-foreground"
                                placeholder="you@example.com"
                                placeholderTextColor="#64748b"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                    {/* Password */}
                    <View className="mb-5">
                        <Text className="text-sm font-medium text-foreground mb-2">Password</Text>
                        <View className="flex-row items-center border border-input rounded-xl bg-background px-4">
                            <Lock size={20} color="#64748b" />
                            <TextInput
                                className="flex-1 py-3.5 px-3 text-foreground"
                                placeholder="••••••••"
                                placeholderTextColor="#64748b"
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={setPassword}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                {showPassword ? (
                                    <EyeOff size={20} color="#64748b" />
                                ) : (
                                    <Eye size={20} color="#64748b" />
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Remember & Forgot */}
                    <View className="flex-row items-center justify-between mb-6">
                        <TouchableOpacity
                            className="flex-row items-center"
                            onPress={() => setRememberMe(!rememberMe)}
                        >
                            <View className={`h-5 w-5 rounded border mr-2 items-center justify-center ${rememberMe ? 'bg-primary border-primary' : 'border-input'}`}>
                                {rememberMe && <Text className="text-white text-xs">✓</Text>}
                            </View>
                            <Text className="text-sm text-foreground">Remember me</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text className="text-sm font-medium text-primary">Forgot password?</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Login Button */}
                    <Button size="lg" onPress={handleLogin} className="w-full mb-4">
                        <Text className="text-white font-bold">Log In</Text>
                        <ArrowRight size={20} color="#ffffff" />
                    </Button>

                    {/* Divider */}
                    <View className="flex-row items-center my-4">
                        <View className="flex-1 h-px bg-border" />
                        <Text className="px-4 text-muted-foreground text-sm">Or</Text>
                        <View className="flex-1 h-px bg-border" />
                    </View>

                    {/* Register Link */}
                    <View className="flex-row justify-center">
                        <Text className="text-sm text-muted-foreground">Don't have an account? </Text>
                        <Link href="/register" asChild>
                            <TouchableOpacity>
                                <Text className="text-sm font-semibold text-primary">Sign up</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>
            </View>

            {/* Security Badge */}
            <View className="flex-row items-center justify-center gap-2 mt-8 mb-8">
                <Shield size={16} color="#64748b" />
                <Text className="text-xs text-muted-foreground">Protected by 256-bit SSL encryption</Text>
            </View>
        </ScrollView>
    );
}
