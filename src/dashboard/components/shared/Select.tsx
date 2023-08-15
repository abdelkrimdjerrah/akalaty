import React, { useEffect, useRef, useState } from "react";
import { CaretDown } from "phosphor-react";

interface Props {
  items: {
    value: any;
    label: string;
  }[];
  placeholder: string;
  className?: string;
  defaultValue?: any;
  selectedOption: any;
  setSelectedOption: any;
  withTitle?: boolean;
}

const Select = ({
  items,
  placeholder,
  className,
  defaultValue,
  setSelectedOption,
  selectedOption,
}: Props) => {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setActive(false);
      }
    };
    document.addEventListener("click", handleOutsideClick, true);
    return () => {
      document.removeEventListener("click", handleOutsideClick, true);
    };
  }, []);

  return (
    <div
      className="bg-white min-w-fit cursor-pointer relative border flex justify-between items-center px-3 border-gray-300 rounded-md py-1 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:border-gray-400"
      ref={ref}
      onClick={() => {
        setActive((prev) => !prev);
      }}
    >
      <div className="flex gap-2 min-w-fit  justify-between items-center">
        <div>
          <p>{!selectedOption.value ? placeholder  : selectedOption.label}</p>
        </div>
        <div>
          <CaretDown size={15} weight="bold" />
        </div>
      </div>
      {active && (
        <div className="absolute z-[11] min-w-fit whitespace-nowrap top-9 left-0 w-full bg-white rounded-md shadow-md border border-gray-300">
          {items.map((item) => (
            <div
              key={item.value}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded-md"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedOption({ label: item.label, value: item.value });
                setActive(false);
              }}
            >
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;