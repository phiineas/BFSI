import * as React from 'react'
import { TextInput, View, TextInputProps } from 'react-native'
import { cn } from '../../lib/utils'

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, TextInputProps>(
    ({ className, ...props }, ref) => {
        return (
            <TextInput
                ref={ref}
                className={cn(
                    'flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary',
                    className
                )}
                placeholderTextColor="#64748b"
                {...props}
            />
        )
    }
)
Input.displayName = 'Input'

export { Input }
