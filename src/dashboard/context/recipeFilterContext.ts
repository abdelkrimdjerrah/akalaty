import { createContext } from "react";

export const recipeFilterContext = createContext({
  optionSelectType: "",
  setOptionSelectType: (value:Types.IRecipeType) => {},
  optionOrderByRating: "",
  setOptionOrderByRating: (value:'best' | 'low' | 'none') => {},
});

