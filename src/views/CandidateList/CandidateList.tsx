import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "./../../store/store";
import { getCandidateDetails } from "./../../store/thunks/candidateThunks";
import { CandidateDetail } from "./../../common/interfaces/candidateInterface";
import CandidateDetails from "./../../components/CandidateDetail/CandidateDetail";

import "./CandidateList.scss";
import CandidateCard from "../../components/CandidateCard/CandidateCard";


const CandidateList = () => {

	let { candidates, selectedCandidate } = useSelector(
		(state: RootState) => state.candidates
	);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getCandidateDetails());
	}, []);

	return (
		<div className="candidate-details-view">
			<div className="candidate-list-box">
				{candidates.map((candidate: CandidateDetail, index) => (
					<CandidateCard candidate={candidate} isActive={selectedCandidate?.id === candidate.id} key={index}></CandidateCard>
				))}
			</div>
			<div className="candidate-detail-box">
				<CandidateDetails candidate={selectedCandidate || null} />
			</div>
		</div>
	);

};

export default CandidateList;
