import { MouseEventHandler } from "react";

interface InputProps {
  text: string;
  type?: string;
  Icon?: any;
  widthFull?: boolean;
  value: string;
  secure?: boolean;
  white?: boolean;
  onChange: (v: string) => void;
  onClick?: (e: any) => void;
  className?: string;
}

function Input({
  widthFull,
  white,
  className,
  type,
  text,
  value,
  onChange,
  onClick,
  Icon,
}: InputProps) {
  const width = widthFull ? " w-full " : "";
  const paddingRight = Icon ? " pr-8 " : " ";

  const background = white ? " bg-white " : "bg-gray-100";
  return (
    <div>
      <div className="relative">
        <input
          className={
            background +
            width +
            paddingRight +
            " " +
            "font-regular text-sm rounded-md p-2 focus:shadow-border outline-none " +
            className
          }
          type={type}
          onClick={onClick}
          placeholder={text}
          onChange={(e) => onChange(e.target.value)}
          value={value}
        />

        {Icon && (
          <div className="absolute top-0 right-0 h-full flex items-center pr-3 text-gray-400">
            <Icon size={19} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Input;
