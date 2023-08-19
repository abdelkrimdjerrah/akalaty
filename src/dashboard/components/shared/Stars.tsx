import { Star } from "phosphor-react"

interface StarsProps {
    rating: number;
    size: number;
}

const Stars = ({rating, size}:StarsProps) => {

    const calc = rating *  100 / 5 + '%'

    return (
    <div className=" w-fit relative">

      <div className="text-gray-300 flex gap-[2px] ">
        <Star size={size} weight="fill"/>
        <Star size={size} weight="fill"/>
        <Star size={size} weight="fill"/>
        <Star size={size} weight="fill"/>
        <Star size={size} weight="fill"/>
      </div>

      <div
        className="text-yellow-400 absolute top-0 left-0 h-full inset-0"
        style={{ width: calc, overflow: "hidden" }}
      >
        <div className="flex gap-[2px] min-w-fit">
          <Star size={size} weight="fill" />
          <Star size={size} weight="fill" />
          <Star size={size} weight="fill" />
          <Star size={size} weight="fill" />
          <Star size={size} weight="fill" />
        </div>
      </div>

    </div>
  )
}

export default Stars
