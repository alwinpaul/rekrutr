import "./Header.scss";

import ProfileActions from "./../ProfileActions/ProfileActions"
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
const Header = () => {

    let { name, role } = useSelector(
        (state: RootState) => state.auth
    );

    return (
        <header className="header w-full h-12 drop-shadow-sm flex items-start justify-between fixed bg-white">
            <div className="logo-box">
                <img src="/img/tecnita_logo.png" alt="tecnita logo" />
            </div>
            <div className="float-right">
                <ProfileActions userName={name} role={role}></ProfileActions>
            </div>
        </header>
    );
}

export default Header;
