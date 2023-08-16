import { useState } from "react";
import FilterMenu from "../FilterMenu/FilterMenu";
import Overlay from "../Overlay/Overlay";

const SearchBox = () => {
    const [showFilter, setShowFilter] = useState(false)

    return (
        <div className="w-1/2 relative">
            <div className="search-input w-full h-10 rounded-md bg-transparent bg-neutral-300 cursor-text text-lg flex items-center pl-3"
                onClick={() => setShowFilter(true)}>
                Search or Filter Candidates
            </div>

            <Overlay isOpen={showFilter} closeModal={() => setShowFilter(false)}>
                <div className="absolute top-14 w-full">
                    <FilterMenu />
                </div>
            </Overlay>

        </div>
    )
}

export default SearchBox;