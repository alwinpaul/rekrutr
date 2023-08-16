import { useState } from "react"

const FilterMenu = () => {

    return (
        <section>

            <div className="w-full h-auto bg-white border rounded drop-shadow-lg p-5">
                {/* INput for search */}
                <div className="">
                    <input type="text" name="searchCandidate" id="searchCandidate" autoFocus className="text-xl h-16 w-full p-2 pl-4 bg-slate-50 rounded-md border border-tecnita-blue" placeholder="Search by Candidate Name"/>
                </div>

            </div>
        </section>
    )
}

export default FilterMenu