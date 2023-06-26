import { useState } from "react";

interface IText {
  text: string;
}

function Text({ text }: IText) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };
  const truncatedText = isExpanded ? text : text.substring(0, 140) + "...";
  const buttonText = isExpanded ? "  See less" : "  See more";

  return (
    <div className=" break-words text-sm">
      {text.length > 140 ? (
        <>
          <span className="">{truncatedText}</span>
          <span onClick={toggleText} className="text-gray-400">
            {buttonText}
          </span>
        </>
      ) : (
        <span className="">{text}</span>
      )}
    </div>
  );
}

export default Text;
