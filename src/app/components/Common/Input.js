import React from 'react';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(inputs);
const Input = React.forwardRef(
  (
    {
      placeholder,
      required,
      errors = {},
      register = null,
      name,
      className,
      type = 'text',
      ...props
    },
    ref
  ) => {
    const inputClasses = errors?.[name]
      ? 'ring-red-700 focus:ring-red-700'
      : 'ring-gray-300 focus:ring-indigo-600';

    return (
      <>
        <input
          data-testid={name}
          type={type}
          id={name}
          placeholder={placeholder}
          className={cn(inputClasses, 'text-xs', className)}
          ref={ref}
          name={name}
          {...(register ? register(name, { required }) : {})}
          {...props}
        />
      </>
    );
  }
);
Input.displayName = 'Input'; 


export default Input;
