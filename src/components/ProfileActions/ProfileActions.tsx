import { useState } from "react";
import { useAppDispatch } from "../../store/store";
import { signOut } from "../../store/thunks/authThunks";
import ConfirmBox from "../ConfirmBox/ConfirmBox";


interface ProfileActionsInterface {
    className?: string,
    userName: string,
    role: string
}


const ProfileActions = (props: ProfileActionsInterface) => {

    const dispatch = useAppDispatch();

    const [showMenu, setShowMenu] = useState(false);
    const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);

    const getInitials = (full_name: string) => {
        return full_name.split(" ").map((nm, index) => {
            if (index <= 1) {
                return nm[0]
            }
        }).join("")
    }

    const confirmSignOut = () => {
        dispatch(signOut());
    }

    const handleSignOut = () => {
        setShowSignOutConfirm(true)
    }

    const handleSignOutConfirmClose = () => {
        setShowSignOutConfirm(false)
        setShowMenu(false)
    }

    return (
        <>
            <div className={props.className || "" + " fixed top-0"}>
                <div className="w-48 h-auto flex items-center justify-start cursor-pointer" onClick={() => setShowMenu(!showMenu)}>
                    <div className="w-8 h-8 flex items-center uppercase justify-center border font-bold text-xs text-white bg-base-blue rounded-full m-2 ">{getInitials(props.userName)}</div>
                    <div className="text-base-blue truncate w-40 font-semibold capitalize">{props.userName}</div>
                </div>
                {showMenu && (
                    <div className="w-48 h-auto bg-white border rounded drop-shadow-lg p-1">

                        <div className="w-42 h-auto p-2 cursor-pointer" onClick={handleSignOut}>Sign Out</div>
                    </div>
                )}
            </div>
            <ConfirmBox show={showSignOutConfirm} onSuccess={confirmSignOut} onFailure={handleSignOutConfirmClose} onClose={handleSignOutConfirmClose}>
                Are you sure you want to Sign Out?
            </ConfirmBox>
        </>
    )
}

export default ProfileActions