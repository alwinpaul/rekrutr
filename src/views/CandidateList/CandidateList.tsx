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

	let { candidates, selectedCandidate, fetchingCandidates } = useSelector(
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
				<div className="text-xs font-bold text-right p-2 text-white"> Total Candidates : {candidates.length}</div>
				{candidates.map((candidate: CandidateDetail, index) => (
					<CandidateCard candidate={candidate} isActive={selectedCandidate?.id === candidate.id} key={index}></CandidateCard>
				))} {
					(!fetchingCandidates && (!candidates || candidates.length <= 0)) && (
						<div>
							<div className="text-lg font-bold text-center text-slate-100">No Candidates Found!!!</div>
							<div className="text-sm text-center text-slate-100">If you are filtering candidates, try changing the filter values.</div>
						</div>
					)
				}
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
