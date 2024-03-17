import { Input } from "@/components/ui/input"
import { IoIosArrowDown } from 'react-icons/io';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface InputDropdownProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

const InputDropdown: React.FC<InputDropdownProps> = ({ value, options, onChange }) => {
  return (
    <div className="py-3 w-80 relative">
      <Input value={value} readOnly className="text-gray-300" />
      <DropdownMenu>
        <DropdownMenuTrigger className="absolute right-0 top-0 h-full flex items-center pr-2"><IoIosArrowDown /></DropdownMenuTrigger>
        <DropdownMenuContent>
          {options.map((item) => (
            <DropdownMenuItem onClick={() => onChange(item)} key={item}>
              {item}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default InputDropdown;