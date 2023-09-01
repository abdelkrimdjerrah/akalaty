import React from 'react'
import Textarea from '../../shared/Textarea';
import ButtonSecondary from '../../shared/ButtonSecondary';
import Input from '../../shared/Input';
import { ChartLine, X } from 'phosphor-react';
import Select from '../../shared/Select';

interface PropsType {
    ingredients: { key: number, name: string; amount: number; unit: Types.IUnitType }[],
    setIngredients: React.Dispatch<React.SetStateAction<[{ key: number, name: string; amount: number; unit: Types.IUnitType; }]>>
}

const Ingredients = ({ingredients, setIngredients}:any) => {


  const optionsUnit = [
    { value: "grams", label: "grams" },
    { value: "ounces", label: "ounces" },
    { value: "kilograms", label: "kilograms" },
    { value: "tablespoons", label: "tablespoons"},
    { value: "milliliters", label: "milliliters" },
    { value: "liters", label: "liters" },
    { value: "count", label: "count" },
    { value: "teaspoons", label: "teaspoons" },
  ]

  const addIngredient = () => {
    const newIngredient = { key: ingredients.length + 1, name: "", amount: 0, unit: "grams" };
    setIngredients([...ingredients, newIngredient]);
  };

  const deleteIngredient = (key: number) => {
    const updatedIngredients = ingredients
      .filter((ingredient:any) => ingredient.key !== key)
      .map((ingredient:any, index:number) => ({ ...ingredient, key: index + 1 }));
    setIngredients(updatedIngredients);
  };

  

  return (
    <>
    <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">Prepatation:</p>
            <div className="flex flex-col gap-1">
              
            
            {ingredients.map((ingredient: { key: number, name: string; amount: number; unit: Types.IUnitType }) => (
                <div key={ingredient.key} className="flex gap-2">

                  <Input
                    text="Name"
                    type="text"
                    widthFull
                    onChange={(e: any) => {
                      const updatedIngredients = [...ingredients];
                      updatedIngredients[ingredient.key - 1].name = e;
                      setIngredients(updatedIngredients);
                    }}
                    value={ingredient.name}
                  />
                 
                  <Input
                    text="Amount"
                    type="text"
                    widthFull
                    onChange={(e: any) => {
                      const updatedIngredients = [...ingredients];
                      updatedIngredients[ingredient.key - 1].amount = Number(e);
                      setIngredients(updatedIngredients);
                    }}
                    value={String(ingredient.amount)}
                  />


                  <Select
                      items={optionsUnit}
                      placeholder="Select an option"
                      setSelectedOption={(selected:{label: any, value: any}) => {
                        const updatedIngredients = ingredients.map((i:any) => {
                          if (ingredient.key === i.key) {
                            i.unit = selected.value
                          }
                          return i
                        });
                        setIngredients(updatedIngredients);
                      }}
                      selectedOption={{label:ingredient.unit,value:ingredient.unit}}
                  />
                 

                  {ingredient.key !== 1 && (
                      <div className="flex items-center">
                        <div
                          onClick={() => deleteIngredient(ingredient.key)}
                          className="flex items-center text-red-500 text-sm font-medium cursor-pointer w-fit"
                        >
                          <X size={17} weight="bold" />
                          <p>Delete</p>
                        </div>
                      </div>

                  )}

                  
                </div>
              ))}

              
              <div className="pt-1">
                <ButtonSecondary onClick={addIngredient} color="blue">
                  Add more
                </ButtonSecondary>
              </div>
            </div>
          </div>

          

    </>
  )
}

export default Ingredients

