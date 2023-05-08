import { useState } from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import TabPanel from "./../../components/TabPanel/TabPanel";
import PersonalDetails from "./../../components/PersonalDetails/PersonalDetails";
import EducationDetails from "./../../components/EducationDetails/EducationDetails";
import ProfessionalDetails from "./../../components/ProfessionalDetails/ProfessionalDetails";
import UploadResume from "./../../components/UploadResume/UploadResume";

import { CANDIDATE_TABS } from "./../../common/constants";
import "./AddCandidate.scss";

const AddCandidate = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <>
      <div className="tab-top">
        <h2>Add New Profile</h2>
        <div>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="basic tabs example"
            >
              <Tab label="Personal" />
              <Tab label="Education" />
              <Tab label="Professional" />
              <Tab label="Resume" />
              <Tab label="Skills" />
              <Tab label="Preferences" />
            </Tabs>
          </Box>
        </div>
      </div>
      <div className="tab-body">
        <TabPanel value={tabValue} index={0} {...CANDIDATE_TABS.personal}>
          <PersonalDetails />
        </TabPanel>
        <TabPanel value={tabValue} index={1} {...CANDIDATE_TABS.education}>
          <EducationDetails />
        </TabPanel>
        <TabPanel value={tabValue} index={2} {...CANDIDATE_TABS.professional}>
          <ProfessionalDetails />
        </TabPanel>
        <TabPanel value={tabValue} index={3} {...CANDIDATE_TABS.resume}>
          <UploadResume />
        </TabPanel>
        <TabPanel value={tabValue} index={4} {...CANDIDATE_TABS.skills}>
          Add Skills
        </TabPanel>
        <TabPanel value={tabValue} index={5} {...CANDIDATE_TABS.preferences}>
          Preferences
        </TabPanel>
      </div>
    </>
  );
};

export default AddCandidate;
