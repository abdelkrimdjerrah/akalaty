import React from 'react'
import Input from '../../shared/Input'
import Textarea from '../../shared/Textarea'

interface PropsType {
    title: string,
    setTitle: React.Dispatch<React.SetStateAction<string>>,
    description: string,
    setDescription: React.Dispatch<React.SetStateAction<string>>
}

const BasicInformation = ({title, setTitle, description, setDescription}:PropsType) => {
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
    </>
  )
}

export default BasicInformation
