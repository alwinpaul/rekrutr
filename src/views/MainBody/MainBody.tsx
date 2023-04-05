import { BrowserRouter, Route, Routes } from "react-router-dom";

import LeftNav from "./../../components/LeftNav/LeftNav";
import { HomeView } from "./../HomeView/HomeView";
import CandidateHome from "./../CandidateHome/CandidateHome";
import "./MainBody.scss";

const MainBody = () => {
  return (
    <div className="main-body">
      <div className="left-nav">
        <LeftNav />
      </div>
      <div className="route-wrapper">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/candidates//*" element={<CandidateHome />} />
            <Route path="/jobs" element={<CandidateHome />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default MainBody;
