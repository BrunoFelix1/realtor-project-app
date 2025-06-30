import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary border border-primary text-white shadow-sm hover:bg-primary/90 hover:shadow-md hover:scale-[1.03] focus-visible:ring-primary/60",
        destructive:
          "bg-red-600 border border-red-600 text-white shadow-sm hover:bg-red-700 hover:shadow-md hover:scale-[1.03] focus-visible:ring-red-500",
        outline:
          "border border-primary bg-transparent text-primary shadow-sm hover:bg-primary/10 hover:text-primary-900 hover:shadow-md focus-visible:ring-primary/40",
        secondary:
          "bg-muted border border-muted-foreground/10 text-foreground shadow-sm hover:bg-muted/80 hover:shadow-md hover:scale-[1.03] focus-visible:ring-muted-foreground/30",
        ghost:
          "bg-transparent border-none text-foreground hover:bg-accent/40 hover:text-primary hover:shadow-md focus-visible:ring-primary/20",
        link: "bg-transparent border-none text-primary underline-offset-4 hover:underline hover:text-primary/80 focus-visible:ring-primary/20",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
