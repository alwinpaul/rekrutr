import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import AddCandidateBasic from "./../AddCandidateBasic/AddCandidateBasic";
import CandidateList from "./../CandidateList/CandidateList";
import { useAppDispatch } from "./../../store/store";
import { getConfig } from "./../../store/thunks/candidateThunks";

const CandidateHome = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getConfig())
  }, [])

  return (
    <>
      <Routes>
        <Route path="add" element={<AddCandidateBasic />} />
        <Route path="/" element={<CandidateList />} />
      </Routes>
    </>
  );
};

export default CandidateHome;
