import * as React from 'react';
import { cn } from "@/lib/utils"
import { EyeIcon, EyeOffIcon } from 'lucide-react'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  rounded?: boolean;
  fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, startIcon, endIcon, rounded = false, fullWidth = false, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    return (
      <div className={cn('text-left', fullWidth && 'w-full')}>
        {label ? (
          <div className="mb-1">
            <label className="text-base text-sm">{label}</label>
          </div>
        ) : null}
        <div className="flex relative box-border">
          {startIcon && (
            <div className="absolute left-0 top-[50%] translate-y-[-50%] ml-3">
              {startIcon}
            </div>
          )}
          <input
            type={
              type === 'password' ? (showPassword ? 'text' : 'password') : type
            }
            className={cn(
              'flex h-8 w-full rounded-3xl border border-borderGray bg-background px-2 py-1 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-textGray5 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-primary focus-visible:border-2 disabled:cursor-not-allowed disabled:opacity-50',
              !rounded && 'rounded-[5px]',
              className,
              {
                'pr-8': type === 'password' || !!endIcon,
                'pl-8': !!startIcon,
                'border-accentRed': error,
              }
            )}
            ref={ref}
            {...props}
          />
          {type === 'password' && (
            <button
              onClick={() => {
                setShowPassword((prev) => !prev);
              }}
              type="button"
              className="absolute right-0 top-[50%] translate-y-[-50%] mr-5"
            >
              {showPassword ? (
                <EyeOffIcon size={16} className="text-textGray3" />
              ) : (
                <EyeIcon size={16} className="text-textGray3" />
              )}
            </button>
          )}
          {endIcon && type !== 'password' && (
            <div className="absolute right-0 top-[50%] translate-y-[-50%] mr-5">
              {endIcon}
            </div>
          )}
        </div>
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
