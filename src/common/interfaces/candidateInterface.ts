export interface CandidateDetail {
	id?: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	jobTitle: string;
	expYears: number;
	expMonths: number;
	expertise: string;
	summary: string;
	industryVerticals: string[];
	visaStatus: number;
	noticePeriod: number;
	salaryExpectations: salaryExpectations[];
	employmentTypes: number[];
	location: string;
	resumeUrl: string;
	comments: Array<Comment>;
	roles: string[];
	skills: string[];
	candidateStatus?: string[];
}

export interface StatusObj {
	id?: number;
	value: any;
	created_at?: string;
}

export interface Comment {
	id?: number;
	text: string;
	user: string;
	timestamp?: string;
}

export interface salaryExpectations {
	id?: number;
	value: number;
	unit: string;
	timestamp?: string;
}
