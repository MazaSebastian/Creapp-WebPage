import React from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, icon, ...props }, ref) => {
        return (
            <div className="w-full space-y-2">
                {label && (
                    <label className="text-sm font-medium text-slate-400 ml-1">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {icon && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={cn(
                            'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all disabled:opacity-50',
                            icon && 'pl-11',
                            error && 'border-red-500/50 focus:border-red-500',
                            className
                        )}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="text-xs text-red-500 ml-1">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
