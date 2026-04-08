import * as React from 'react'
import { Text, View, ViewProps } from 'react-native'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default: 'border-transparent bg-primary',
                secondary: 'border-transparent bg-secondary',
                destructive: 'border-transparent bg-destructive',
                outline: 'text-foreground',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
)

const badgeTextVariants = cva(
    "text-xs font-semibold",
    {
        variants: {
            variant: {
                default: 'text-primary-foreground',
                secondary: 'text-secondary-foreground',
                destructive: 'text-destructive-foreground',
                outline: 'text-foreground',
            }
        },
        defaultVariants: {
            variant: 'default',
        }
    }
)

export interface BadgeProps
    extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, children, ...props }: BadgeProps) {
    return (
        <View className={cn(badgeVariants({ variant }), className)} {...props}>
            {/* We assume children is text usually, but could be icons. If string wrap in Text */}
            {React.Children.map(children, (child) => {
                if (typeof child === 'string' || typeof child === 'number') {
                    return <Text className={cn(badgeTextVariants({ variant }))}>{child}</Text>
                }
                return child;
            })}
        </View>
    )
}

export { Badge, badgeVariants }
