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

export const Avatar = React.forwardRef(({ className, ...props }, ref) => (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  ))
  
export const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
    <AvatarPrimitive.Image
      ref={ref}
      className={cn("aspect-square h-full w-full", className)}
      {...props}
    />
  ))

export const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-green-500",
        className
      )}
      {...props}
    />
  ))