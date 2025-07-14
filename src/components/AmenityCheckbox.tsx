interface AmenityCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const AmenityCheckbox = ({ label, checked, onChange }: AmenityCheckboxProps) => {
  const handleChange = () => {
    onChange(!checked);
  };

  return (
    <div className="flex items-center mb-2">
      <div 
        className={`w-6 h-6 flex items-center justify-center border rounded mr-2 cursor-pointer ${
          checked ? 'bg-green-500 border-green-500' : 'bg-white border-gray-300'
        }`}
        onClick={handleChange}
      >
        {checked && (
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        )}
      </div>
      <label className="cursor-pointer" onClick={handleChange}>
        {label}
      </label>
    </div>
  );
};
