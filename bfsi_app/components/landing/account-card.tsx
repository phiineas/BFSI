import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Eye, EyeOff, ArrowUpRight, ArrowDownLeft } from 'lucide-react-native';

export function AccountCard() {
    const [showBalance, setShowBalance] = React.useState(true);

    return (
        <View className="mx-6 p-5 bg-card rounded-2xl border border-border shadow-sm">
            {/* Balance Row */}
            <View className="flex-row items-center justify-between mb-2">
                <Text className="text-muted-foreground text-sm">Total Balance</Text>
                <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
                    {showBalance ? (
                        <Eye size={18} color="#64748b" />
                    ) : (
                        <EyeOff size={18} color="#64748b" />
                    )}
                </TouchableOpacity>
            </View>

            <Text className="text-foreground text-3xl font-bold mb-4">
                {showBalance ? '$24,580.50' : '••••••'}
            </Text>

            {/* Quick Stats */}
            <View className="flex-row gap-4">
                <View className="flex-1 bg-green-50 dark:bg-green-900/20 p-3 rounded-xl flex-row items-center gap-2">
                    <View className="bg-green-500/20 p-1.5 rounded-full">
                        <ArrowDownLeft size={14} color="#22c55e" />
                    </View>
                    <View>
                        <Text className="text-xs text-muted-foreground">Income</Text>
                        <Text className="text-sm font-semibold text-foreground">+$3,250</Text>
                    </View>
                </View>
                <View className="flex-1 bg-red-50 dark:bg-red-900/20 p-3 rounded-xl flex-row items-center gap-2">
                    <View className="bg-red-500/20 p-1.5 rounded-full">
                        <ArrowUpRight size={14} color="#ef4444" />
                    </View>
                    <View>
                        <Text className="text-xs text-muted-foreground">Expense</Text>
                        <Text className="text-sm font-semibold text-foreground">-$1,125</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}
