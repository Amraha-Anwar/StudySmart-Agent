import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold transition-all duration-200 disabled:pointer-events-none disabled:bg-white/15 disabled:text-on-page disabled:translate-y-0 disabled:shadow-none disabled:border-transparent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-parrot text-ink shadow-[0_0_0_1px_rgba(116,214,76,0.7),0_8px_28px_-6px_rgba(92,196,52,0.7)] hover:-translate-y-px hover:bg-parrot-bright hover:shadow-[0_0_0_1px_rgba(116,214,76,0.9),0_12px_40px_-4px_rgba(92,196,52,0.95)]",
        destructive: "bg-margin text-white hover:bg-margin/90",
        outline: "border border-ink/15 bg-sheet text-ink shadow-[0_1px_2px_rgba(13,36,22,0.12)] hover:-translate-y-px hover:border-parrot hover:shadow-[0_8px_28px_-8px_rgba(92,196,52,0.6)]",
        secondary: "bg-highlight text-ink hover:bg-highlight/80",
        ghost: "text-ink hover:bg-ink/5",
        link: "text-pen underline underline-offset-4 decoration-pen/30 hover:decoration-pen",
      },
      size: {
        default: "h-11 px-5 text-[0.9375rem]",
        sm: "h-9 px-3.5 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
