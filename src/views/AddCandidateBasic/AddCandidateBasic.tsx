import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { RootState, useAppDispatch } from "./../../store/store";
import InputCard from "./../../components/InputCard/InputCard";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";


import {
	CandidateDetail,
} from "./../../common/interfaces/candidateInterface";

import "./AddCandidateBasic.scss";
import { addCandidateDetails, uploadResumeFile } from "../../store/thunks/candidateThunks";
import Autocomplete from "@mui/material/Autocomplete";
import { useSelector } from "react-redux";
import { CandidateState } from "../../store/reducers/candidateSlice";

const phoneRegExp = /^\d{10}$/;

const defaultFormValue: CandidateDetail = {
	firstName: "",
	lastName: "",
	email: "",
	phone: "",
	jobTitle: "",
	industryVerticals: [],
	expertise: "",
	summary: "",
	location: "",
	noticePeriod: 0,
	expYears: 1,
	expMonths: 1,
	roles: [],
	skills: [],
	visaStatus: 1,
	employmentTypes: [],
	salaryExpectations: [{
		value: 0,
		unit: "per_hour"
	}],
	resumeUrl: "",
	comments: []
};

const newCandidateSchema = Yup.object().shape({
	firstName: Yup.string()
		.min(2, "Too Short!")
		.max(50, "Too Long!")
		.required("Required"),
	lastName: Yup.string()
		.min(2, "Too Short!")
		.max(50, "Too Long!")
		.required("Required"),
	email: Yup.string()
		.email("Invalid email")
		.required("Required"),
	phone: Yup.string()
		.matches(phoneRegExp, "Invalid Phone number")
		.required("Required"),
	jobTitle: Yup.string()
		.min(4, "Too Short!")
		.max(50, "Too Long!")
		.required("Required"),
	industryVerticals: Yup.array()
		.min(1, "Required"),
	expertise: Yup.string()
		.min(2, "Too Short!")
		.max(600, "Too Long!")
		.required("Required"),
	summary: Yup.string()
		.min(2, "Too Short!")
		.max(600, "Too Long!")
		.required("Required"),
	location: Yup.string()
		.min(2, "Too Short!")
		.max(50, "Too Long!")
		.required("Required"),
	noticePeriod: Yup.number()
		.min(0, "Too Short!")
		.max(90, "Too Long!")
		.required("Required"),
	expYears: Yup.number().required("Required"),
	expMonths: Yup.number().required("Required"),
	roles: Yup.array()
		.min(1, "Required"),
	skills: Yup.array()
		.min(1, "Required"),
	visaStatus: Yup.number().required("Required"),
	employmentTypes: Yup.array()
		.of(Yup.number().required("Required")),
	salaryExpectations: Yup.array()
		.of(Yup.object().shape({
			value: Yup.number(),
			unit: Yup.string()
		}))
		.min(1, 'Required')
});

interface AddCandidateBasicProps { }

const AddCandidateBasic = (props: AddCandidateBasicProps) => {
	const [resumeFile, setResumeFile] = useState<File | undefined>();
	const [successAlert, setSuccessAlert] = useState(false);
	const [initialValue, setInitiaValue] = useState(defaultFormValue);

	let candidateState: CandidateState = useSelector(
		(state: RootState) => state.candidates
	);

	useEffect(() => { }, []);
	const dispatch = useAppDispatch();

	const formik = useFormik({
		initialValues: initialValue,
		validationSchema: newCandidateSchema,
		onSubmit: (values) => {
			console.log(JSON.stringify(values, null, 2));
			saveCandidateDetails(values);
		},
	});

	const saveCandidateDetails = (values: CandidateDetail) => {
		dispatch(addCandidateDetails(values)).then((resp) => {
			if ((resp.type == "candidate/addNew/fulfilled")) {
				setSuccessAlert(true);
				// formik.resetForm();
				setTimeout(() => {
					setSuccessAlert(false);
				}, 7000);
			} else if (resp.type == "candidate/addNew/rejected") {
				alert("Something went wrong....Couldn't save data")
			}
		});
	};

	const handleAutoCompleteChange = (event: any, val: any, targetName: string) => {
		formik.setFieldValue(targetName, [...val]);
	}

	const handleFileUpload = (e: any) => {
		if (resumeFile) {
			dispatch(uploadResumeFile(resumeFile)).then((resp) => {
				console.log(resp)
			})
		}
	}


	return (
		<section className="candidate-container">
			<h2>New Profile</h2>
			<div className="candidate-form">
				<form onSubmit={formik.handleSubmit}>
					<h3 className="section-title">Basic Details</h3>
					<InputCard name="Name" cardDescription="Enter first and last name">
						<Box
							component="div"
							sx={{
								"& > :not(style)": { mr: 1, width: "30ch" },
							}}
						>
							<TextField
								className="input-field"
								id="first_name"
								label="First name"
								variant="outlined"
								name="firstName"
								error={
									formik.touched.firstName && Boolean(formik.errors.firstName)
								}
								helperText={formik.touched.firstName && formik.errors.firstName}
								value={formik.values.firstName}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							<TextField
								className="input-field"
								id="last_name"
								label="Last name"
								variant="outlined"
								name="lastName"
								error={
									formik.touched.lastName && Boolean(formik.errors.lastName)
								}
								helperText={formik.touched.lastName && formik.errors.lastName}
								value={formik.values.lastName}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</Box>
					</InputCard>

					{/* contact information */}
					<InputCard name="Contact information">
						<Box
							component="div"
							sx={{
								"& > :not(style)": { mr: 1, width: "61ch" },
							}}
						>
							<TextField
								className="input-field"
								id="email"
								label="Email"
								variant="outlined"
								margin="normal"
								fullWidth
								name="email"
								error={formik.touched.email && Boolean(formik.errors.email)}
								helperText={formik.touched.email && formik.errors.email}
								value={formik.values.email}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							<TextField
								className="input-field"
								id="contact"
								label="Contact number"
								variant="outlined"
								fullWidth
								name="phone"
								error={formik.touched.phone && Boolean(formik.errors.phone)}
								helperText={formik.touched.phone && formik.errors.phone}
								value={formik.values.phone}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</Box>
					</InputCard>

					<h3 className="section-title">Work Experience</h3>

					<InputCard name="Job Title">
						<Box
							component="div"
							sx={{
								"& > :not(style)": { mr: 1, width: "61ch" },
							}}
						>
							<TextField
								className="input-field"
								id="jobTitle"
								label="Job Title"
								variant="outlined"
								margin="normal"
								fullWidth
								name="jobTitle"
								error={
									formik.touched.jobTitle && Boolean(formik.errors.jobTitle)
								}
								helperText={formik.touched.jobTitle && formik.errors.jobTitle}
								value={formik.values.jobTitle}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</Box>
					</InputCard>

					<InputCard name="Total Experience">
						<Box
							component="div"
							sx={{
								"& > :not(style)": { mr: 1, width: "30ch" },
							}}
						>
							<TextField
								className="input-field"
								id="exp_year"
								select
								label="Years"
								variant="outlined"
								fullWidth
								name="expYears"
								error={
									formik.touched.expYears && Boolean(formik.errors.expYears)
								}
								helperText={formik.touched.expYears && formik.errors.expYears}
								value={formik.values.expYears}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							>
								{[...Array(100)].map((option, index) => (
									<MenuItem key={index} value={index + 1}>
										{index} {`year${index > 1 ? "s" : ""}`}
									</MenuItem>
								))}
							</TextField>
							<TextField
								className="input-field"
								id="exp_month"
								select
								label="Months"
								variant="outlined"
								fullWidth
								name="expMonths"
								error={
									formik.touched.expMonths && Boolean(formik.errors.expMonths)
								}
								helperText={
									formik.touched.expMonths && formik.errors.expMonths
								}
								value={formik.values.expMonths}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							>
								{[...Array(12)].map((option, index) => (
									<MenuItem key={index} value={index + 1}>
										{index + 1} {`month${index > 0 ? "s" : ""}`}
									</MenuItem>
								))}
							</TextField>
						</Box>
					</InputCard>

					<InputCard name="Industry vertical">
						<Box
							component="div"
							sx={{
								"& > :not(style)": { mr: 1, width: "61ch" },
							}}
						>
							<Autocomplete
								multiple
								options={candidateState.industryVerticals.map(op => op.value)}
								filterSelectedOptions
								freeSolo
								value={formik.values.industryVerticals}
								onBlur={formik.handleBlur}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Industry Vertical"
										placeholder="Start typing to filter suggestions"
										name="industryVerticals"
										id="industryVerticals"
										error={
											Boolean(formik.touched.industryVerticals &&
												formik.errors.industryVerticals)
										}
										onBlur={formik.handleBlur}
										value={formik.values.industryVerticals}
										helperText={
											formik.touched.industryVerticals &&
											formik.errors.industryVerticals
										}
									/>
								)}
								onChange={(e, newVal) => handleAutoCompleteChange(e, newVal, "industryVerticals")}
							/>
						</Box>
					</InputCard>

					<InputCard name="Roles">
						<Box
							component="div"
							sx={{
								"& > :not(style)": { mr: 1, width: "61ch" },
							}}
						>
							<Autocomplete
								multiple
								options={candidateState.roles.map(op => op.value)}
								filterSelectedOptions
								freeSolo
								value={formik.values.roles}
								onBlur={formik.handleBlur}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Roles"
										placeholder="Start typing to filter suggestions"
										name="roles"
										id="roles"
										error={
											Boolean(formik.touched.roles &&
												formik.errors.roles)
										}
										onBlur={formik.handleBlur}
										value={formik.values.roles}
										helperText={
											formik.touched.roles &&
											formik.errors.roles
										}
									/>
								)}
								onChange={(e, newVal) => handleAutoCompleteChange(e, newVal, "roles")}
							/>
						</Box>
					</InputCard>

					<InputCard name="Skills">
						<Box
							component="div"
							sx={{
								"& > :not(style)": { mr: 1, width: "61ch" },
							}}
						>
							<Autocomplete
								multiple
								options={candidateState.skills.map(op => op.value)}
								filterSelectedOptions
								freeSolo
								value={formik.values.skills}
								onBlur={formik.handleBlur}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Skills"
										placeholder="Start typing to filter suggestions"
										name="skills"
										id="skills"
										error={
											Boolean(formik.touched.skills &&
												formik.errors.skills)
										}
										onBlur={formik.handleBlur}
										value={formik.values.skills}
										helperText={
											formik.touched.skills &&
											formik.errors.skills
										}
									/>
								)}
								onChange={(e, newVal) => handleAutoCompleteChange(e, newVal, "skills")}
							/>
						</Box>
					</InputCard>

					<InputCard name="Expertise">
						<Box
							component="div"
							sx={{
								"& > :not(style)": { mr: 1, width: "61ch" },
							}}
						>
							<TextField
								className="input-field"
								id="expertise"
								label="Expertise"
								variant="outlined"
								fullWidth
								multiline
								rows={4}
								name="expertise"
								error={
									formik.touched.expertise && Boolean(formik.errors.expertise)
								}
								helperText={formik.touched.expertise && formik.errors.expertise}
								value={formik.values.expertise}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</Box>
					</InputCard>

					<InputCard name="Summary">
						<Box
							component="div"
							sx={{
								"& > :not(style)": { mr: 1, width: "61ch" },
							}}
						>
							<TextField
								className="input-field"
								id="summary"
								label="Professional Summary"
								variant="outlined"
								fullWidth
								multiline
								rows={4}
								name="summary"
								error={formik.touched.summary && Boolean(formik.errors.summary)}
								helperText={formik.touched.summary && formik.errors.summary}
								value={formik.values.summary}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</Box>
					</InputCard>

					<h3 className="section-title">Other Details</h3>

					<InputCard name="Current Location">
						<Box
							component="div"
							sx={{
								"& > :not(style)": { mr: 1, width: "61ch" },
							}}
						>
							<TextField
								className="input-field"
								id="location"
								label="Current Location"
								variant="outlined"
								fullWidth
								name="location"
								error={
									formik.touched.location && Boolean(formik.errors.location)
								}
								helperText={formik.touched.location && formik.errors.location}
								value={formik.values.location}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</Box>
					</InputCard>

					<InputCard name="Notice Period">
						<Box
							component="div"
							sx={{
								"& > :not(style)": { mr: 1, width: "61ch" },
							}}
						>
							<TextField
								className="input-field"
								id="notice"
								label="Notice Period (Days)"
								variant="outlined"
								fullWidth
								name="noticePeriod"
								error={
									formik.touched.noticePeriod &&
									Boolean(formik.errors.noticePeriod)
								}
								helperText={
									formik.touched.noticePeriod && formik.errors.noticePeriod
								}
								value={formik.values.noticePeriod}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</Box>
					</InputCard>

					<InputCard name="Visa Status">
						<Box
							component="div"
							sx={{
								"& > :not(style)": { mr: 1, width: "61ch" },
							}}
						>
							<TextField
								className="input-field"
								id="visaStatus"
								select
								label="Visa status"
								variant="outlined"
								fullWidth
								name="visaStatus"
								error={
									formik.touched.visaStatus &&
									Boolean(formik.errors.visaStatus)
								}
								helperText={
									formik.touched.visaStatus && formik.errors.visaStatus
								}
								value={formik.values.visaStatus}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							>
								{candidateState.visaStatus.map((status, index) => (
									<MenuItem value={status.id} key={`op-vs-${index}`}>{status.value}</MenuItem>
								))}
							</TextField>
						</Box>
					</InputCard>

					<InputCard name="Income Expectation">
						{formik.values.salaryExpectations && formik.values.salaryExpectations.map((se, index) => (
							<Box
								component="div"
								sx={{
									"& > :not(style)": { mr: 1, width: "30ch" },
								}}
							>
								<TextField
									className="input-field"
									label="Amount"
									variant="outlined"
									fullWidth
									name={`salaryExpectations[${index}].value`}
									value={formik.values.salaryExpectations[index].value}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
								<TextField
									className="input-field"
									select
									label="Income unit"
									variant="outlined"
									fullWidth
									name={`salaryExpectations[${index}].unit`}
									value={formik.values.salaryExpectations[index].unit}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								>
									{candidateState.salaryUnits.map((unit, index) => (
										<MenuItem value={unit} key={`unit-${index}`}>{unit}</MenuItem>
									))}
								</TextField>
							</Box>
						))}
					</InputCard>

					<InputCard name="Employment Type">
						<Box
							component="div"
							sx={{
								"& > :not(style)": { mr: 1, width: "61ch" },
							}}
						>
							<Autocomplete
								multiple
								options={candidateState.employmentTypes.map(op => op.id)}
								getOptionLabel={(option) => candidateState.employmentTypes.find(elem => elem.id === option)?.value}
								filterSelectedOptions
								value={formik.values.employmentTypes}
								onBlur={formik.handleBlur}
								renderInput={(params) => (
									<TextField
										{...params}
										label="employmentTypes"
										placeholder="Start typing to filter suggestions"
										name="employmentTypes"
										id="employmentTypes"
										error={
											Boolean(formik.touched.employmentTypes &&
												formik.errors.employmentTypes)
										}
										onBlur={formik.handleBlur}
										value={formik.values.employmentTypes}
										helperText={
											formik.touched.employmentTypes &&
											formik.errors.employmentTypes
										}
									/>
								)}
								onChange={(e, newVal) => handleAutoCompleteChange(e, newVal, "employmentTypes")}
							/>
							{/* <TextField
								className="input-field"
								
								select
								label="Employment type"
								variant="outlined"
								fullWidth
								multiple
								name="employmentTypes"
								error={
									formik.touched.employmentTypes &&
									Boolean(formik.errors.employmentTypes)
								}
								helperText={
									formik.touched.employmentTypes &&
									formik.errors.employmentTypes
								}
								value={formik.values.employmentTypes}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							>
								{candidateState.employmentTypes.map((et, index) => (
									<MenuItem value={et.id} key={`et-${index}`}>{et.value}</MenuItem>
								))}

							</TextField> */}
						</Box>
					</InputCard>

					<h3 className="section-title">Resume</h3>

					<Stack direction="column" alignItems="flex-start" spacing={2}>
						<Button variant="outlined" component="label">
							<FileUploadOutlinedIcon />
							Get Resume
							<input
								hidden
								accept=".doc,.docx,.pdf,.txt"
								type="file"
								onChange={(e) => {
									if (!e.target.files) return;
									setResumeFile(e.target.files[0]);
								}}
							/>
						</Button>
						<div className="file-type-name">DOC, DOCX, PDF, TXT</div>
						{resumeFile && (
							<>
								<div className="upload-file-name">{resumeFile.name}</div>
								<Button variant="contained" component="label" onClick={handleFileUpload}>
									Upload
								</Button>
							</>
						)}
					</Stack>

					<Stack spacing={5} direction="row" justifyContent="center">
						<Button size="large" type="submit" variant="contained">
							Save
						</Button>
					</Stack>

					{successAlert && (
						<div className="success-msg">
							<Alert severity="success">
								<AlertTitle>Success</AlertTitle>
								Data saved successfully.
							</Alert>
						</div>
					)}
				</form>
			</div>
		</section>
	);
};

export default AddCandidateBasic;
