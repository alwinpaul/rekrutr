import { useState, useEffect } from "react";
import { CandidateDetail, StatusObj } from "../../common/interfaces/candidateInterface";
import Button from "@mui/material/Button";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { RootState, useAppDispatch } from "./../../store/store";
import { useSelector } from "react-redux";

import "./CandidateCard.scss";
import { selectCandidate } from "../../store/reducers/candidateSlice";

interface CandidateCardProps {
    candidate: CandidateDetail
}

export default function CandidateCard(props: CandidateCardProps) {
    let { candidate } = props;

    const dispatch = useAppDispatch();

    let { employmentTypes, roles, technologies } = useSelector(
        (state: RootState) => state.candidates
    );

    const employmentTypeMap = (ids: number[]) => {
        return employmentTypes.filter((elem: StatusObj) => elem.id && ids.includes(elem.id))
    }

    const roleseMap = (selectedRoles: number[]) => {
        return roles.filter((elem: StatusObj) => elem.id && selectedRoles.includes(elem.id))
    }

    const technologyMap = (selectedTechnologies: number[]) => {
        return technologies.filter((elem: StatusObj) => elem.id && selectedTechnologies.includes(elem.id))
    }

    const handleCanidateSelect = (candidate: CandidateDetail) => {
        // setSelectedCandidate(candidate);
        dispatch(selectCandidate(candidate));
    };

    return (
        <div className="candidate-box">
            <div className="cb-top">
                <div className="cb-t-name-box">
                    <div className="cb-t-name">
                        {candidate.firstName} {candidate.lastName}
                    </div>
                    <div className="cb-t-designation">{candidate.jobTitle}
                        <div className="cb-t-exp cb-t-small">
                            ({candidate.expYears}y{" "}
                            {candidate.expMonths}m)
                        </div>
                    </div>
                    <div className="cb-t-small cb-t-location">
                        {candidate.location.description}
                    </div>
                </div>
                <div className="cb-t-job-box">
                    <div className="cb-t-small cb-t-sec">
                        {/* <div className="cb-t-title">Industry Verticals:</div>
                        {employmentTypeMap(candidate.employmentTypes).map((et: any, index: number) => (
                            <div className="cb-iv_chip" key={`et${index}`}>{et.value}</div>
                        ))} */}
                    </div>
                    <div className="cb-t-small cb-t-sec">

                        {employmentTypeMap(candidate.employmentTypes).map((et: any, index: number) => (
                            <div className="cb-emp_chip" key={`et${index}`}>{et.value}</div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="cb-bottom">
                <div className="cb-b-technology">
                    <div className="cb-b-tec-val">Technologies:
                        {technologyMap(candidate.technologies).map((et: any, index: number) => index < 2 && (
                            <div className="cb-role_chip" key={`et${index}`}>{et.value}</div>
                        ))}
                        {(technologyMap(candidate.technologies).length > 2) && (` +${technologyMap(candidate.technologies).length - 2}`)}
                    </div>
                </div>
                <div className="cb-b-action">
                    <Button
                        variant="text"
                        endIcon={<KeyboardArrowRightOutlinedIcon />}
                        size="small"
                        onClick={() => handleCanidateSelect(candidate)}
                    >
                        Expand
                    </Button>
                </div>
            </div>
        </div>
    )
}

