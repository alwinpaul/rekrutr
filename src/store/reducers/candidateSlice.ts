import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RolesObj, CandidateDetail, StatusObj, CurrencyObj, filterOptions } from "./../../common/interfaces/candidateInterface";
import { addCandidateDetails, filterCandidates, getCandidateDetails, getConfig } from "../thunks/candidateThunks";

export interface CandidateState {
	candidates: CandidateDetail[];
	visaStatus: StatusObj[];
	employmentTypes: StatusObj[];
	technologies: StatusObj[];
	roles: RolesObj[];
	skills: StatusObj[];
	salaryUnits: string[];
	industryVerticals: StatusObj[];
	selectedCandidate?: CandidateDetail;
	currencies: CurrencyObj[];
	filter: filterOptions;
	fetchingCandidates?: boolean;
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
	selectedCandidate: undefined,
	currencies: [],
	filter: {
		searchText: '',
		industryVertical: undefined,
		technology: undefined,
		skills: undefined
	},
	fetchingCandidates: false
};

export const candidateSlice = createSlice({
	name: "candidates",
	initialState,
	reducers: {
		selectCandidate(state, action) {
			state.selectedCandidate = { ...action.payload }
		},
		setFilter(state, action: PayloadAction<filterOptions>) {
			state.filter = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(addCandidateDetails.fulfilled, (state, action) => {
			// No side effect now
		});
		builder.addCase(getCandidateDetails.pending, (state, action) => {
			state.fetchingCandidates = true;
		});
		builder.addCase(getCandidateDetails.fulfilled, (state, action) => {
			state.candidates = [...action.payload];
			if (state.selectedCandidate && state.selectedCandidate.id) {
				state.selectedCandidate = { ...action.payload.filter(candidate => candidate.id === state.selectedCandidate?.id)[0] }
			}
			state.fetchingCandidates = false;
		});
		builder.addCase(getConfig.fulfilled, (state, action) => {
			state.visaStatus = [...action.payload.visa_status];
			state.employmentTypes = [...action.payload.employment_types];
			state.technologies = [...action.payload.technologies];
			state.roles = [...action.payload.roles];
			state.skills = [...action.payload.skills];
			state.salaryUnits = [...action.payload.salary_units];
			state.industryVerticals = [...action.payload.industry_verticals];
			state.currencies = [...action.payload.currency];
		});
		builder.addCase(filterCandidates.fulfilled, (state, action) => {
			state.candidates = [...action.payload];
		});
	},
});
export default candidateSlice.reducer;
export const { selectCandidate, setFilter } = candidateSlice.actions
