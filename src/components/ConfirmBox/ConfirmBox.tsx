import { ReactNode, useState } from 'react';

import Overlay from './../Overlay/Overlay'

interface ConfirmBoxInterface {
    children: ReactNode,
    onSuccess: Function,
    onFailure: Function,
    onClose: Function,
    show: boolean
}

const ConfirmBox = (props: ConfirmBoxInterface) => {
    return (
        <Overlay isOpen={props.show} closeModal={props.onClose}>
            <div className='w-1/2 h-auto m-auto mt-5 border rounded-lg bg-white'>
                <div className="text-2xl m-4 p-2 text-center">{props.children}</div>
                <div className='h-12 flex items-center justify-center space-x-3 m-3'>
                    <button className='pt-2 pb-2 pr-5 pl-5 border rounded-md' onClick={() => props.onFailure()}>Cancel</button>
                    <button className='pt-2 pb-2 pr-5 pl-5 border-0 rounded-md bg-tecnita-blue text-white' onClick={() => props.onSuccess()}>Confirm</button>
                </div>
            </div>
        </Overlay>
    )
}

export default ConfirmBox