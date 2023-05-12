var Abdelkrim = require('../../assets/Abdelkrim.png');


function UserItem() {
  return (
    <div className="flex items-center gap-2">
        <div>
            <img src={Abdelkrim} className="h-14 rounded-full" alt="" />
        </div>
        <div>
            <p className="text-md font-light">Abdelkrim Djerrah</p>
            <p className="text-sm font-medium text-gray-400">Chief</p>
        </div>
    </div>
  )
}

export default UserItem