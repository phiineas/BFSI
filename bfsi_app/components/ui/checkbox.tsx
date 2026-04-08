import * as React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Check } from 'lucide-react-native'
import { cn } from '../../lib/utils'

interface CheckboxProps {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    className?: string;
    disabled?: boolean;
}

function Checkbox({ checked, onCheckedChange, className, disabled }: CheckboxProps) {
    return (
        <TouchableOpacity
            onPress={() => onCheckedChange?.(!checked)}
            disabled={disabled}
            className={cn(
                "peer h-5 w-5 shrink-0 rounded-sm border border-primary bg-background justify-center items-center",
                checked && "bg-primary text-primary-foreground",
                disabled && "opacity-50",
                className
            )}
        >
            {checked && <Check size={14} color="#ffffff" />}
        </TouchableOpacity>
    )
}

export { Checkbox }
