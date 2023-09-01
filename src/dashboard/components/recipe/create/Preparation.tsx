import React from 'react'
import Textarea from '../../shared/Textarea';
import ButtonSecondary from '../../shared/ButtonSecondary';
import Input from '../../shared/Input';
import { X } from 'phosphor-react';

interface PropsType {
    preparation: { step: number, description: string }[],
    setPreparation: React.Dispatch<React.SetStateAction<{ step: number, description: string }[]>>,
    preparationTime: number,
    SetPreparationTime: React.Dispatch<React.SetStateAction<number>>
}

const Preparation = ({preparation, setPreparation, preparationTime, SetPreparationTime}:PropsType) => {

    const addStep = () => {
        const newStep = { step: preparation.length + 1, description: "" };
        setPreparation([...preparation, newStep]);
      };
    
      const deleteStep = (step: { step: number, description: string }) => {
        const updatedPreparation = preparation
          .filter((s: { step: number, description: string }) => s.step !== step.step)
          .map((s: { step:number, description:string }) => {
            if (s.step > step.step) {
              return { ...s, step: s.step - 1 };
            }
            return s;
          });
        setPreparation(updatedPreparation);
      };

      

  return (
    <>
    <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">Prepatation:</p>
            <div className="flex flex-col gap-1">
              {preparation.map((step: { step:number, description:string }) => (
                <div key={step.step} className="flex flex-col gap-2">
                  {step.step !== 1 ? (
                    <div>
                      <div className="py-4">
                        <hr />
                      </div>
                      <div className="w-full flex justify-between items-center">
                        <p className="text-sm">Step {step.step}:</p>
                        <div
                          onClick={() => deleteStep(step)}
                          className="flex items-center text-red-500 text-sm font-medium cursor-pointer w-fit"
                        >
                          <X size={17} weight="bold" />
                          <p>Delete</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm">Step {step.step}:</p>
                  )}

                  <Textarea
                    text="Phase description"
                    type="text"
                    widthFull
                    onChange={(e: any) => {
                      const updatedPreparation = [...preparation];
                      updatedPreparation[step.step - 1].description = e;
                      setPreparation(updatedPreparation);
                    }}
                    value={step.description}
                    rows={5}
                  />
                </div>
              ))}
              <div className="pt-1">
                <ButtonSecondary onClick={addStep} color="blue">
                  Add more
                </ButtonSecondary>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">{`Prepatation time (in minutes) :`}</p>
            <Input
              text=""
              type="text"
              widthFull
              onChange={(v) =>
                SetPreparationTime(
                  Number(v) ? Number(v) : v === "" ? 0 : preparationTime
                )
              }
              value={String(preparationTime)}
            />
          </div>
    </>
  )
}

export default Preparation
