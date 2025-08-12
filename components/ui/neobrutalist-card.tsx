import * as React from "react"
import { cn } from "@/lib/utils"

const NeobrutalistCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border-4 border-black bg-gradient-to-br from-white via-gray-50 to-gray-100 p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 relative z-0",
      className
    )}
    {...props}
  >
    <div className="relative z-10">
      {props.children}
    </div>
  </div>
))
NeobrutalistCard.displayName = "NeobrutalistCard"

const NeobrutalistCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5", className)} {...props} />
))
NeobrutalistCardHeader.displayName = "NeobrutalistCardHeader"

const NeobrutalistCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-3xl font-black leading-none tracking-tight bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent", className)}
    {...props}
  />
))
NeobrutalistCardTitle.displayName = "NeobrutalistCardTitle"

const NeobrutalistCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-base text-gray-800 font-black", className)}
    {...props}
  />
))
NeobrutalistCardDescription.displayName = "NeobrutalistCardDescription"

const NeobrutalistCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-4", className)} {...props} />
))
NeobrutalistCardContent.displayName = "NeobrutalistCardContent"

const NeobrutalistCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center pt-4", className)} {...props} />
))
NeobrutalistCardFooter.displayName = "NeobrutalistCardFooter"

export {
  NeobrutalistCard,
  NeobrutalistCardHeader,
  NeobrutalistCardFooter,
  NeobrutalistCardTitle,
  NeobrutalistCardDescription,
  NeobrutalistCardContent,
}
