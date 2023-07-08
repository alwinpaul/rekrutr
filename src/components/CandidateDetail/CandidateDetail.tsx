import { useSelector } from "react-redux";
import { CandidateDetail, StatusObj } from "./../../common/interfaces/candidateInterface";
import { RootState } from "./../../store/store";

import CallRoundedIcon from '@mui/icons-material/CallRounded';
import PersonPinCircleRoundedIcon from '@mui/icons-material/PersonPinCircleRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import "./CandidateDetail.scss";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import BulletItem from "../BulletItem/BulletItem";

interface CandidateDetailProps {
	candidate: CandidateDetail | null;
}

const CandidateDetailComponent = (props: CandidateDetailProps) => {
	let candidate = props.candidate;
	const [expandCandidateStatus, setExpandCandidateStatus] = useState(false);
	const [commentValue, setCommentValue] = useState("");
	const [openPhoneCopyToolTip, setPhoneOpenCopyTooltip] = useState(false);
	const [openEmailCopyToolTip, setEmailOpenCopyTooltip] = useState(false);

	let { candidates, visaStatus, employmentTypes, roles, skills, salaryUnits, industryVerticals, technologies } = useSelector(
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

	const laststatus = (statuses: string[] | undefined) => {
		if (!statuses) {
			return [];
		} else if (expandCandidateStatus) {
			return statuses;
		} else {
			return [statuses[0]]
		}
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

	const getStatusView = (candidate: CandidateDetail) => {
		return (
			<>
				<div className="cdb-status-box">
					{laststatus(candidate.candidateStatus).map((status, index) => (
						<div className="cdb-status-item" key={`cdb-status-${index}`}>
							<CampaignRoundedIcon />
							<div className="cdb-status-val">{status}</div>
						</div>
					))}
				</div>
				<div className="cbd-sts-toggle" onClick={toggleCandidateStatus}>
					{!expandCandidateStatus && <KeyboardArrowDownRoundedIcon />}
					{expandCandidateStatus && <KeyboardArrowUpRoundedIcon />}
				</div>
			</>
		)
	}

	const handleAddComment = (candidateId: any) => {
		console.log(commentValue)
	}

	return (
		<div className={`candidate-detail-container h-full`}>
			{!candidate ? (
				<div className="flex items-center justify-center text-xl h-full text-v-lite m-auto">
					Select a candidate to view details.
				</div>
			) : (
				<>
					<section className="flex p-4 justify-end">
						<a className="cdb-download-btn flex items-center border rounded-lg text-xs space-x-2 p-1" href={candidate.resumeUrl} target="_blank" download>
							<div className="cdb-download-btn-text">Download Resume</div> <CloudDownloadRoundedIcon fontSize="small" />
						</a>
					</section>

					<section className="p-5 flex items-center justify-center border-t w-full">
						<div className="w-3/4">
							<div className="text-xl font-bold capitalize tecnitaBlue">{candidate.firstName} {candidate.lastName}</div>
							<div className="text-base text-color-lite">{candidate.jobTitle}</div>
						</div>
						<div className="w-1/4 text-sm space-y-2">
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
										<div key={`sal-${index}`} className="" >{sal.value} {sal.unit}</div>
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

					</section>
				</>
			)}
		</div>
	);
};

export default CandidateDetailComponent;
