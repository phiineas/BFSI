import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { products } from '../../constants/products';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Checkbox } from '../../components/ui/checkbox';
import { ArrowLeft, User, Briefcase, FileText, CreditCard, CheckCircle2, ArrowRight, Shield, Lock, Check } from 'lucide-react-native';

// Credit card products for apply flow
const creditCards: { [key: string]: { title: string } } = {
    sapphire: { title: 'Sapphire Platinum Card' },
    rubyx: { title: 'Rubyx Gold Card' },
    coral: { title: 'Coral Card' },
};

const steps = [
    { id: 1, title: "Personal", icon: User },
    { id: 2, title: "Employment", icon: Briefcase },
    { id: 3, title: "Documents", icon: FileText },
    { id: 4, title: "Review", icon: CreditCard },
];

export default function ApplyScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const productId = id as string;
    const product = products.find(p => p.id === productId) || creditCards[productId];
    const productTitle = product?.title || `Product ${productId}`;
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [applicationId] = useState(`SB-${Math.floor(Math.random() * 900000 + 100000)}`);
    const { logEvent, logScreenView } = require('../../utils/analytics');

    React.useEffect(() => {
        logScreenView('ApplyScreen', 'ApplyScreen');
        logEvent('begin_checkout', {
            items: [{ item_id: productId, item_name: productTitle }],
            currency: 'USD',
            value: 0
        });
    }, []);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dob: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        employmentType: "salaried",
        companyName: "",
        designation: "",
        monthlyIncome: "",
        idNumber: "",
        hasConsented: false,
    });

    const updateFormData = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNext = () => {
        if (currentStep < steps.length) {
            const nextStep = currentStep + 1;
            setCurrentStep(nextStep);
            logEvent('checkout_progress', {
                checkout_step: nextStep,
                step_name: steps[nextStep - 1].title,
                items: [{ item_id: productId, item_name: productTitle }]
            });
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = () => {
        setIsSubmitting(true);

        logEvent('application_submitted', {
            product_id: productId,
            product_name: productTitle,
            product_category: 'loans', // Dynamic based on product
            application_id: applicationId,
            application_amount: 0,
            application_tenure: 12, // Default
            time_to_complete: 0 // Should track real time
        });

        setTimeout(() => {
            setIsSubmitting(false);
            setShowSuccess(true);
        }, 2000);
    };

    const closeSuccess = () => {
        setShowSuccess(false);
        router.replace('/(tabs)');
    };

    const StepIcon = steps[currentStep - 1].icon;

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
                        <Text className="text-2xl font-bold text-foreground mb-2 text-center">Application Submitted!</Text>
                        <Text className="text-muted-foreground text-center mb-4">
                            Your {productTitle} application has been received successfully.
                        </Text>
                        <View className="bg-muted/50 rounded-xl p-4 w-full mb-4">
                            <Text className="text-muted-foreground text-sm text-center">Application ID</Text>
                            <Text className="text-2xl font-bold text-foreground text-center">{applicationId}</Text>
                        </View>
                        <Text className="text-xs text-muted-foreground text-center mb-6">
                            We'll contact you within 24-48 hours with an update.
                        </Text>
                        <Button size="lg" className="w-full" onPress={closeSuccess}>
                            <Text className="text-white font-bold">Back to Home</Text>
                        </Button>
                    </View>
                </View>
            </Modal>

            {/* Header */}
            <View className="p-4 flex-row items-center border-b border-border bg-background sticky top-0 z-10">
                <TouchableOpacity onPress={() => router.back()} className="p-2">
                    <ArrowLeft size={24} color="#0f172a" />
                </TouchableOpacity>
                <View className="ml-2">
                    <Text className="text-sm text-muted-foreground">Applying for</Text>
                    <Text className="text-base font-semibold text-foreground">{productTitle}</Text>
                </View>
            </View>

            {/* Progress Bar */}
            <View className="px-6 py-4 border-b border-border bg-card">
                <View className="flex-row justify-between mb-2">
                    <Text className="text-sm font-medium text-foreground">Step {currentStep} of {steps.length}</Text>
                    <Text className="text-sm text-muted-foreground">{Math.round((currentStep / steps.length) * 100)}% complete</Text>
                </View>
                <View className="h-2 bg-muted rounded-full overflow-hidden">
                    <View className="h-full bg-primary" style={{ width: `${(currentStep / steps.length) * 100}%` }} />
                </View>

                <View className="flex-row justify-between mt-4 px-2">
                    {steps.map((step) => (
                        <View key={step.id} className="items-center gap-1">
                            <View className={`h-8 w-8 rounded-full items-center justify-center border ${step.id <= currentStep ? 'bg-primary border-primary' : 'bg-background border-muted-foreground/30'}`}>
                                {step.id < currentStep ? (
                                    <CheckCircle2 size={16} color="white" />
                                ) : (
                                    <step.icon size={14} color={step.id === currentStep ? "white" : "hsl(var(--muted-foreground))"} />
                                )}
                            </View>
                            <Text className="text-[10px] text-muted-foreground">{step.title}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <ScrollView className="flex-1 p-6">
                <Card className="mb-8">
                    <CardHeader>
                        <View className="flex-row items-center gap-2">
                            <StepIcon size={20} color="#2563eb" />
                            <CardTitle>{steps[currentStep - 1].title}</CardTitle>
                        </View>
                        <CardDescription>
                            {currentStep === 1 && "Please provide your personal information"}
                            {currentStep === 2 && "Tell us about your employment"}
                            {currentStep === 3 && "Upload your verification documents"}
                            {currentStep === 4 && "Review your application before submitting"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="gap-4">
                        {currentStep === 1 && (
                            <>
                                <View className="gap-2">
                                    <Text className="text-sm font-medium text-foreground">First Name</Text>
                                    <Input placeholder="John" value={formData.firstName} onChangeText={(t) => updateFormData('firstName', t)} />
                                </View>
                                <View className="gap-2">
                                    <Text className="text-sm font-medium text-foreground">Last Name</Text>
                                    <Input placeholder="Doe" value={formData.lastName} onChangeText={(t) => updateFormData('lastName', t)} />
                                </View>
                                <View className="gap-2">
                                    <Text className="text-sm font-medium text-foreground">Email</Text>
                                    <Input placeholder="john@example.com" value={formData.email} onChangeText={(t) => updateFormData('email', t)} />
                                </View>
                                <View className="gap-2">
                                    <Text className="text-sm font-medium text-foreground">Phone</Text>
                                    <Input placeholder="+1 555 000 0000" value={formData.phone} onChangeText={(t) => updateFormData('phone', t)} />
                                </View>
                            </>
                        )}

                        {currentStep === 2 && (
                            <>
                                <View className="gap-2">
                                    <Text className="text-sm font-medium text-foreground">Employment Type</Text>
                                    <View className="flex-row gap-2">
                                        {['salaried', 'self-employed', 'business'].map((type) => (
                                            <TouchableOpacity
                                                key={type}
                                                onPress={() => updateFormData('employmentType', type)}
                                                className={`flex-1 p-3 border rounded-lg items-center ${formData.employmentType === type ? 'border-primary bg-primary/5' : 'border-input'}`}
                                            >
                                                <Text className={`text-xs font-medium capitalize ${formData.employmentType === type ? 'text-primary' : 'text-muted-foreground'}`}>{type}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>
                                <View className="gap-2">
                                    <Text className="text-sm font-medium text-foreground">Company Name</Text>
                                    <Input placeholder="Acme Corp" value={formData.companyName} onChangeText={(t) => updateFormData('companyName', t)} />
                                </View>
                                <View className="gap-2">
                                    <Text className="text-sm font-medium text-foreground">Monthly Income ($)</Text>
                                    <Input placeholder="5000" keyboardType="numeric" value={formData.monthlyIncome} onChangeText={(t) => updateFormData('monthlyIncome', t)} />
                                </View>
                            </>
                        )}

                        {currentStep === 3 && (
                            <>
                                <View className="gap-2">
                                    <Text className="text-sm font-medium text-foreground">Document Number</Text>
                                    <Input placeholder="ID Number" value={formData.idNumber} onChangeText={(t) => updateFormData('idNumber', t)} />
                                </View>
                                <View className="p-8 border-2 border-dashed border-border rounded-lg items-center justify-center bg-muted/20">
                                    <FileText size={32} color="#64748b" />
                                    <Text className="text-sm text-muted-foreground mt-2">Tap to upload document</Text>
                                </View>
                                <View className="bg-primary/5 p-4 rounded-lg flex-row gap-2">
                                    <Lock size={16} color="#2563eb" />
                                    <Text className="text-xs text-muted-foreground flex-1">Your data is encrypted and secure.</Text>
                                </View>
                            </>
                        )}

                        {currentStep === 4 && (
                            <>
                                <View className="bg-muted/50 p-4 rounded-lg gap-2">
                                    <Text className="font-semibold text-foreground">Personal Details</Text>
                                    <Text className="text-sm text-muted-foreground">Name: {formData.firstName} {formData.lastName}</Text>
                                    <Text className="text-sm text-muted-foreground">Email: {formData.email}</Text>
                                </View>
                                <View className="bg-muted/50 p-4 rounded-lg gap-2">
                                    <Text className="font-semibold text-foreground">Employment</Text>
                                    <Text className="text-sm text-muted-foreground capitalize">Type: {formData.employmentType}</Text>
                                    <Text className="text-sm text-muted-foreground">Income: ${formData.monthlyIncome}</Text>
                                </View>

                                <View className="flex-row items-center gap-3 mt-4">
                                    <Checkbox checked={formData.hasConsented} onCheckedChange={(c) => updateFormData('hasConsented', c)} />
                                    <Text className="flex-1 text-xs text-muted-foreground">
                                        I agree to the Terms & Conditions and Privacy Policy. I authorize verification of my details.
                                    </Text>
                                </View>
                            </>
                        )}

                        <View className="flex-row gap-3 mt-6 pt-4 border-t border-border">
                            <Button
                                variant="outline"
                                className="flex-1"
                                disabled={currentStep === 1}
                                onPress={handlePrevious}
                            >
                                <Text>Previous</Text>
                            </Button>
                            {currentStep < steps.length ? (
                                <Button className="flex-1" onPress={handleNext}>
                                    <Text>Next Step</Text>
                                    <ArrowRight size={16} color="white" className="ml-2" />
                                </Button>
                            ) : (
                                <Button
                                    className="flex-1"
                                    disabled={!formData.hasConsented || isSubmitting}
                                    onPress={handleSubmit}
                                >
                                    <Text>{isSubmitting ? "Processing..." : "Submit Application"}</Text>
                                </Button>
                            )}
                        </View>
                    </CardContent>
                </Card>

                <View className="flex-row justify-center gap-4 mb-10">
                    <View className="flex-row items-center gap-1">
                        <Shield size={12} color="#2563eb" />
                        <Text className="text-[10px] text-muted-foreground">256-bit SSL</Text>
                    </View>
                    <View className="flex-row items-center gap-1">
                        <Lock size={12} color="#2563eb" />
                        <Text className="text-[10px] text-muted-foreground">Secure Bank</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
