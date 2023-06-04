import Loader from "./Loader";

interface BtnProps {
  children: React.ReactNode;
  onClick: () => void;
  widthFull?: boolean;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  color?: string;
  outlined?: boolean;
}


export default function Button({
  widthFull,
  color,
  loading,
  disabled,
  onClick,
  className,
  children,
  outlined,
}: BtnProps) {
  const width = widthFull ? "w-full flex-1" : "";
  let btn_style = ''
  if(color == 'red'){
    btn_style = ' border-red-600 text-red-800 bg-red-100 '
  }
  if(color == 'yellow'){
    btn_style = ' border-yellow-600 text-yellow-800 bg-yellow-100 '
  }
  if(color == 'orange'){
    btn_style = ' border-orange-600 text-yellow-800 bg-orange-100 '
  }
  return (
    <button
      disabled={loading || disabled}
      onClick={onClick}
      className={
        width +
        btn_style +
        " text-sm font-medium  relative py-1 px-5 rounded-md duration-200 disabled:opacity-60 disabled:cursor-not-allowed " +
        className
      }
    >
      {children}
      <div className="absolute top-[30%] right-[5%]">
        {loading ? <Loader /> : null}
      </div>
    </button>
  );
}
