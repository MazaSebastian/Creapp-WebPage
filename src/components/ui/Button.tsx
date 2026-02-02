import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils'; // Adjusted path

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center rounded-xl font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:pointer-events-none active:scale-95',
                    {
                        'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20': variant === 'primary',
                        'bg-secondary text-white hover:bg-secondary/90 shadow-lg shadow-secondary/20': variant === 'secondary',
                        'border-2 border-white/20 hover:bg-white/5 text-white': variant === 'outline',
                        'hover:bg-white/10 text-slate-300 hover:text-white': variant === 'ghost',
                        'glass hover:bg-white/10 text-white': variant === 'glass',

                        'h-9 px-4 text-sm': size === 'sm',
                        'h-12 px-6 text-base': size === 'md',
                        'h-14 px-8 text-lg': size === 'lg',
                    },
                    className
                )}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';
