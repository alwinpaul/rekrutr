import { BrowserRouter, Route, Routes } from "react-router-dom";

import LeftNav from "./../../components/LeftNav/LeftNav";
import { HomeView } from "./../HomeView/HomeView";
import CandidateHome from "./../CandidateHome/CandidateHome";
import "./MainBody.scss";

const MainBody = () => {
  // var isActive = this.context.router.route.location.pathname === this.props.to;
  //       var className = isActive ? 'active' : '';

  return (
    <div className="main-body">
      <BrowserRouter>
        <div className="left-nav">
          <LeftNav />
        </div>
        <div className="route-wrapper">
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/candidates//*" element={<CandidateHome />} />
            <Route path="/jobs" element={<CandidateHome />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default MainBody;
