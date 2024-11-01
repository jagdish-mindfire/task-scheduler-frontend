import { twMerge } from "tailwind-merge";
import React from "react";

const cn = (...inputs) => twMerge(inputs);
const Input = React.forwardRef(
  (
    {
      placeholder,
      required,
      errors,
      register,
      name,
      className,
      type = "text",
      ...props
    },
    ref
  ) => {
    const inputClasses = errors?.name
      ? "ring-red-700 focus:ring-red-700"
      : "ring-gray-300 focus:ring-indigo-600";

    return (
      <>
        <input
          data-testid={name}
          type={type}
          {...register(name, { required })}
          id={name}
          placeholder={placeholder}
          className={cn("ring-red-700 focus:ring-red-700", className)}
          ref={ref}
          name={name}
          {...register(name)}
          {...props}
        />
        {errors[name] && (
          <label className="text-red-700">{errors[name].message}</label>
        )}
      </>
    );
  }
);

export default Input;
