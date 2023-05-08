import "./LeftNav.scss";

import { useState, useEffect } from "react";
import WorkIcon from "@mui/icons-material/Work";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { NavLink, Link, useLocation } from "react-router-dom";

const LeftNav = () => {
  const location = useLocation();
  const [openCandidate, setOpenCandidate] = useState(false);
  const [openJob, setOpenJob] = useState(false);

  useEffect(() => {
    console.log("Location changed!", location.pathname);
    if (location.pathname.includes("candidates")) {
      setOpenCandidate(true);
      setOpenJob(false);
    } else if (location.pathname.includes("jobs")) {
      setOpenJob(true);
      setOpenCandidate(false);
    }
  }, [location]);

  const toggleCandidate = () => {
    setOpenCandidate(!openCandidate);
    setOpenJob(false);
  };

  const toggleJobs = () => {
    setOpenCandidate(false);
    setOpenJob(!openJob);
  };

  return (
    <nav className="menu-body">
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        dense={false}
        component="nav"
        aria-labelledby="left menu items"
      >
        {/* Home */}
        <ListItemButton component={NavLink} to="/">
          <ListItemIcon>
            <HomeRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        {/* Candidate */}
        <ListItemButton onClick={toggleCandidate}>
          <ListItemIcon>
            <PersonRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Candiate" />
          {openCandidate ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openCandidate} timeout="auto" unmountOnExit>
          <List component="div" disablePadding dense={true}>
            <ListItemButton
              sx={{ pl: 4 }}
              component={NavLink}
              to="/candidates/add"
            >
              <ListItemIcon>
                <PersonAddAlt1OutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Add Candidate" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              component={NavLink}
              to="/candidates/list"
            >
              <ListItemIcon>
                <PeopleAltOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Profiles" />
            </ListItemButton>
          </List>
        </Collapse>
        {/* Jobs */}
        <ListItemButton onClick={toggleJobs}>
          <ListItemIcon>
            <WorkRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Jobs" />
          {openJob ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openJob} timeout="auto" unmountOnExit>
          <List component="div" disablePadding dense={true}>
            <ListItemButton sx={{ pl: 4 }} component={NavLink} to="/jobs/add">
              <ListItemIcon>
                <PlaylistAddOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Add Job" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} component={NavLink} to="/jobs/list">
              <ListItemIcon>
                <PlaylistAddCheckOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="All Jobs" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>

      <div className="actions-sc">
        <Button
          className="btn"
          variant="text"
          size="small"
          component={Link}
          to="/candidates/add"
        >
          <PersonAddAltIcon className="btn-icon" /> Add Candidate
        </Button>
        <Button
          className="btn"
          variant="text"
          size="small"
          component={Link}
          to="/jobs/add"
        >
          <WorkIcon className="btn-icon" /> Add Job
        </Button>
      </div>
    </nav>
  );
};

export default LeftNav;
