import { ReactNode, useEffect, useState } from "react";
import { useSelector } from 'react-redux';

import SignIn from "../SIgnIn/SignIn";
import { RootState, useAppDispatch } from "../../store/store";
import { validateLogin } from "../../store/thunks/authThunks";

interface validateLoginProps {
    children: ReactNode
}


export default function ValidateLogin(props: validateLoginProps) {

    const [renderView, setRenderView] = useState(false)

    let { tokenValid, email } = useSelector(
        (state: RootState) => state.auth
    );

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (email) {
            dispatch(validateLogin(email)).then(() => {
                setRenderView(true)
            })
        } else {
            setRenderView(true)
        }
    }, []);

    return (
        <>
            {(renderView && !tokenValid) ? (
                <SignIn />
            )
                :
                props.children
            }
        </>
    )
}
