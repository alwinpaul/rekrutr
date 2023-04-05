import "./LeftNav.scss";
import WorkIcon from "@mui/icons-material/Work";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

const LeftNav = () => {
  return (
    <nav className="menu-body">
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        dense={true}
        component="nav"
        aria-labelledby="left menu items"
      >
        {/* Home */}
        <ListItemButton>
          <ListItemIcon>
            <HomeRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        {/* Candidate */}
        <ListItemButton>
          <ListItemIcon>
            <PersonRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Candiate" />
        </ListItemButton>
        {/* Jobs */}
        <ListItemButton>
          {/* <Link to="/jobs"> */}
          <ListItemIcon>
            <WorkRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Jobs" />
          {/* </Link> */}
        </ListItemButton>
      </List>

      <div className="actions-sc">
        <Button className="btn" variant="text" size="small">
          <PersonAddAltIcon className="btn-icon" /> Add Candidate
        </Button>
        <Button className="btn" variant="text" size="small">
          <WorkIcon className="btn-icon" /> Add Job
        </Button>
      </div>
    </nav>
  );
};

export default LeftNav;
