import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useRouter, Link, Stack } from 'expo-router';
import { Shield, Mail, Lock, Eye, EyeOff, ArrowRight, User } from 'lucide-react-native';
import { Button } from '../components/ui/button';

export default function RegisterScreen() {
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    React.useEffect(() => {
        const { logScreenView } = require('../utils/analytics');
        logScreenView({
            screen_name: 'RegisterScreen',
            screen_class: 'RegisterScreen',
            screen_category: 'auth'
        });
    }, []);

    const handleRegister = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);

            // Analytics: Log Registration
            const { logUserRegistration } = require('../utils/analytics');
            logUserRegistration({
                registration_method: 'email',
                user_type: 'new_customer',
                registration_source: 'register_screen',
                account_type: 'individual'
            });

            router.replace('/(tabs)');
        }, 1500);
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
                <Text className="text-3xl font-bold text-white">Create Account</Text>
                <Text className="text-white/80 mt-2">Join millions of happy customers</Text>
            </View>

            {/* Form Card */}
            <View className="px-6 -mt-8">
                <View className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                    {/* Name */}
                    <View className="mb-5">
                        <Text className="text-sm font-medium text-foreground mb-2">Full Name</Text>
                        <View className="flex-row items-center border border-input rounded-xl bg-background px-4">
                            <User size={20} color="#64748b" />
                            <TextInput
                                className="flex-1 py-3.5 px-3 text-foreground"
                                placeholder="John Doe"
                                placeholderTextColor="#64748b"
                                value={name}
                                onChangeText={setName}
                            />
                        </View>
                    </View>

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
                    <View className="mb-6">
                        <Text className="text-sm font-medium text-foreground mb-2">Password</Text>
                        <View className="flex-row items-center border border-input rounded-xl bg-background px-4">
                            <Lock size={20} color="#64748b" />
                            <TextInput
                                className="flex-1 py-3.5 px-3 text-foreground"
                                placeholder="Create a strong password"
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

                    {/* Register Button */}
                    <Button size="lg" onPress={handleRegister} className="w-full mb-4">
                        <Text className="text-white font-bold">Get Started</Text>
                        <ArrowRight size={20} color="#ffffff" />
                    </Button>

                    {/* Divider */}
                    <View className="flex-row items-center my-4">
                        <View className="flex-1 h-px bg-border" />
                        <Text className="px-4 text-muted-foreground text-sm">Or</Text>
                        <View className="flex-1 h-px bg-border" />
                    </View>

                    {/* Login Link */}
                    <View className="flex-row justify-center">
                        <Text className="text-sm text-muted-foreground">Already have an account? </Text>
                        <Link href="/login" asChild>
                            <TouchableOpacity>
                                <Text className="text-sm font-semibold text-primary">Log in</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>
            </View>

            {/* Terms */}
            <View className="flex-row items-center justify-center gap-2 mt-8 mb-8 px-6">
                <Text className="text-xs text-muted-foreground text-center">
                    By signing up, you agree to our Terms of Service and Privacy Policy
                </Text>
            </View>
        </ScrollView>
    );
}
