import { useState } from "react";
import UserItem from "../../shared/UserItem";
import { DotsThreeVertical, BookmarkSimple } from "phosphor-react";

const Abdelkrim = require("../../../assets/Abdelkrim.png");

function PostHeader() {
  const [bookmark, setBookmark] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex w-full justify-between">
      <UserItem
        name="Abdelkrim Djerrah"
        text="Sun 14 May 1:19 PM"
        picture={Abdelkrim}
      />
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
