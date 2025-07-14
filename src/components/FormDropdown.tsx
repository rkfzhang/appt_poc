import type { ChangeEvent } from 'react';

interface FormDropdownProps {
  label: string;
  options: { value: string | number; label: string }[];
  value: string | number;
  onChange: (value: string | number) => void;
}

export const FormDropdown = ({ label, options, value, onChange }: FormDropdownProps) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    // Convert to number if it's a numeric string
    const parsedValue = !isNaN(Number(newValue)) ? Number(newValue) : newValue;
    onChange(parsedValue);
  };

  return (
    <div className="mb-4">
      <label className="block text-red-500 text-sm mb-1">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md appearance-none bg-white"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
};
