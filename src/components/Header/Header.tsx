import "./Header.scss";

import ProfileActions from "./../ProfileActions/ProfileActions"
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import SearchBox from "../SearchBox/SearchBox";

const Header = () => {

    let { name, role } = useSelector(
        (state: RootState) => state.auth
    );



    return (
        <header className="header w-full h-12 drop-shadow-sm flex items-center justify-start fixed bg-white">
            <div className="logo-box w-48">
                <img src="/img/logo.svg" alt="logo" />
            </div>
            <SearchBox />
            <div className="w-1/3 flex justify-end">
                <ProfileActions userName={name} role={role}></ProfileActions>
            </div>
        </header>
    );
}

export default Header;
