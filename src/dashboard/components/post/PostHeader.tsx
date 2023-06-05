import { useState } from "react";
import UserItem from "../../shared/UserItem";
import { DotsThreeVertical, BookmarkSimple } from "phosphor-react";

const Abdelkrim = require("../../../assets/Abdelkrim.png");

interface PostProps {
  postId: string;
  username: string;
  createdAt: Date;
}

function PostHeader({ postId, username, createdAt }: PostProps) {
  const created = new Date(createdAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const [bookmark, setBookmark] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex w-full justify-between">
      <UserItem name={username} text={created} picture={Abdelkrim} />
      <div className="flex gap-1">
        <div onClick={() => setBookmark(!bookmark)}>
          {bookmark ? (
            <BookmarkSimple size={21} weight="fill" />
          ) : (
            <BookmarkSimple size={21} />
          )}
        </div>

        <DotsThreeVertical size={21} />
      </div>
    </div>
  );
}

export default PostHeader;
