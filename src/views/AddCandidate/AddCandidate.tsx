import { useState } from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import TabPanel from "./../../components/TabPanel/TabPanel";

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
        <TabPanel value={tabValue} index={0}>
          Persoanl Details
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          Education Details
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          Professional Details
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          Resume upload
        </TabPanel>
        <TabPanel value={tabValue} index={4}>
          Add Skills
        </TabPanel>
        <TabPanel value={tabValue} index={5}>
          Preferences
        </TabPanel>
      </div>
    </>
  );
};

export default AddCandidate;
