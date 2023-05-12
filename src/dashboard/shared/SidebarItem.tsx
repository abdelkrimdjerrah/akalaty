interface SidebarItemProps{
    title: string,
    Icon: any,
    path?: any,
    active?: boolean,
    onClick?: any
}

function SidebarItem({title, Icon, path, active, onClick}: SidebarItemProps) {
    let activeStyle = active ? ' bg-gray-700 text-white ' : ' hover:bg-gray-50 '
  return (
    <div className={'flex items-center gap-2 p-2 rounded-lg cursor-pointer duration-50 ease-in' + activeStyle} onClick={onClick}>
        <div>
            <Icon size={25}/>
        </div>
        <div>
            <p className='font-medium'>{title}</p>
        </div>
    </div>
  )
}

export default SidebarItem