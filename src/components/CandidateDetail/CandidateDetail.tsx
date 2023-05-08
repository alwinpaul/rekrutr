import { useSelector } from "react-redux";
import { CandidateDetail, StatusObj } from "./../../common/interfaces/candidateInterface";
import { RootState } from "./../../store/store";

import CallRoundedIcon from '@mui/icons-material/CallRounded';
import PersonPinCircleRoundedIcon from '@mui/icons-material/PersonPinCircleRounded';
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded';

import "./CandidateDetail.scss";
import { useState } from "react";

interface CandidateDetailProps {
	candidate: CandidateDetail | null;
}

const CandidateDetailComponent = (props: CandidateDetailProps) => {
	let candidate = props.candidate;
	const [expandCandidateStatus, setExpandCandidateStatus] = useState(false);

	let { candidates, visaStatus, employmentTypes, roles, skills, salaryUnits, industryVerticals } = useSelector(
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

	const rolesMap = (items: string[]) => {
		return roles.filter((elem: StatusObj) => elem.value && items.includes(elem.value))
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

	return (
		<div className="candidate-detail-container">
			{candidate && (
				<>
					<div className="cdb-download-sec">
						<a className="cdb-download-btn" href={candidate.resumeUrl} target="_blank" download>
							<div className="cdb-download-btn-text">Download Resume</div> <CloudDownloadRoundedIcon fontSize="small" />
						</a>
					</div>
					<div className="cd-basic-box">
						<div className="cdb-name-box">
							<div className="cdb-name">{candidate.firstName} {candidate.lastName}</div>
							<div className="cdb-job-title">{candidate.jobTitle}</div>
							<div className="cdb-exp"><div className="cbd-sec-title">Total Experience :</div>
								<div className="cdb-t-exp">
									{candidate.expYears} years{" "}
									{candidate.expMonths} months
								</div></div>
							<div className="cdb-visa-status"><div className="cbd-sec-title">Visa Status :</div> <div className="cdb-visa-sts-chip">{visaStatusMap(candidate.visaStatus).value}</div></div>
							<div className="cdb-visa-status"><div className="cbd-sec-title">Notice Period :</div> <div className="cdb-visa-sts-chip">{candidate.noticePeriod} days</div></div>
							<div className="cdb-visa-status">
								<div className="cbd-sec-title">Salary Expectations :</div> {
									candidate.salaryExpectations.map((sal, index) =>
										(<div className="cdb-visa-sts-chip" key={`sal-${index}`}>{sal.value} {sal.unit}</div>))}
							</div>
						</div>
						<div className="cdb-contact-box">
							<div className="cbd-con-itm cdb-phone"><CallRoundedIcon /><div className="cdb-con-item-text">{candidate.phone}</div></div>
							<div className="cbd-con-itm cdb-email"><AlternateEmailRoundedIcon /><div className="cdb-con-item-text">{candidate.email}</div></div>
							<div className="cbd-con-itm cdb-location"><PersonPinCircleRoundedIcon /><div className="cdb-con-item-text">{candidate.location}</div></div>
						</div>
					</div>

					{laststatus(candidate.candidateStatus) && (
						<div className="cdb-status-box-sec">
							<div className="cbd-sec-title">Candidate Status :</div>
							{getStatusView(candidate)}
						</div>
					)}

					<div className="cdb-skills-box">
						<div className="cdb-sk-status cdb-sec-box"><div className="cbd-sec-title">Employment Type :</div> {employmentTypeMap(candidate.employmentTypes).map((elem, index) => (<div key={index} className=" cdb-chip cdb-emp-sts-chip">{elem.value}</div>))}</div>
						<div className="cdb-sk-status cdb-sec-box"><div className="cbd-sec-title">Industry Verticals :</div> {industryVerticalsMap(candidate.industryVerticals).map((elem, index) => (<div key={index} className=" cdb-chip cdb-sks-sts-chip">{elem.value}</div>))}</div>
						<div className="cdb-sk-status cdb-sec-box"><div className="cbd-sec-title">Roles :</div> {rolesMap(candidate.roles).map((elem, index) => (<div key={index} className=" cdb-chip cdb-sks-sts-chip">{elem.value}</div>))}</div>
						<div className="cdb-sk-status cdb-sec-box"><div className="cbd-sec-title">Skills :</div> {skillsMap(candidate.skills).map((elem, index) => (<div key={index} className=" cdb-chip cdb-sks-sts-chip">{elem.value}</div>))}</div>
					</div>

					<div className="cdb-summary-sec">
						<div className="cdb-sum-box cdb-sec-box">
							<div className="cbd-sec-title">Expertise</div>
							<div className="sdb-sec-text">{candidate.expertise}</div>
						</div>
						<div className="cdb-sum-box cdb-sec-box">
							<div className="cbd-sec-title">Job Summary</div>
							<div className="sdb-sec-text">{candidate.summary}</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default CandidateDetailComponent;
