export default function InputField({ label, type = "text", register, errors, name, required,placeholder = "" })  {
    return (
    
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
         <span className="text-gray-700">{label}</span>
         {required && <span className="text-red-700">*</span>}
        {
          type === "textarea" ? ( <textarea
            data-testid={`edittask_${name}`}
            {...register(name)}
            className={`block w-full rounded-md border-0 py-3 p-4 text-gray-700 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
              errors[name] ? "ring-red-700 focus:ring-red-700" : "ring-gray-300 focus:ring-indigo-600"
            }`}
            rows="3"
          />) : 
          (
            <input
              data-testid={name}
              type={type}
              {...register(name, { required })}
              className={`block w-full rounded-md border-0 py-1.5 p-2 text-gray-700 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                errors[name] ? "ring-red-700 focus:ring-red-700" : "focus:ring-indigo-600 ring-gray-300"
              } sm:text-sm sm:leading-6`}
            />
          )
        }
      {errors[name] && <label className="text-red-700">{errors[name].message}</label>}
      </label>
    
   
    );
};