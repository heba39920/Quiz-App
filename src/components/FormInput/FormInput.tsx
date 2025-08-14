export const FormInput = ({
  label,
  children,
  labelWidth = "auto",
  labelHeight = "auto",
}: {
  label: string;
  children: React.ReactNode;
  labelWidth?: string;  
  labelHeight?: string; 
}) => {
  return (
    <div className="relative w-full flex items-center border border-gray-300 rounded-xl overflow-hidden">
      <div
        className="bg-[#FFEDDF] text-sm text-black px-3 whitespace-nowrap rounded-xl flex items-center justify-center"
        style={{ minWidth: labelWidth, height: labelHeight }}
      >
        {label}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
};
