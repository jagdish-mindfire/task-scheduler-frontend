import React from 'react';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(inputs);

const Label = React.forwardRef(({ htmlFor, className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      htmlFor={htmlFor}
      className={cn('label-class', className)} 
      {...props}
    />
  );
});

Label.displayName = 'Label'; 

export default Label;
