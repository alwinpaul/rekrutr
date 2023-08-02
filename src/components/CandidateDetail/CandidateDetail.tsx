import { useSelector } from "react-redux";
import { CandidateDetail, StatusObj, CurrencyObj } from "./../../common/interfaces/candidateInterface";
import { RootState } from "./../../store/store";

import CallRoundedIcon from '@mui/icons-material/CallRounded';
import PersonPinCircleRoundedIcon from '@mui/icons-material/PersonPinCircleRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';

import "./CandidateDetail.scss";
import { useState } from "react";
import BulletItem from "../BulletItem/BulletItem";

interface CandidateDetailProps {
	candidate: CandidateDetail | null;
	editCandidate: Function
}

const CandidateDetailComponent = (props: CandidateDetailProps) => {
	let candidate = props.candidate;
	const [expandCandidateStatus, setExpandCandidateStatus] = useState(false);
	const [commentValue, setCommentValue] = useState("");
	const [openPhoneCopyToolTip, setPhoneOpenCopyTooltip] = useState(false);
	const [openEmailCopyToolTip, setEmailOpenCopyTooltip] = useState(false);

	let { candidates, visaStatus, employmentTypes, roles, skills, salaryUnits, industryVerticals, technologies, currencies } = useSelector(
		(state: RootState) => state.candidates
	);
	const visaStatusMap = (id: number) => {
		return visaStatus.filter((elem: StatusObj) => elem.id === id)[0]
	}

	const employmentTypeMap = (ids: number[]) => {
		return employmentTypes.filter((elem: StatusObj) => elem.id && ids.includes(elem.id))
	}

	const industryVerticalsMap = (verticals: string[]) => {
		return industryVerticals.filter((elem: StatusObj) => elem.value && verticals.includes(elem.value))
	}

	const rolesMap = (items: number[]) => {
		return roles.filter((elem: StatusObj) => elem.id && items.includes(elem.id))
	}

	const technologiesMap = (items: number[]) => {
		return technologies.filter((elem: StatusObj) => elem.id && items.includes(elem.id))
	}

	const skillsMap = (items: string[]) => {
		return skills.filter((elem: StatusObj) => elem.value && items.includes(elem.value))
	}


	const toggleCandidateStatus = () => {
		setExpandCandidateStatus(!expandCandidateStatus)
	}

	const copyText = (field: string, text: any) => {
		navigator.clipboard.writeText(text)
		let actionFn = (action: boolean) => { };
		if (field === "phone") {
			actionFn = setPhoneOpenCopyTooltip;
		} else if (field === "email") {
			actionFn = setEmailOpenCopyTooltip;
		}
		actionFn(true);
		setTimeout(() => {
			actionFn(false);
		}, 1000);
	}

	const editCandidate = () => {
		props.editCandidate(candidate)
	}

	const getCurrencyValue = (id: number | undefined) => {
		if (!id) return ""
		return currencies.filter((curr: CurrencyObj) => curr.id === id)[0].value
	}


	return (
		<div className={`candidate-detail-container h-full`}>
			{!candidate ? (
				<div className="flex items-center justify-center text-xl h-full text-v-lite m-auto">
					Select a candidate to view details.
				</div>
			) : (
				<>
					<section className="flex p-4 justify-end space-x-1">
						<a className="cdb-download-btn flex items-center border rounded-lg text-xs space-x-2 p-1" href={candidate.resumeUrl} target="_blank" download>
							<CloudDownloadRoundedIcon fontSize="small" /> <div className="cdb-download-btn-text">Download Resume</div>
						</a>
						<div className="cdb-download-btn flex items-center border rounded-lg text-xs space-x-1 p-1 cursor-pointer" onClick={editCandidate}>
							<EditIcon fontSize="small" /> <div className="cdb-download-btn-text">Edit</div>
						</div>
					</section>

					<section className="p-5 flex items-center justify-center border-t w-full">
						<div className="w-2/3">
							<div className="text-xl font-bold capitalize tecnitaBlue">{candidate.firstName}{' '}{candidate.lastName}</div>
							<div className="text-base text-color-lite">{candidate.jobTitle}</div>
						</div>
						<div className="w-1/3 text-sm space-y-2">
							<div className="flex items-center space-x-2 cursor-pointer">
								<CallRoundedIcon fontSize="small" />
								<Tooltip
									PopperProps={{
										disablePortal: true,
									}}
									open={openPhoneCopyToolTip}
									disableFocusListener
									disableHoverListener
									disableTouchListener
									title="Phone Number copied"
								>
									<a href={`tel:+1${candidate.phone}`} className="copy-text-field" onClick={() => copyText("phone", candidate?.phone)}>
										{candidate.phone}
									</a>
								</Tooltip>
							</div>
							<div className="flex items-center space-x-2 cursor-pointer">
								<EmailRoundedIcon fontSize="small" />
								<Tooltip
									PopperProps={{
										disablePortal: true,
									}}
									open={openEmailCopyToolTip}
									disableFocusListener
									disableHoverListener
									disableTouchListener
									title="Email copied"
								>
									<div className="copy-text-field" onClick={() => copyText("email", candidate?.email)}>
										{candidate.email}
									</div>
								</Tooltip>
							</div>
						</div>
					</section>

					{/* Section for status */}
					<section>

					</section>

					{/*  */}
					<section className="p-5 space-y-4 border-t w-full text-sm">
						<div className="flex items-center justify-start">
							<div className="title w-1/3 font-bold">Location</div>
							<div className="flex items-center space-x-2 w-2/3">
								<PersonPinCircleRoundedIcon fontSize="small" />
								<div className="cdb-con-item-text">{candidate.location.description}</div>
							</div>
						</div>

						<div className="flex items-center justify-start">
							<div className="title w-1/3 font-bold">Total Experience</div>
							<div className="flex items-center space-x-2 w-2/3">
								<div className="cdb-con-item-text">
									{candidate.expYears} years{" "}
									{candidate.expMonths} months
								</div>
							</div>
						</div>

						<div className="flex items-center justify-start">
							<div className="title w-1/3 font-bold">Notice Period</div>
							<div className="flex items-center space-x-2 w-2/3">
								<div className="cdb-con-item-text">
									{candidate.noticePeriod} days
								</div>
							</div>
						</div>

						<div className="flex items-center justify-start">
							<div className="title w-1/3 font-bold">Employment Type</div>
							<div className="flex items-center space-x-2 w-2/3">
								<div className="cdb-con-item-text">
									{employmentTypeMap(candidate.employmentTypes).map((elem, index) => (
										<BulletItem key={index} bulletColor="#49a99e" bulletDisplay="inline" >{elem.value}</BulletItem>
									))}
								</div>
							</div>
						</div>

						<div className="flex items-center justify-start">
							<div className="title w-1/3 font-bold">Visa Status</div>
							<div className="flex items-center space-x-2 w-2/3">
								<div className="cdb-con-item-text">
									<BulletItem bulletColor="#49a99e" bulletDisplay="inline" >
										{visaStatusMap(candidate.visaStatus).value}
									</BulletItem>
								</div>
							</div>
						</div>

						<div className="flex items-center justify-start">
							<div className="title w-1/3 font-bold">Salary Expectations</div>
							<div className="flex items-center space-x-2 w-2/3">
								<div className="cdb-con-item-text flex space-x-4">
									{candidate.salaryExpectations.map((sal, index) => (
										<div key={`sal-${index}`} className="" >{sal.value} {getCurrencyValue(sal.currency)} {sal.unit}</div>
									))}
								</div>
							</div>
						</div>

						<div className="flex items-center justify-start">
							<div className="title w-1/3 font-bold">Industry Verticals</div>
							<div className="flex items-center space-x-2 w-2/3">
								<div className="cdb-con-item-text">
									{industryVerticalsMap(candidate.industryVerticals).map((elem, index) => (
										<BulletItem key={index} bulletColor="#fbd233" bulletDisplay="inline" >{elem.value}</BulletItem>
									))}
								</div>
							</div>
						</div>

						<div className="flex items-center justify-start">
							<div className="title w-1/3 font-bold">Technologies</div>
							<div className="flex items-center space-x-2 w-2/3">
								<div className="cdb-con-item-text">
									{technologiesMap(candidate.technologies).map((elem, index) => (
										<BulletItem key={index} bulletColor="#fbd233" bulletDisplay="inline" >{elem.value}</BulletItem>
									))}
								</div>
							</div>
						</div>

						<div className="flex items-center justify-start">
							<div className="title w-1/3 font-bold">Roles</div>
							<div className="flex items-center space-x-2 w-2/3">
								<div className="cdb-con-item-text">
									{rolesMap(candidate.roles).map((elem, index) => (
										<BulletItem key={index} bulletColor="#fbd233" bulletDisplay="inline" >{elem.value}</BulletItem>
									))}
								</div>
							</div>
						</div>

						<div className="flex items-center justify-start">
							<div className="title w-1/3 font-bold">Skills</div>
							<div className="flex items-center space-x-2 w-2/3">
								<div className="cdb-con-item-text">
									{skillsMap(candidate.skills).map((elem, index) => (
										<BulletItem key={index} bulletColor="#49a99e" bulletDisplay="inline" >{elem.value}</BulletItem>
									))}
								</div>
							</div>
						</div>

						<div className="flex items-start justify-start">
							<div className="title w-1/3 font-bold">Expertise</div>
							<div className="flex items-center space-x-2 w-2/3">
								<div className="text-area-bg p-1 rounded-sm">
									{candidate.expertise}
								</div>
							</div>
						</div>

						<div className="flex items-start justify-start">
							<div className="title w-1/3 font-bold">Summary</div>
							<div className="flex items-center space-x-2 w-2/3">
								<div className="text-area-bg p-1 rounded-sm">
									{candidate.summary}
								</div>
							</div>
						</div>

						{candidate.linkedIn &&
							<div className="flex items-center justify-start">
								<div className="title w-1/3 font-bold">LinkedIN Url</div>
								<div className="flex items-center space-x-2 w-2/3">
									<a href={candidate.linkedIn} target="_blank" className="cdb-con-item-text">
										{candidate.linkedIn}
									</a>
								</div>
							</div>
						}

						{candidate.website &&
							<div className="flex items-center justify-start">
								<div className="title w-1/3 font-bold">Website</div>
								<div className="flex items-center space-x-2 w-2/3">
									<a href={candidate.website} target="_blank" className="cdb-con-item-text">
										{candidate.website}
									</a>
								</div>
							</div>
						}

						{candidate.source &&
							<div className="flex items-center justify-start">
								<div className="title w-1/3 font-bold">Referral / Source</div>
								<div className="flex items-center space-x-2 w-2/3">
									<div className="cdb-con-item-text">
										{candidate.source}
									</div>
								</div>
							</div>
						}
					</section>
				</>
			)}
		</div>
	);
};

export default CandidateDetailComponent;
