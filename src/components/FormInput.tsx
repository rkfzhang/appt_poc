import type { ChangeEvent } from 'react';

interface FormInputProps {
  label: string;
  type: 'text' | 'number';
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  min?: number;
  max?: number;
}

export const FormInput = ({ 
  label, 
  type, 
  value, 
  onChange, 
  placeholder = '', 
  min, 
  max 
}: FormInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = type === 'number' ? parseFloat(e.target.value) : e.target.value;
    onChange(newValue);
  };

  return (
    <div className="mb-4">
      <label className="block text-red-500 text-sm mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        min={min}
        max={max}
        className="w-full px-3 py-2 border rounded-md"
      />
    </div>
  );
};
