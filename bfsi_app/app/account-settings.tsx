import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
import React, { useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Edit2, CheckCircle2 } from 'lucide-react-native';
import { Button } from '../components/ui/button';

export default function AccountSettingsScreen() {
    const router = useRouter();
    const [showSuccess, setShowSuccess] = useState(false);
    const [profile, setProfile] = useState({
        name: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+1 (555) 000-0100',
        address: '123 Main Street, New York, NY 10001',
        dob: 'January 15, 1990',
    });
    const [editing, setEditing] = useState<string | null>(null);

    const handleSave = () => {
        setEditing(null);
        setShowSuccess(true);
    };

    const closeSuccess = () => {
        setShowSuccess(false);
    };

    const fields = [
        { key: 'name', icon: User, label: 'Full Name' },
        { key: 'email', icon: Mail, label: 'Email Address' },
        { key: 'phone', icon: Phone, label: 'Phone Number' },
        { key: 'address', icon: MapPin, label: 'Address' },
        { key: 'dob', icon: Calendar, label: 'Date of Birth' },
    ];

    return (
        <View className="flex-1 bg-background">
            <Stack.Screen options={{ headerShown: false }} />

            {/* Success Modal */}
            <Modal visible={showSuccess} transparent animationType="fade">
                <View className="flex-1 bg-black/50 items-center justify-center p-6">
                    <View className="bg-card rounded-3xl p-8 w-full max-w-sm items-center">
                        <View className="h-20 w-20 rounded-full bg-green-100 items-center justify-center mb-6">
                            <CheckCircle2 size={48} color="#22c55e" />
                        </View>
                        <Text className="text-2xl font-bold text-foreground mb-2">Changes Saved!</Text>
                        <Text className="text-muted-foreground text-center mb-6">
                            Your profile has been updated successfully.
                        </Text>
                        <Button size="lg" className="w-full" onPress={closeSuccess}>
                            <Text className="text-white font-bold">Done</Text>
                        </Button>
                    </View>
                </View>
            </Modal>

            {/* Header */}
            <View className="bg-primary pt-14 pb-6 px-6">
                <View className="flex-row items-center gap-4">
                    <TouchableOpacity onPress={() => router.back()}>
                        <ArrowLeft size={24} color="white" />
                    </TouchableOpacity>
                    <Text className="text-xl font-bold text-white">Account Settings</Text>
                </View>
            </View>

            <ScrollView className="flex-1 p-6">
                {/* Profile Picture */}
                <View className="items-center mb-6">
                    <View className="h-24 w-24 rounded-full bg-primary/10 items-center justify-center mb-3">
                        <User size={40} color="#E91E24" />
                    </View>
                    <TouchableOpacity>
                        <Text className="text-primary font-medium">Change Photo</Text>
                    </TouchableOpacity>
                </View>

                {/* Fields */}
                <View className="gap-4">
                    {fields.map((field) => {
                        const Icon = field.icon;
                        const isEditing = editing === field.key;
                        return (
                            <View key={field.key} className="bg-card p-4 rounded-xl border border-border">
                                <Text className="text-muted-foreground text-xs mb-2">{field.label}</Text>
                                <View className="flex-row items-center">
                                    <Icon size={20} color="#64748b" />
                                    {isEditing ? (
                                        <TextInput
                                            className="flex-1 px-3 py-1 text-foreground text-base"
                                            value={profile[field.key as keyof typeof profile]}
                                            onChangeText={(text) => setProfile({ ...profile, [field.key]: text })}
                                            autoFocus
                                        />
                                    ) : (
                                        <Text className="flex-1 px-3 text-foreground">{profile[field.key as keyof typeof profile]}</Text>
                                    )}
                                    <TouchableOpacity onPress={() => setEditing(isEditing ? null : field.key)}>
                                        <Edit2 size={18} color={isEditing ? '#E91E24' : '#64748b'} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    })}
                </View>

                {/* Save Button */}
                <Button size="lg" className="w-full mt-6" onPress={handleSave}>
                    <Text className="text-white font-bold">Save Changes</Text>
                </Button>
            </ScrollView>
        </View>
    );
}
