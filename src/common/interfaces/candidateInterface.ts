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
	location: Location;
	resumeUrl: string;
	comments: Array<Comment>;
	technologies: number[];
	roles: number[];
	skills: string[];
	candidateStatus?: string[];
	source?: string;
	website?: string;
	linkedIn?: string;
}

export interface StatusObj {
	id?: number;
	value: any;
	created_at?: string;
}

export interface CurrencyObj {
	id?: number;
	value: string;
	displayText: string
	created_at?: string;
}

export interface RolesObj {
	id?: number;
	value: any;
	technologyId: number
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
	currency?: number;
}

export interface Location {
	id?: number;
	city?: string;
	province_state?: string;
	country?: string;
	timestamp?: string;
	description: string;
	lat?: string;
	long?: string;
	placeId?: string;
}

export interface filterOptions {
	searchText?: string;
	industryVertical?: Array<number> | undefined;
	technology?: Array<number> | undefined;
	skills?: Array<number> | undefined;
}