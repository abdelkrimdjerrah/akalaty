import { Hamburger } from "phosphor-react";

interface IngredientsProps {
  ingredients: {
    name: string;
    amount: number;
    unit:
      | "cups"
      | "ounces"
      | "grams"
      | "kilograms"
      | "tablespoons"
      | "milliliters"
      | "liters"
      | "count"
      | "teaspoons";
  }[];
}

const Ingredients = ({ ingredients }: IngredientsProps) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-1 w-full items-center">
        <Hamburger size={26} />
        <p className=" font-medium text-lg">Ingredients</p>
      </div>
      <div className="flex flex-col gap-3">
        {ingredients.map(({ name, amount, unit }, index) => (
          <div key={index} className="flex gap-2 items-center">
            <span className="mt-[-4px]">{name}</span>
            <div className="px-2 py-[2px] rounded-full bg-gray-200 text-xs flex gap-1">
              <span>{amount}</span>
              <span>{unit}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ingredients;
