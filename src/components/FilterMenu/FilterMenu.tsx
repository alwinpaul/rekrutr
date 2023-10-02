import { useEffect, useState } from "react"
import { RootState, useAppDispatch } from "../../store/store";
import { filterCandidates, getCandidateDetails } from "../../store/thunks/candidateThunks";
import { CandidateState, setFilter } from "../../store/reducers/candidateSlice";
import { useSelector } from "react-redux";
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from "@mui/material";
import { StatusObj, filterOptions } from "../../common/interfaces/candidateInterface";
import FilterBody from "../FilterBody/FilterBody";



interface FilterMenuPropsInterface {
    closeModal: Function
}

const FilterMenu = (props: FilterMenuPropsInterface) => {

    const dispatch = useAppDispatch();

    let candidateState: CandidateState = useSelector(
        (state: RootState) => state.candidates
    );

    const [searchText, setSearchText] = useState('');
    const [selectedIV, setSelectedIV] = useState<number[]>();
    const [selectedTechnology, setSelectedTechnology] = useState<number[]>();
    const [selectedSkills, setSelectedSkills] = useState<number[]>();
    const [selectedFilterMenu, setSelectedFilterMenu] = useState(0);


    useEffect(() => {
        setSearchText(candidateState.filter.searchText || '');
        setSelectedIV(candidateState.filter.industryVertical);
        setSelectedTechnology(candidateState.filter.technology);
        setSelectedSkills(candidateState.filter.skills);
    }, [])

    const handleSearchInputChange = (event: any) => {
        setSearchText(event.target.value)
    }

    const handleFilter = () => {
        if (!searchText && !selectedIV && !selectedTechnology && !selectedSkills) {
            props.closeModal();
            return;
        }
        const filterOptions: filterOptions = {
            searchText: searchText,
            industryVertical: selectedIV,
            technology: selectedTechnology,
            skills: selectedSkills
        }
        dispatch(setFilter(filterOptions))
        dispatch(filterCandidates(filterOptions)).then(resp => {
            if ((resp.type == "candidate/filterCandidate/fulfilled")) {
                props.closeModal()
            }
        })

    }

    const handleFilterReset = () => {
        const filterOptions: filterOptions = {
            searchText: '',
            industryVertical: [],
            technology: [],
            skills: []
        }

        setSearchText('')
        setSelectedIV([]);
        setSelectedTechnology([]);
        setSelectedSkills([]);

        dispatch(setFilter(filterOptions))
        dispatch(getCandidateDetails()).then(resp => {
            if ((resp.type == "candidate/fetchAll/fulfilled")) {
                props.closeModal()
            }
        })
    }

    const handleFilterMenuClick = (menuIndex: number) => {
        setSelectedFilterMenu(menuIndex)
    }

    const handleIVSelect = (id: number) => {
        if (selectedIV && selectedIV.includes(id)) {
            // remove selected value from list if already exist
            const selectedIVCopy = [...selectedIV]
            selectedIVCopy.splice(selectedIV.indexOf(id), 1)
            setSelectedIV(selectedIVCopy)
        } else {
            setSelectedIV([...(selectedIV || []), id])
        }
    }

    const handleTechnologySelect = (id: number) => {
        if (selectedTechnology && selectedTechnology.includes(id)) {
            // remove selected value from list if already exist
            const selectedTechCopy = [...selectedTechnology]
            selectedTechCopy.splice(selectedTechnology.indexOf(id), 1)
            setSelectedTechnology(selectedTechCopy)
        } else {
            setSelectedTechnology([...(selectedTechnology || []), id])
        }
    }

    const handleSkillSelect = (id: number) => {
        if (selectedSkills && selectedSkills.includes(id)) {
            // remove selected value from list if already exist
            const selectedSkillsCopy = [...selectedSkills]
            selectedSkillsCopy.splice(selectedSkills.indexOf(id), 1)
            setSelectedSkills(selectedSkillsCopy)
        } else {
            setSelectedSkills([...(selectedSkills || []), id])
        }
    }

    return (
        <section className="w-full h-auto bg-white">
            <div className="w-full h-auto bg-white border rounded drop-shadow-lg p-5">
                {/* Input for search */}
                <div className="">
                    <input
                        type="text"
                        name="searchCandidate"
                        id="searchCandidate"
                        autoFocus
                        className="text-xl h-16 w-full p-2 pl-4 bg-slate-50 rounded-md border border-tecnita-blue"
                        placeholder="Search by Candidate Name"
                        onChange={handleSearchInputChange}
                        value={searchText}
                    />
                </div>
            </div>
            <div className="w-full h-96 rounded p-5">
                <div className="flex items-start justify-start">
                    <div className="w-1/4 bg-gray-200 h-96 rounded-lg">
                        <div
                            className={`h-15 w-full p-4 cursor-pointer ${selectedFilterMenu === 0 && 'bg-slate-500 text-white rounded-lg'}`}
                            onClick={() => handleFilterMenuClick(0)}
                        >
                            Industry Vertical
                        </div>
                        <div
                            className={`h-15 w-full p-4 cursor-pointer ${selectedFilterMenu === 1 && 'bg-slate-500 text-white rounded-lg'}`}
                            onClick={() => handleFilterMenuClick(1)}
                        >
                            Technology
                        </div>
                        <div
                            className={`h-15 w-full p-4 cursor-pointer ${selectedFilterMenu === 2 && 'bg-slate-500 text-white rounded-lg'}`}
                            onClick={() => handleFilterMenuClick(2)}
                        >
                            Skills
                        </div>
                    </div>
                    <div className="w-3/4 ml-2 bg-gray-200 h-96 rounded-lg overflow-y-auto">
                        {selectedFilterMenu === 0 && (
                            <FilterBody options={candidateState.industryVerticals} selectedValues={selectedIV} handleChange={handleIVSelect} />
                        )}
                        {selectedFilterMenu === 1 && (
                            <FilterBody options={candidateState.technologies} selectedValues={selectedTechnology} handleChange={handleTechnologySelect} />
                        )}
                        {selectedFilterMenu === 2 && (
                            <FilterBody options={candidateState.skills} selectedValues={selectedSkills} handleChange={handleSkillSelect} />
                        )}
                    </div>
                </div>
            </div>
            <div className="w-full h-32 p-5 flex items-center justify-end">
                <button
                    className="bg-blue-500 p-3 text-white w-36 text-lg rounded-md ml-5"
                    onClick={handleFilter}
                >
                    Filter
                </button>
                <button
                    className="bg-slate-500 p-3 text-white w-36 text-lg rounded-md ml-5"
                    onClick={handleFilterReset}
                >
                    Reset
                </button>
            </div>
        </section>
    )
}

export default FilterMenu