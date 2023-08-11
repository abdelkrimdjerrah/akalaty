import { Dispatch, SetStateAction, createContext } from 'react';

interface RecipeFilterContextProps {
  optionSelectType: { label: string; value: string };
  setOptionSelectType: Dispatch<SetStateAction<{ label: string; value: string }>>;
  optionOrderByRating: { label: string; value: string };
  setOptionOrderByRating: Dispatch<SetStateAction<{ label: string; value: string }>>;
}

export const recipeFilterContext = createContext<RecipeFilterContextProps>({
  optionSelectType: { label: '', value: '' },
  setOptionSelectType: () => {},
  optionOrderByRating: { label: '', value: '' },
  setOptionOrderByRating: () => {},
});