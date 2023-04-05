import { BrowserRouter, Route, Routes } from "react-router-dom";

import AddCandidate from "./../AddCandidate/AddCandidate";

const CandidateHome = () => {
  return (
    <>
      <Routes>
        <Route path="add" element={<AddCandidate />} />
        {/* <Route path="/candidates" element={} /> */}
      </Routes>
    </>
  );
};

export default CandidateHome;
