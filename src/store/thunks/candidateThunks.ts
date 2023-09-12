import { createAsyncThunk } from "@reduxjs/toolkit";
import { CandidateDetail, filterOptions } from "../../common/interfaces/candidateInterface";
import apiUrls from "../../common/apiUrls";
import { post, get } from "./../../utils/apiUtils";
import { AxiosResponse } from "axios";


const createCandidateData = (candidateDetails: CandidateDetail) => {
    const {
        id,
        firstName,
        lastName,
        email,
        phone,
        jobTitle,
        expYears,
        expMonths,
        expertise,
        summary,
        industryVerticals,
        visaStatus,
        noticePeriod,
        salaryExpectations,
        employmentTypes,
        location,
        resumeUrl,
        technologies,
        skills,
        roles,
        website,
        linkedIn,
        source
    } = candidateDetails;



    const total_exp = expYears * 12 + expMonths;

    const comments: any = [];

    const candidateData = {
        id: id,
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        job_title: jobTitle,
        total_exp_months: total_exp,
        expertise,
        job_summary: summary,
        industry_verticals: industryVerticals,
        visa_status: visaStatus,
        notice_period_days: noticePeriod,
        salary_expectations: salaryExpectations,
        employment_types: employmentTypes,
        location,
        resume_url: resumeUrl,
        comments,
        technologies,
        skills,
        roles,
        linkedin_URL: linkedIn,
        website_url: website,
        referral_source: source,
        userId: "80aa41a0-973a-4b39-8a5c-890bd3bc9aae"
    };

    return candidateData;
};

export const addCandidateDetails = createAsyncThunk(
    "candidate/addNew",
    async (candidateDetails: CandidateDetail, thunkAPI) => {
        const candidateData = createCandidateData(candidateDetails);
        const response: AxiosResponse = await post(apiUrls.ADD_CANDIDATE, candidateData);
        return response.data.data;
    }
);

export const editCandidateDetails = createAsyncThunk(
    "candidate/editDetail",
    async (candidateDetails: CandidateDetail, thunkAPI) => {
        const candidateData = createCandidateData(candidateDetails);
        const response: AxiosResponse = await post(apiUrls.EDIT_CANDIDATE, candidateData);
        return response.data.data;
    }
);

const getCandidateDetailsMap = (candidateDetails: any) => {
    return candidateDetails.map(
        (candidateDetail: any) => ({
            id: candidateDetail.id,
            firstName: candidateDetail.first_name,
            lastName: candidateDetail.last_name,
            email: candidateDetail.email,
            phone: candidateDetail.phone,
            jobTitle: candidateDetail.job_title,
            expYears: Math.floor(candidateDetail.total_exp_months / 12),
            expMonths: Math.floor(candidateDetail.total_exp_months % 12),
            expertise: candidateDetail.expertise,
            summary: candidateDetail.job_summary,
            industryVerticals: candidateDetail.industry_verticals,
            visaStatus: candidateDetail.visa_status,
            noticePeriod: candidateDetail.notice_period_days,
            salaryExpectations: candidateDetail.salary_expectations,
            employmentTypes: candidateDetail.employment_types,
            location: candidateDetail.location,
            resumeUrl: candidateDetail.resume_url,
            technologies: candidateDetail.technologies,
            roles: candidateDetail.roles,
            skills: candidateDetail.skills,
            comments: candidateDetail.comments,
            candidateStatus: candidateDetail.candidate_status,
            linkedIn: candidateDetail.linkedInURL || "",
            website: candidateDetail.websiteURL || "",
            source: candidateDetail.referralSource || ""
        })
    )
}

export const getCandidateDetails = createAsyncThunk(
    "candidate/fetchAll",
    async (thunkAPI) => {
        const response = await get(apiUrls.GET_CANDIDATES);
        const candidateDetails = response?.data ?? [];
        const candidateData: CandidateDetail[] = getCandidateDetailsMap(candidateDetails);
        return candidateData;
    }
);

export const getConfig = createAsyncThunk(
    "candidate/getConfig",
    async (_, thunkAPI) => {
        const response = await fetchConfig();
        return response;
    }
);

async function fetchConfig() {
    const response = await get(apiUrls.GET_CONFIG);
    return response && response.data;
}

export const uploadResumeFile = createAsyncThunk(
    "candidate/uploadResume",
    async (resumeFile: File, thunkAPI) => {
        const formData = new FormData();
        formData.append("resumeFile", resumeFile, resumeFile.name);
        const response = await post(apiUrls.UPLOAD_RESUME, formData);
        return response?.data;
    }
);


export const filterCandidates = createAsyncThunk(
    "candidate/filterCandidate",
    async (filterData: filterOptions, thunkAPI) => {
        const response: AxiosResponse = await post(apiUrls.FILTER_CANDIDATE, filterData);
        const candidateDetails = response?.data ?? [];
        const candidateData: CandidateDetail[] = getCandidateDetailsMap(candidateDetails);
        return candidateData;
    }
);

// const createComment = (text: string): Comment => ({
//     text,
// });