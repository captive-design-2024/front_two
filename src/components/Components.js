import React from 'react';

// Button 컴포넌트
export const Button = ({ variant = "solid", size = "sm", className = "", onClick, children }) => {
  const baseClasses = "px-4 py-2 rounded font-medium";
  const variantClasses = variant === "solid" 
    ? "bg-blue-500 text-white hover:bg-blue-600" 
    : "bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-100";
  const sizeClasses = size === "sm" ? "text-sm" : "text-base";

  return (
    <button 
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`} 
      onClick={onClick} // 이벤트 핸들러 추가
    >
      {children}
    </button>
  );
};

// Label 컴포넌트
export const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="block text-gray-700 font-medium mb-2">
    {children}
  </label>
);

// Textarea 컴포넌트
export const Textarea = ({ id, rows, defaultValue }) => (
  <textarea id={id} rows={rows} defaultValue={defaultValue} className="w-full border rounded-md p-2 bg-white" />
);

// Command 컴포넌트
export const Command = ({ children }) => (
  <div className="border rounded-lg shadow-md bg-white">
    {children}
  </div>
);

// CommandInput 컴포넌트
export const CommandInput = ({ placeholder, onChange, onFocus }) => (
  <input 
    type="text" 
    placeholder={placeholder} 
    onChange={onChange} 
    onFocus={onFocus} 
    className="w-full border-b p-2 bg-white" 
  />
);

// CommandList 컴포넌트
export const CommandList = ({ children }) => (
  <div className="p-2 bg-white max-h-40 overflow-y-auto">
    {children}
  </div>
);

// CommandEmpty 컴포넌트
export const CommandEmpty = ({ children }) => (
  <div className="text-gray-500 text-center py-2 bg-white">
    {children}
  </div>
);

// CommandGroup 컴포넌트
export const CommandGroup = ({ children }) => (
  <div>
    {children}
  </div>
);

// CommandItem 컴포넌트
export const CommandItem = ({ children }) => (
  <div className="flex items-center justify-between p-2 border-b last:border-b-0 bg-white">
    {children}
  </div>
);

// Input 컴포넌트
export const Input = ({ id, defaultValue, ...props }) => (
    <input
      id={id}
      defaultValue={defaultValue}
      className="mt-1 block w-full p-2 border border-gray-300 rounded bg-white"
      {...props}
    />
  );

// Select 컴포넌트
export const Select = ({ id, options, ...props }) => (
    <select
      id={id}
      className="border border-gray-300 p-2 rounded bg-white"
      {...props}
    >
      {options.map((option, index) => (
        <option key={index} value={option.value} disabled={option.disabled}>
          {option.label}
        </option>
      ))}
    </select>
  );

// Audio 컴포넌트
export const Audio = ({ src, ...props }) => (
    <audio controls className="w-2/3" {...props}>
      <source src={src} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
