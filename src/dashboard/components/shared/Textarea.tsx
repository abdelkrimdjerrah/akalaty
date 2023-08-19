import { MouseEventHandler, TextareaHTMLAttributes, useEffect, useRef } from "react";

interface TextareaProps {
  text: string;
  type?: string;
  Icon?: any;
  widthFull?: boolean;
  value: string;
  secure?: boolean;
  white?: boolean;
  rows?: number;
  onChange: (v: string) => void;
  onClick?: (e: any) => void;
  className?: string;
}

function Textarea({
  widthFull,
  white,
  className,
  type,
  rows,
  text,
  value,
  onChange,
  onClick,
  Icon,
}: TextareaProps) {
  const width = widthFull ? " w-full " : "";
  const paddingRight = Icon ? " pr-8 " : " ";
  const background = white ? " bg-white " : "bg-gray-100";


  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextArea = () => {
    if(textAreaRef.current){
        textAreaRef.current.style.height = "auto";
        textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    }
  };

  useEffect(resizeTextArea, [onChange]);

  
  return (
    <div>
      <div className="relative">
        <textarea
            ref={textAreaRef}
          className={
            background +
            width +
            paddingRight +
            " " +
            "font-regular text-sm rounded-md p-2 focus:shadow-border outline-none " +
            className
          }
          onClick={onClick}
          placeholder={text}
          onChange={(e) => onChange(e.target.value)}
          value={value}
          rows={rows ? rows : 1}
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

export default Textarea;
