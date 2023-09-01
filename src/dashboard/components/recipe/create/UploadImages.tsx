import React from 'react'
import ButtonSecondary from '../../shared/ButtonSecondary';
import { XCircle } from 'phosphor-react';

interface PropsType {
    selectedFiles: FileList | null,
    setSelectedFiles: React.Dispatch<React.SetStateAction<FileList | null>>
    selectedFilesImg: Blob[],
    setSelectedFilesImg: React.Dispatch<React.SetStateAction<Blob[]>>;
}

const UploadImages = ({selectedFiles, setSelectedFiles, selectedFilesImg, setSelectedFilesImg}:PropsType) => {

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          let list: DataTransfer = new DataTransfer();
    
          //add new selected files
          for (let i = 0; i < e.target.files.length; i++) {
            list.items.add(e.target.files[i]);
    
            //convert image to base64 in order to show it in front-end
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[i] as Blob);
            reader.onload = () => {
              setSelectedFilesImg((prev: Blob[]) => {
                const newSelectedFilesImg: Blob[] = [...prev];
                if (reader.result) {
                  newSelectedFilesImg.push(reader.result as unknown as Blob);
                }
                return newSelectedFilesImg;
              });
            };
          }
    
          //append old selected files
          if (selectedFiles) {
            for (let i = 0; i < selectedFiles.length; i++) {
              list.items.add(selectedFiles[i]);
            }
          }
    
          setSelectedFiles(list.files);
        }
      };

      const handleDeleteImage = (index: number) => {
        //deleting from the shown images
        setSelectedFilesImg((prev: Blob[]) => {
          const newArray: Blob[] = [...prev];
          newArray.splice(index, 1);
          return newArray;
        });
    
        //deleting from the selected files
        setSelectedFiles((prev: FileList | null) => {
          let newFiles: DataTransfer = new DataTransfer();
          if (prev) {
            for (let i = 0; i < prev.length; i++) {
              if (i !== index) {
                newFiles.items.add(prev[i]);
              }
            }
          }
          return newFiles.files.length ? newFiles.files : null;
        });
      };

      

  return (
    <div className='flex flex-col gap-1'>
     <p className="text-sm font-medium">Images:</p>
            {selectedFiles && (
              <div className="flex gap-2 overflow-hidden flex-wrap py-2">
                {selectedFilesImg.map((img: any, index: number) => {
                  return (
                    <div className="relative" key={index}>
                      <img
                        src={img}
                        alt="img"
                        className="w-20 h-20 object-cover border-[1px] border-gray-100 rounded-lg"
                      />

                      {/* adding white bg to the X inside so it will be visible on dark images */}
                      <div
                        onClick={() => handleDeleteImage(index)}
                        className="cursor-pointer"
                      >
                        <div className="bg-white w-2 h-2 absolute top-[10px] right-[10px]" />
                        <XCircle
                          size={20}
                          weight="fill"
                          className=" absolute top-1 right-1"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            <div className="relative w-fit">
              {selectedFiles ? (
                <ButtonSecondary color="orange">
                  Add more{"  ("}
                  {selectedFiles.length}
                  {")"}
                </ButtonSecondary>
              ) : (
                <ButtonSecondary color="orange">Upload image</ButtonSecondary>
              )}
              <label className=" cursor-pointer absolute w-full h-full left-0">
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  multiple
                  onChange={handleFileChange}
                  className=" bg-blue-500"
                />
              </label>
            </div>
    </div>
  )
}

export default UploadImages
