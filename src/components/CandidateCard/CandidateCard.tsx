import { useState } from "react";
import { CandidateDetail, StatusObj } from "../../common/interfaces/candidateInterface";
import { RootState, useAppDispatch } from "./../../store/store";
import { useSelector } from "react-redux";
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';

import "./CandidateCard.scss";
import { selectCandidate } from "../../store/reducers/candidateSlice";
import BulletItem from "../BulletItem/BulletItem";
import { Tooltip } from "@mui/material";

interface CandidateCardProps {
    candidate: CandidateDetail;
    isActive: Boolean;
}

export default function CandidateCard(props: CandidateCardProps) {
    let { candidate } = props;

    const [openPhoneCopyToolTip, setPhoneOpenCopyTooltip] = useState(false);
    const [openEmailCopyToolTip, setEmailOpenCopyTooltip] = useState(false);

    const dispatch = useAppDispatch();

    let { roles, industryVerticals } = useSelector(
        (state: RootState) => state.candidates
    );

    const rolesMap = (selectedRoles: number[]) => {
        return roles.filter((elem: StatusObj) => elem.id && selectedRoles.includes(elem.id))
    }

    const industryVerticalsMap = (verticals: string[]) => {
        return industryVerticals.filter((elem: StatusObj) => elem.value && verticals.includes(elem.value))
    }

    const handleCanidateSelect = () => {
        dispatch(selectCandidate(candidate));
    };

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

    return (
        <div className={`candidate-card h-32 shadow-md border white-bg rounded-md m-4 cursor-pointer ${props.isActive ? 'active-card' : ''}`} onClick={handleCanidateSelect}>
            <div className="top h-24 flex items-start justify-center p-2">
                <div className="left w-2/3 border-r h-full">
                    <div className="name text-lg font-bold capitalize baseBlue">{candidate.firstName} {candidate.lastName}</div>
                    <div className="text-color-lite truncate">{candidate.jobTitle}</div>

                    <div className="flex items-center justify-start text-xs">
                        <div className="title w-1/4 font-bold">Location</div>
                        <div className="flex items-center space-x-1 w-3/4">
                            <div className="cdb-con-item-text">{candidate.location.description}</div>
                        </div>
                    </div>

                    <div className="flex items-center justify-start text-xs">
                        <div className="title w-1/4 font-bold">Roles</div>
                        <div className="flex items-center space-x-1 w-3/4">
                            <div className="cdb-con-item-text">
                                {rolesMap(candidate.roles).splice(0, 2).map((elem, index) => (
                                    <BulletItem key={index} bulletColor="#ed4635" bulletDisplay="inline" >{elem.value}</BulletItem>
                                ))}
                                {
                                    rolesMap(candidate.roles).length > 2
                                        ? (<div className="inline-block"> +{rolesMap(candidate.roles).length - 2} </div>)
                                        : ''
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right w-1/3 h-full p-2 space-y-2">
                    <div className="flex flex-col items-start justify-start text-xs w-full">
                        <div className="title font-bold">Total Experience</div>
                        <div className="flex items-center space-y-1">
                            <div className="cdb-con-item-text">
                                {candidate.expYears} years{" "}
                                {candidate.expMonths} months
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-start justify-start text-xs w-full">
                        <div className="title font-bold">Industry Verticals</div>
                        <div className="flex items-center space-y-1">
                            <div className="cdb-con-item-text flex items-center justify-start space-x-2">
                                {industryVerticalsMap(candidate.industryVerticals).splice(0, 1).map((elem, index) => (
                                    <div key={index} >{elem.value}</div>
                                ))}
                                {
                                    industryVerticalsMap(candidate.industryVerticals).length > 1
                                        ? (<div> +{industryVerticalsMap(candidate.industryVerticals).length - 1} </div>)
                                        : ''
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom h-8 border-t p-1 text-xs flex space-x-12">
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
                        <div className="copy-text-field" onClick={() => copyText("phone", candidate?.phone)}>
                            {candidate.phone}
                        </div>
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
        </div>
    )
}

