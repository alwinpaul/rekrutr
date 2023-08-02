import { useState } from "react";
import { useFormik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { RootState, useAppDispatch } from "./../../store/store";
import InputCard from "./../../components/InputCard/InputCard";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import CloudDoneRoundedIcon from '@mui/icons-material/CloudDoneRounded';

import { CandidateDetail } from "./../../common/interfaces/candidateInterface";
import LocationField from "./../../components/LocationField/LocationField";


import { editCandidateDetails, getCandidateDetails, uploadResumeFile } from "../../store/thunks/candidateThunks";
import Autocomplete from "@mui/material/Autocomplete";
import { useSelector } from "react-redux";
import { CandidateState } from "../../store/reducers/candidateSlice";
import { CircularProgress } from "@mui/material";

import "./EditCandidate.scss";

const phoneRegExp = /^\d{10}$/;

const defaultFormValue: CandidateDetail = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    jobTitle: "",
    industryVerticals: [],
    expertise: "",
    summary: "",
    location: {
        city: "",
        province_state: "",
        country: "",
        description: "",
        placeId: ""
    },
    noticePeriod: 0,
    expYears: 1,
    expMonths: 1,
    technologies: [],
    roles: [],
    skills: [],
    visaStatus: 1,
    employmentTypes: [],
    salaryExpectations: [{
        value: 0,
        unit: "per_hour",
        currency: 1
    }],
    resumeUrl: "",
    comments: [],
    source: "",
    website: "",
    linkedIn: ""
};

const editCandidateSchema = Yup.object().shape({
    id: Yup.string(),
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
    location: Yup.object({
        description: Yup.string().required('Required'),
        placeId: Yup.string()
    }),
    noticePeriod: Yup.number()
        .min(0, "Too Short!")
        .max(90, "Too Long!")
        .required("Required"),
    expYears: Yup.number().required("Required"),
    expMonths: Yup.number().required("Required"),
    roles: Yup.array()
        .min(1, "Required"),
    technologies: Yup.array()
        .min(1, "Required"),
    skills: Yup.array()
        .min(1, "Required"),
    visaStatus: Yup.number().required("Required"),
    employmentTypes: Yup.array()
        .of(Yup.number().required("Required")),
    salaryExpectations: Yup.array()
        .of(Yup.object().shape({
            value: Yup.number(),
            currency: Yup.string().required(),
            unit: Yup.string()
        }))
        .min(1, 'Required'),
    source: Yup.string(),
    website: Yup.string(),
    linkedIn: Yup.string()
});

interface EditCandidateProps {
    candidate: CandidateDetail | undefined
    closeModal: Function
}



const EditCandidate = (props: EditCandidateProps) => {
    const [resumeFile, setResumeFile] = useState<File | undefined>();
    const [successAlert, setSuccessAlert] = useState(false);
    const [resumeUploadStatus, setResumeUploadStatus] = useState(false);
    const [isSavingData, setIsSavingData] = useState(false);
    const [initialValue, setInitiaValue] = useState(defaultFormValue);
    const [isEditMode, setIsEditMode] = useState(false);

    let candidateState: CandidateState = useSelector(
        (state: RootState) => state.candidates
    );

    const dispatch = useAppDispatch();



    const formik = useFormik({
        initialValues: props.candidate || initialValue,
        validationSchema: editCandidateSchema,
        onSubmit: (values) => {
            saveCandidateDetails(values);
        }
    });

    const saveCandidateDetails = (values: CandidateDetail) => {
        dispatch(editCandidateDetails(values)).then((resp) => {
            if ((resp.type == "candidate/editDetail/fulfilled")) {
                dispatch(getCandidateDetails());
                formik.resetForm();
                setTimeout(() => {
                    props.closeModal()
                }, 7000);
            } else if (resp.type == "candidate/editDetail/rejected") {
                alert("Something went wrong....Couldn't save data")
            }
        });
    };

    const handleAutoCompleteChange = (event: any, val: any, targetName: string) => {
        formik.setFieldValue(targetName, [...val]);
    }

    const handleFileUpload = (e: any) => {
        setResumeUploadStatus(false);
        if (resumeFile) {
            setIsSavingData(true);
            dispatch(uploadResumeFile(resumeFile)).then((resp) => {
                if (resp.type === 'candidate/uploadResume/fulfilled') {
                    formik.setFieldValue("resumeUrl", resp.payload.url)
                    setResumeUploadStatus(true);
                } else {
                    alert("Resume upload failed")
                }
                setIsSavingData(false);
            })
        }
    }

    const handleLocationChange = (locationValue: any) => {
        if (!locationValue) {
            return
        }
        formik.setFieldValue("location", {
            description: locationValue.description,
            placeId: locationValue.place_id
        })
    }

    const testSubmit = (e: any) => {
        e.preventDefault();
        console.log(formik)
    }



    return (
        <section className="candidate-container m-auto bg-white relative pb-10 pt-10">
            <div className="candidate-form">
                <form onSubmit={formik.handleSubmit}>
                    {/* <form onSubmit={testSubmit}> */}
                    <h3 className="section-title text-xl font-bold m-4">Basic Details</h3>
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

                    <h3 className="section-title text-xl font-bold m-4">Work Experience</h3>

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
                                    <MenuItem key={index} value={index}>
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
                                {[...Array(13)].map((option, index) => (
                                    <MenuItem key={index} value={index}>
                                        {index} {`month${index > 1 ? "s" : ""}`}
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

                    <InputCard name="Technology">
                        <Box
                            component="div"
                            sx={{
                                "& > :not(style)": { mr: 1, width: "61ch" },
                            }}
                        >
                            <Autocomplete
                                multiple
                                options={candidateState.technologies.map(op => op.id)}
                                getOptionLabel={(option) => candidateState.technologies.find(elem => elem.id === option)?.value}
                                filterSelectedOptions
                                value={formik.values.technologies}
                                onBlur={formik.handleBlur}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="technologies"
                                        placeholder="Start typing to filter suggestions"
                                        name="technologies"
                                        id="technologies"
                                        error={
                                            Boolean(formik.touched.technologies &&
                                                formik.errors.technologies)
                                        }
                                        onBlur={formik.handleBlur}
                                        value={formik.values.technologies}
                                        helperText={
                                            formik.touched.technologies &&
                                            formik.errors.technologies
                                        }
                                    />
                                )}
                                onChange={(e, newVal) => handleAutoCompleteChange(e, newVal, "technologies")}
                            />
                        </Box>
                    </InputCard>

                    {formik.values.technologies.length > 0 && (
                        <InputCard name="Roles">
                            <Box
                                component="div"
                                sx={{
                                    "& > :not(style)": { mr: 1, width: "61ch" },
                                }}
                            >
                                <Autocomplete
                                    multiple
                                    options={candidateState.roles.filter(op => (formik.values.technologies.includes(op.technologyId))).map(op => op.id)}
                                    getOptionLabel={(option) => candidateState.roles.find(elem => elem.id === option)?.value}
                                    filterSelectedOptions
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
                    )}


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

                    <h3 className="section-title text-xl font-bold m-4">Other Details</h3>

                    <InputCard name="Current Location">
                        <Box
                            component="div"
                            sx={{
                                "& > :not(style)": { mr: 1, width: "61ch" },
                            }}
                        >
                            <LocationField selectedLocation={formik.values.location} locationChange={handleLocationChange}></LocationField>
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
                            <>
                                <Box
                                    component="div"
                                    sx={{
                                        "& > :not(style)": { mr: 1, width: "20ch" },
                                    }}
                                    key={`ie-${index}`}
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
                                        error={
                                            Boolean(formik.errors.salaryExpectations &&
                                                formik.errors.salaryExpectations[index])
                                        }
                                        helperText={formik.errors.salaryExpectations && 'required'}
                                    />
                                    <TextField
                                        className="input-field"
                                        select
                                        label="Currency"
                                        variant="outlined"
                                        fullWidth
                                        name={`salaryExpectations[${index}].currency`}
                                        value={formik.values.salaryExpectations[index].currency}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={
                                            Boolean(formik.errors.salaryExpectations &&
                                                formik.errors.salaryExpectations[index])
                                        }
                                        helperText={formik.errors.salaryExpectations && 'required'}
                                    >
                                        {candidateState.currencies.map((currencyItem, index) => (
                                            <MenuItem value={currencyItem.id} key={`unit-${index}`}>{currencyItem.value}</MenuItem>
                                        ))}
                                    </TextField>
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
                                        error={
                                            Boolean(formik.errors.salaryExpectations &&
                                                formik.errors.salaryExpectations[index])
                                        }
                                        helperText={formik.errors.salaryExpectations && 'required'}

                                    >
                                        {candidateState.salaryUnits.map((unit, index) => (
                                            <MenuItem value={unit} key={`unit-${index}`}>{unit}</MenuItem>
                                        ))}
                                    </TextField>

                                </Box>
                            </>
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
                        </Box>
                    </InputCard>

                    <h3 className="section-title text-xl font-bold m-4">Resume</h3>

                    <div className="flex flex-col m-12 items-center justify-center space-y-2">
                        <Button variant="outlined" component="label">
                            <FileUploadOutlinedIcon />
                            Update Resume
                            <input
                                hidden
                                accept=".doc,.docx,.pdf,.txt"
                                type="file"
                                onChange={(e) => {
                                    if (!e.target.files) return;
                                    setResumeFile(e.target.files[0]);
                                    setResumeUploadStatus(false);
                                }}
                            />
                        </Button>
                        <div className="file-type-name">DOC, DOCX, PDF, TXT</div>
                        {resumeFile && (
                            <>
                                <div className="upload-file-name">{resumeFile.name}
                                    {(resumeUploadStatus &&
                                        <CloudDoneRoundedIcon color="success" className="upload-icon-success" />
                                    )}</div>
                                <Button variant="contained" component="label" onClick={handleFileUpload} disabled={resumeUploadStatus}>
                                    Upload
                                </Button>
                            </>
                        )}
                    </div>

                    <h3 className="section-title text-xl font-bold m-4">Other Details</h3>

                    <InputCard name="LinkedIn Profile">
                        <Box
                            component="div"
                            sx={{
                                "& > :not(style)": { mr: 1, width: "61ch" },
                            }}
                        >
                            <TextField
                                className="input-field"
                                id="linkedIn"
                                label="profile link url"
                                variant="outlined"
                                fullWidth
                                name="linkedIn"
                                error={
                                    formik.touched.linkedIn &&
                                    Boolean(formik.errors.linkedIn)
                                }
                                helperText={
                                    formik.touched.linkedIn && formik.errors.linkedIn
                                }
                                value={formik.values.linkedIn}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </Box>
                    </InputCard>

                    <InputCard name="Website URL">
                        <Box
                            component="div"
                            sx={{
                                "& > :not(style)": { mr: 1, width: "61ch" },
                            }}
                        >
                            <TextField
                                className="input-field"
                                id="website"
                                label="website url"
                                variant="outlined"
                                fullWidth
                                name="website"
                                error={
                                    formik.touched.website &&
                                    Boolean(formik.errors.website)
                                }
                                helperText={
                                    formik.touched.website && formik.errors.website
                                }
                                value={formik.values.website}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </Box>
                    </InputCard>

                    <InputCard name="Source / Referral">
                        <Box
                            component="div"
                            sx={{
                                "& > :not(style)": { mr: 1, width: "61ch" },
                            }}
                        >
                            <TextField
                                className="input-field"
                                id="source"
                                label="add name or url"
                                variant="outlined"
                                fullWidth
                                name="source"
                                error={
                                    formik.touched.source &&
                                    Boolean(formik.errors.source)
                                }
                                helperText={
                                    formik.touched.source && formik.errors.source
                                }
                                value={formik.values.source}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </Box>
                    </InputCard>

                    <div className="flex flex-col items-center justify-center mb-20">
                        <Button className="w-32 flex items-center justify-center" size="small" type="submit" variant="contained" disabled={isSavingData}>
                            {isSavingData ? (
                                <><CircularProgress color="inherit" className="mr-5 p-2" /> Saving</>
                            ) : 'Save'}
                        </Button>
                        {successAlert && (
                            <div className="text-lg p-2 success-text">Data save successful</div>
                        )}
                    </div>

                </form>
            </div>
        </section>
    );
};

export default EditCandidate;
