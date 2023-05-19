import React from "react";

interface PostTextProps {
  text: string; 
}


function PostText({ text }: PostTextProps) {
  return (
    <div className="text-sm">
      {text}
    </div>
  );
}

export default PostText;
