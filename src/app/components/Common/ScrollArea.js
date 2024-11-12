'use client';

import React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(inputs);

const ScrollArea = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={cn('relative overflow-hidden', className)}
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
  )
);

// Set displayName for debugging purposes
ScrollArea.displayName = 'ScrollArea';

export default ScrollArea;
