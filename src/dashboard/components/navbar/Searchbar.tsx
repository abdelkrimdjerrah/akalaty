import { useState } from "react";
import Input from "../../shared/Input";
import { MagnifyingGlass } from "phosphor-react";

function Searchbar() {
  const [search, setSearch] = useState("");
  return (
    <div>
      <Input
        text="search..."
        type="text"
        Icon={MagnifyingGlass}
        widthFull
        onChange={(v) => setSearch(v)}
        value={search}
        className="py-2 text-xs w-[250px]"
      />
    </div>
  );
}

export default Searchbar;
