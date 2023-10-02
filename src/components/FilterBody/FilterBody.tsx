import { Checkbox, FormControlLabel } from '@mui/material'
import React, { useState } from 'react'
import { StatusObj } from '../../common/interfaces/candidateInterface'

interface FilterBodyProps {
    options: Array<StatusObj>
    selectedValues: Array<number> | undefined
    handleChange: Function
}

const FilterBody = (props: FilterBodyProps) => {
    const [filteredOptions, setFilteredOptions] = useState(props.options);

    const handleFilterOptions = (event: any) => {
        const searchValue = event.target.value;
        let filteredVal = props.options.filter(elem => (elem.value.toLowerCase().includes(searchValue.toLowerCase())))
        setFilteredOptions(filteredVal)
    }

    return (
        <>
            {
                filteredOptions && (
                    <div className='p-5 w-full flex items-center justify-start bg-gray-200 z-10'>
                        <input className='p-1 border-gray-300 border-2 w-full rounded-md' type="text" onChange={handleFilterOptions} placeholder='Start typing to filter options below' />
                    </div>
                )
            }
            {
                filteredOptions.map(op => (
                    <div className="w-1/3 inline-block p-2 mt-2" key={op.value}>

                        <FormControlLabel control={
                            <Checkbox
                                checked={typeof op.id == 'number' && !!props.selectedValues && props.selectedValues.includes(op.id)}
                                onChange={() => op.id && props.handleChange(op.id)} />
                        } label={op.value} />
                    </div>
                ))
            }
        </>
    )
}

export default FilterBody