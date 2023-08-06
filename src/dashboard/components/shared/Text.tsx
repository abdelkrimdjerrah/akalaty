import { useState } from "react";

interface IText {
  text: string;
  length?: number;
  hiddenMore?: boolean;
}

function Text({ text, length, hiddenMore }: IText) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };
  const truncatedText = isExpanded ? text : text.substring(0, length) + "...";
  const buttonText = isExpanded ? "  See less" : "  See more";


  return (
    <div className=" break-words text-sm">
      {length && text.length > length ? (
        <>
          <span className="">{truncatedText}</span>
          {
            !hiddenMore && (
              <span onClick={toggleText} className="text-gray-400 cursor-pointer">
                {buttonText}
              </span>
            )
          }
        </>
      ) : (
        <span className="">{text}</span>
      )}
    </div>
  );
}

export default Text;
