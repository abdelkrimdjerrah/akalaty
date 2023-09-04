import React from 'react'
import Input from '../../shared/Input'
import Textarea from '../../shared/Textarea'
import Select from '../../shared/Select';

interface PropsType {
    title: string,
    setTitle: React.Dispatch<React.SetStateAction<string>>,
    description: string,
    setDescription: React.Dispatch<React.SetStateAction<string>>
    optionSelectType: { value: string; label: string };
    setOptionSelectType: React.Dispatch<React.SetStateAction<{ value: Types.IRecipeType; label: string }>>;
}

const BasicInformation = ({title, setTitle, description, setDescription, optionSelectType, setOptionSelectType}:PropsType) => {


  const optionsSelectBy = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'appetizer', label: 'Appetizer' },
    { value: 'main', label: 'Main' },
    { value: 'dessert', label: 'Dessert' },
    { value: 'drink', label: 'Drink' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'other', label: 'Other' },
    { value: '', label: 'None' }
  ]


  return (
    <>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">Title:</p>
            <Input
              text="Write a title"
              type="text"
              widthFull
              onChange={(v) => setTitle(v)}
              value={title}
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">Description:</p>
            <Textarea
              text="Write a description"
              widthFull
              onChange={(v) => setDescription(v)}
              value={description}
              className="py-2 w-full pr-8"
              rows={5}
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">Type:</p>
            <Select
              items={optionsSelectBy}
              placeholder="Select an option"
              defaultValue={optionSelectType}
              selectedOption={optionSelectType}
              setSelectedOption={setOptionSelectType}
            />

          </div>
    </>
  )
}

export default BasicInformation
