import * as React from "react"
import * as AccordioNPR imitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const Accordion = AccordioNPR imitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordioNPR imitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordioNPR imitive.Item>
>(({ className, ...props }, ref) => (
  <AccordioNPR imitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordioNPR imitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordioNPR imitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordioNPR imitive.Header className="flex">
    <AccordioNPR imitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordioNPR imitive.Trigger>
  </AccordioNPR imitive.Header>
))
AccordionTrigger.displayName = AccordioNPR imitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordioNPR imitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordioNPR imitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordioNPR imitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordioNPR imitive.Content>
))

AccordionContent.displayName = AccordioNPR imitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
