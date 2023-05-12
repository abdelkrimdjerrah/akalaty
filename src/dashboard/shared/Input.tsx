interface InputProps {
    text: string;
    type?: string;
    Icon?: any,
    widthFull?: boolean;
    value: string;
    secure?: boolean;
    white?: boolean;
    onChange: (v: string) => void;
    className?: string;
}

function Input({widthFull, white, className, type, text, value, onChange, Icon}: InputProps) {
    const width = widthFull ? " w-full" : "";
    const background = white ? " bg-white " : "bg-gray-100";
    return (
      <div className="relative">
        <input
          className={
            background+
            width +
            " " +
            "font-regular text-sm rounded-lg p-3 focus:shadow-border outline-none " +
            className
          }
          type={type}
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
    );
}

export default Input