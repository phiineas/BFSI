import { Wallet, Car, Home, Shield, TrendingUp, Clock, FileText, Users, BadgeCheck, Percent, Banknote, Calendar, HelpCircle, CheckCircle2 } from 'lucide-react-native';
import { Product } from './types';

export const products: Product[] = [
    {
        id: "savings-account",
        title: "Premium Savings Account",
        tagline: "Earn more on every rupee you save",
        description: "Our Premium Savings Account offers one of the highest interest rates in the industry with zero balance requirements.",
        icon: Wallet,
        category: "accounts",
        highlight: "7.5% p.a.",
        interestRate: "7.5% p.a.",
        processingFee: "Zero",
        tenure: "N/A",
        minAmount: "$0",
        maxAmount: "Unlimited",
        rating: 4.8,
        reviews: 2840,
        popular: true,
        features: ["Zero minimum balance", "Free debit card", "Unlimited transfers", "24/7 customer support"],
        detailedFeatures: [
            { title: "Zero Balance Account", description: "No minimum balance requirement ever." },
            { title: "High Interest Rate", description: "Earn up to 7.5% per annum." },
            { title: "Free Debit Card", description: "Complimentary premium debit card." },
        ],
        eligibility: [
            { label: "Age", value: "18 - 70 years" },
            { label: "Citizenship", value: "US Resident / Citizen" },
        ],
        documents: ["Government ID", "Proof of address", "Photo"],
        benefits: ["Industry-leading interest rate", "Zero charges", "Instant transfers"],
        faqs: [
            { question: "Minimum balance?", answer: "Zero." },
            { question: "Interest calc?", answer: "Daily." },
        ]
    },
    {
        id: "personal-loan",
        title: "Personal Loan",
        tagline: "Quick funds for all your needs",
        description: "Get instant approval on personal loans with minimal documentation.",
        icon: Car,
        category: "loans",
        highlight: "10.5% p.a.",
        interestRate: "10.5% - 18% p.a.",
        processingFee: "Up to 2%",
        tenure: "12 - 60 months",
        minAmount: "$1,000",
        maxAmount: "$50,000",
        rating: 4.6,
        reviews: 3200,
        popular: true,
        features: ["Instant approval", "Minimal documentation", "Flexible tenure", "No collateral"],
        detailedFeatures: [
            { title: "Instant Approval", description: "Get loan approval in as little as 2 minutes." },
            { title: "Minimal Documentation", description: "Just 2 documents needed." },
        ],
        eligibility: [
            { label: "Age", value: "21 - 58 years" },
            { label: "Income", value: "$25,000 p.a." },
        ],
        documents: ["Government ID", "Salary slips", "Bank statements"],
        benefits: ["No hidden charges", "Transparent interest", "Low EMI"],
        faqs: [
            { question: "How quickly?", answer: "24 hours." },
            { question: "Prepayment?", answer: "Yes, after 6 EMIs." },
        ]
    },
    {
        id: "home-loan",
        title: "Home Loan",
        tagline: "Turn your dream home into reality",
        description: "Make your dream home a reality with affordable rates and expert guidance.",
        icon: Home,
        category: "loans",
        highlight: "8.5% p.a.",
        interestRate: "8.5% - 10% p.a.",
        processingFee: "0.5%",
        tenure: "Up to 30 years",
        minAmount: "$25,000",
        maxAmount: "$500,000",
        rating: 4.9,
        reviews: 4100,
        popular: true,
        features: ["Low interest rates", "Up to 30 years tenure", "Balance transfer", "Top-up facility"],
        detailedFeatures: [
            { title: "Lowest Interest Rates", description: "Starting from just 8.5% p.a." },
            { title: "Long Tenure", description: "Up to 30 years." }
        ],
        eligibility: [
            { label: "Age", value: "23 - 65 years" },
            { label: "Min. Income", value: "$40,000 p.a." }
        ],
        documents: ["ID Proof", "Income Proof", "Property Docs"],
        benefits: ["Tax benefits", "No prepayment charges", "Doorstep service"],
        faqs: [
            { question: "Max loan amount?", answer: "Up to 90% of property value." }
        ]
    },
    {
        id: "life-insurance",
        title: "Term Life Insurance",
        tagline: "Protect your loved ones' future",
        description: "Protect your family's future with comprehensive life coverage at affordable premiums.",
        icon: Shield,
        category: "insurance",
        highlight: "From $10/mo",
        interestRate: "N/A",
        processingFee: "Zero",
        tenure: "10 - 40 years",
        minAmount: "$100,000",
        maxAmount: "$1,000,000",
        rating: 4.8,
        reviews: 2100,
        popular: true,
        features: ["High sum assured", "Critical illness cover", "Accidental death benefit", "Tax benefits"],
        detailedFeatures: [
            { title: "High Sum Assured", description: "Coverage up to $1M." },
            { title: "Affordable Premiums", description: "Starting at $10/mo." }
        ],
        eligibility: [
            { label: "Age", value: "18 - 65 years" },
            { label: "Health", value: "Medical checkup may be required" }
        ],
        documents: ["ID Proof", "Age Proof", "Income Proof"],
        benefits: ["High cover", "Tax benefits", "Flexible payments"],
        faqs: [
            { question: "Grace period?", answer: "30 days." }
        ]
    },
    // Add other products as needed or defaults
];
