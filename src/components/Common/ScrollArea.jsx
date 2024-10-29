import React, { useState } from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cva } from "class-variance-authority"
import { twMerge } from "tailwind-merge"
import {
  Home,
  Search,
  Calendar,
  MessageSquare,
  CheckCircle,
  PlusCircle,
  ChevronDown,
  Settings,
  HelpCircle,
  Menu,
  Bell,
} from "lucide-react"
const cn = (...inputs) => twMerge(inputs)

const ScrollArea = React.forwardRef(({ className, children, ...props }, ref) => (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollAreaPrimitive.Scrollbar
        orientation="vertical"
        className="flex touch-none select-none transition-colors"
      >
        <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-border" />
      </ScrollAreaPrimitive.Scrollbar>
    </ScrollAreaPrimitive.Root>
  ))

  export default ScrollArea;