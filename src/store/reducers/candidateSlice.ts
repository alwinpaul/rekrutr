import { createSlice } from "@reduxjs/toolkit";
import { RolesObj, CandidateDetail, StatusObj } from "./../../common/interfaces/candidateInterface";
import { addCandidateDetails, getCandidateDetails, getConfig } from "../thunks/candidateThunks";

export interface CandidateState {
	candidates: CandidateDetail[];
	visaStatus: StatusObj[];
	employmentTypes: StatusObj[];
	technologies: StatusObj[];
	roles: RolesObj[];
	skills: StatusObj[];
	salaryUnits: string[];
	industryVerticals: StatusObj[];
	selectedCandidate?: CandidateDetail
}

const initialState: CandidateState = {
	candidates: [],
	visaStatus: [],
	employmentTypes: [],
	technologies: [],
	roles: [],
	skills: [],
	salaryUnits: [],
	industryVerticals: [],
	selectedCandidate: undefined
};

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
			// No side effect now
		});
		builder.addCase(getCandidateDetails.fulfilled, (state, action) => {
			state.candidates = [...action.payload];
		});
		builder.addCase(getConfig.fulfilled, (state, action) => {
			state.visaStatus = [...action.payload.visa_status];
			state.employmentTypes = [...action.payload.employment_types];
			state.technologies = [...action.payload.technologies];
			state.roles = [...action.payload.roles];
			state.skills = [...action.payload.skills];
			state.salaryUnits = [...action.payload.salary_units];
			state.industryVerticals = [...action.payload.industry_verticals];
		});
	},
});
export default candidateSlice.reducer;
export const { selectCandidate } = candidateSlice.actions
