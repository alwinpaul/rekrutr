import { createSlice } from "@reduxjs/toolkit";
import { CandidateDetail, StatusObj } from "./../../common/interfaces/candidateInterface";
import { addCandidateDetails, getCandidateDetails, getConfig } from "../thunks/candidateThunks";

export interface CandidateState {
	candidates: CandidateDetail[];
	visaStatus: StatusObj[];
	employmentTypes: StatusObj[];
	roles: StatusObj[];
	skills: StatusObj[];
	salaryUnits: string[];
	industryVerticals: StatusObj[];
	selectedCandidate?: CandidateDetail
}

const initialState = {
	candidates: [],
	visaStatus: [],
	employmentTypes: [],
	roles: [],
	skills: [],
	salaryUnits: [],
	industryVerticals: [],
	selectedCandidate: undefined
} as CandidateState;

export const candidateSlice = createSlice({
	name: "candidates",
	initialState,
	reducers: {
		selectCandidate(state, action) {
			state.selectedCandidate = { ...action.payload }
		}
	},
	extraReducers: (builder) => {
		builder.addCase(addCandidateDetails.fulfilled, (state, action) => {
			state.candidates.push(action.payload);
		});
		builder.addCase(getCandidateDetails.fulfilled, (state, action) => {
			state.candidates = [...action.payload];
		});
		builder.addCase(getConfig.fulfilled, (state, action) => {
			state.visaStatus = [...action.payload.visa_status];
			state.employmentTypes = [...action.payload.employment_types];
			state.roles = [...action.payload.roles];
			state.skills = [...action.payload.skills];
			state.salaryUnits = [...action.payload.salary_units];
			state.industryVerticals = [...action.payload.industry_verticals];
		});
	},
});
export default candidateSlice.reducer;
export const { selectCandidate } = candidateSlice.actions
