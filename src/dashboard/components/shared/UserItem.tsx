interface UserItemProps {
  name: string;
  text?: string;
  picture: string;
}

function UserItem({ name, text, picture }: UserItemProps) {
  return (
    <div className="flex items-center gap-2 overflow-hidden">
      <div>
        <img
          src={picture}
          className="min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] rounded-full"
          alt=""
        />
      </div>
      <div>
        <p className="text-sm ">{name}</p>
        <p className="text-xs font-medium text-gray-400">{text}</p>
      </div>
    </div>
  );
}

export default UserItem;
