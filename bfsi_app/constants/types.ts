import { LucideIcon } from 'lucide-react-native';

export interface Product {
    id: string;
    title: string;
    tagline: string;
    description: string;
    icon: LucideIcon;
    category: string;
    highlight: string;
    interestRate: string;
    processingFee: string;
    tenure: string;
    minAmount: string;
    maxAmount: string;
    rating: number;
    reviews: number;
    popular: boolean;
    features: string[];
    detailedFeatures?: { title: string; description: string }[];
    eligibility?: { label: string; value: string }[];
    documents?: string[];
    benefits?: string[];
    faqs?: { question: string; answer: string }[];
    color?: string; // For offers
    bgColor?: string; // For offers
    validity?: string; // For offers
}
