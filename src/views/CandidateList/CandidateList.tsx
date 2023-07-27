import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "./../../store/store";
import { getCandidateDetails } from "./../../store/thunks/candidateThunks";
import { CandidateDetail } from "./../../common/interfaces/candidateInterface";
import CandidateDetails from "./../../components/CandidateDetail/CandidateDetail";

import "./CandidateList.scss";
import CandidateCard from "../../components/CandidateCard/CandidateCard";
import Overlay from "../../components/Overlay/Overlay";
import EditCandidate from "../../components/EditCandidate/EditCandidate";


const CandidateList = () => {

	let { candidates, selectedCandidate } = useSelector(
		(state: RootState) => state.candidates
	);

	const [isEditMode, setIsEditMode] = useState(false);
	const [editData, setEditData] = useState<null | CandidateDetail>(null);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getCandidateDetails());
	}, []);

	const handleClose = () => {
		setEditData(null);
		setIsEditMode(false)
	}

	const handleCandidateEdit = (candidate: CandidateDetail) => {
		setIsEditMode(true)
		setEditData(candidate);
	}

	return (
		<div className="candidate-details-view">
			<div className="candidate-list-box">
				{candidates.map((candidate: CandidateDetail, index) => (
					<CandidateCard candidate={candidate} isActive={selectedCandidate?.id === candidate.id} key={index}></CandidateCard>
				))}
			</div>
			<div className="candidate-detail-box">
				<CandidateDetails candidate={selectedCandidate || null} editCandidate={handleCandidateEdit} />
			</div>
			<Overlay isOpen={isEditMode} closeModal={handleClose}>
				<EditCandidate candidate={selectedCandidate} closeModal={handleClose} />
			</Overlay>
		</div>
	);

};

export default CandidateList;
