import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const neobrutalistButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-black transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform hover:bg-black hover:text-white relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: "bg-[#05e17a] text-white hover:bg-black hover:text-white hover:shadow-[4px_4px_0px_0px_rgba(5,225,122,1)]",
        primary: "bg-[#05e17a] text-white hover:bg-black hover:text-white hover:shadow-[4px_4px_0px_0px_rgba(5,225,122,1)]",
        secondary: "bg-black text-white hover:bg-[#05e17a] hover:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
        destructive: "bg-red-500 text-white hover:bg-black hover:text-white hover:shadow-[4px_4px_0px_0px_rgba(239,68,68,1)]",
        success: "bg-[#05e17a] text-white hover:bg-black hover:text-white hover:shadow-[4px_4px_0px_0px_rgba(5,225,122,1)]",
        outline: "bg-white text-black border-2 border-black hover:bg-black hover:text-white hover:shadow-[4px_4px_0px_0px_rgba(5,225,122,1)]",
        ghost: "bg-transparent text-black border-none shadow-none hover:bg-black hover:text-white hover:shadow-[4px_4px_0px_0px_rgba(5,225,122,0.5)]",
      },
      size: {
        default: "h-12 px-6 py-3 text-base",
        sm: "h-10 px-4 py-2 text-sm",
        lg: "h-14 px-8 py-4 text-lg",
        xl: "h-16 px-10 py-5 text-xl",
        icon: "h-12 w-12 p-0",
        nav: "h-10 px-4 py-2 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface NeobrutalistButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof neobrutalistButtonVariants> {
  asChild?: boolean
}

const NeobrutalistButton = React.forwardRef<HTMLButtonElement, NeobrutalistButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(neobrutalistButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
NeobrutalistButton.displayName = "NeobrutalistButton"

export { NeobrutalistButton, neobrutalistButtonVariants }
