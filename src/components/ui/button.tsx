import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-copper text-white shadow hover:bg-copper/90 focus-visible:ring-copper",
        destructive:
          "bg-red-500 text-white shadow-sm hover:bg-red-500/90 focus-visible:ring-red-500",
        outline:
          "border border-copper/30 bg-transparent shadow-sm hover:bg-copper/10 hover:text-cream focus-visible:ring-copper",
        secondary:
          "bg-copper/20 text-copper-light shadow-sm hover:bg-copper/30 focus-visible:ring-copper",
        ghost:
          "hover:bg-copper/10 hover:text-cream focus-visible:ring-copper",
        link: "text-copper underline-offset-4 hover:underline focus-visible:ring-copper",
        gold:
          "bg-gold text-charcoal shadow hover:bg-gold/90 focus-visible:ring-gold",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-lg px-8",
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
