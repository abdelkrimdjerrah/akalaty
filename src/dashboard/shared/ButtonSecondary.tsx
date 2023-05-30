import Loader from "./Loader";

interface BtnProps {
  children: React.ReactNode;
  onClick: () => void;
  widthFull?: boolean;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  outlined?: boolean;
}


export default function Button({
  widthFull,
  loading,
  disabled,
  onClick,
  className,
  children,
  outlined,
}: BtnProps) {
  const width = widthFull ? "w-full flex-1" : "";
  const btn_style = outlined
    ? " border-[1px] border-blue-600 text-gray-800  hover:bg-gray-800 hover:text-white"
    : " bg-gray-800 text-white  hover:bg-gray-700 ";
  return (
    <button
      disabled={loading || disabled}
      onClick={onClick}
      className={
        width +
        btn_style +
        " text-sm font-medium  relative py-3 px-10 rounded-lg duration-200 disabled:opacity-60 disabled:cursor-not-allowed " +
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
