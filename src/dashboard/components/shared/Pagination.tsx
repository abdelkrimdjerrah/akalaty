import { useEffect } from "react";
import Select from "./Select";

const Pagination = ({count, showPerPage,setShowPerPage, currentPage, setCurrentPage}: any) => {

  let pages;

  if (count && showPerPage.value) {
    const pagesCount = Math.ceil(count / showPerPage.value);
    pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
  }

  const optionsShowPerPages = [
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 20, label: '20' },
    { value: 30, label: '30' },
    { value: 50, label: '50' },
    { value: 100, label: '100' },
  ]

  useEffect(() => {
    setCurrentPage(1)
  }
  , [showPerPage])


  return (
    <div className="w-full flex flex-col xs:flex-row justify-between items-center">
      <div className="flex gap-2 text-sm h-fit mt-[4px] min-w-fit">
        <div className="mt-[-2px]">Pages: </div>
        <div className="flex gap-3 flex-wrap">
          {pages?.map((page:number) =>
            page === currentPage ? (
              <div
                key={page}
                className="cursor-pointer text-xs font-medium  border-b-[1px] w-2 flex justify-center border-black"
              >
                {page}
              </div>
            ) : (
              <div
                key={page}
                className="cursor-pointer text-xs font-medium w-2 flex justify-center"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </div>
            )
          )}
        </div>
      </div>
      
      <div className="flex gap-2 text-sm h-fit mt-[4px] min-w-fit items-center">
        <div className="mt-[-2px]">Show per page: </div>

      <Select
          items={optionsShowPerPages}
          placeholder="Select an option"
          setSelectedOption={setShowPerPage}
          selectedOption={showPerPage}
      />

      </div>


    </div>
  );
};

export default Pagination;
