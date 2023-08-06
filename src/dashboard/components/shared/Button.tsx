import { useState } from "react";
import Loader from "./Loader";

interface BtnProps {
  children: React.ReactNode;
  onClick: () => void;
  color?: string;
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
  color,
  onClick,
  className,
  children,
  outlined,
}: BtnProps) {


  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
 };
 
 const handleMouseLeave = () => {
    setIsHover(false);
 };

  const width = widthFull ? "w-full flex-1" : "";
  const btn_style = outlined
    ? " border-[1px] border-gray-600 text-gray-800  hover:bg-gray-800 hover:text-white"
    : " bg-gray-800 text-white  hover:bg-gray-700 ";

  return (
    <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={loading || disabled}
      onClick={onClick}
      className={
        width +
        btn_style +
        " text-sm w-fit font-medium  relative py-3 px-10 rounded-lg duration-200 disabled:opacity-60 disabled:cursor-not-allowed " +
        className
      }
      style={{ color: isHover ? "white" : color, borderColor: color, backgroundColor: isHover ? color : ""}}
    >
      {children}
      <div className=" absolute top-[30%] right-[5%] ">
        {loading ? <Loader /> : null}
      </div>
    </button>
  );
}
