import { Loader2 } from "lucide-react";

const Loader = ({ size = 50, text = "Loading..." }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
      <Loader2 size={size} className="animate-spin text-[#2692d1]" />
      {text && <p className="text-sm text-gray-600 font-medium">{text}</p>}
    </div>
  );
};

export default Loader;
