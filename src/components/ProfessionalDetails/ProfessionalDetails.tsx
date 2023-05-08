import "./ProfessionalDetails.scss";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import CardHeader from "@mui/material/CardHeader";
import ClearIcon from "@mui/icons-material/Clear";

interface ProfessionalDetailsProps {}
// const roles = [
//   {
//     value: "SD",
//     label: "Software Developer",
//   },
//   {
//     value: "FD",
//     label: "Frontend Developer",
//   },
//   {
//     value: "SAP",
//     label: "SAP Professional",
//   },
//   {
//     value: "SF",
//     label: "Salesforce",
//   },
// ];

const tempProfession = [
  {
    id: 1,
    designation: "Frontend developer",
    company: "Coverfox",
    start_date: "Aug 2020",
    end_date: "Dec 2023",
    Description:
      "sadasd dasdasd asdasd asdasd adsdasdas. dasdasd asdasd adsdasdas.",
  },
  {
    id: 2,
    designation: "Frontend developer 2",
    company: "Coverfox",
    start_date: "Aug 2020",
    end_date: "Dec 2023",
    Description:
      "sadasd dasdasd asdasd asdasd adsdasdas. dasdasd asdasd adsdasdas.",
  },
];

const ProfessionalDetails = (props: ProfessionalDetailsProps) => {
  return (
    <div className="personal-tab">
      {/* Name */}
      <Box
        component="div"
        sx={{
          "& > :not(style)": { mr: 1, width: "61ch" },
        }}
      >
        <div className="edu-box">
          <TextField
            className="input-field"
            id="designation"
            label="Designation"
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            className="input-field"
            id="company"
            label="Company Name"
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            className="input-field"
            id="start_date"
            label="Start Date"
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            className="input-field"
            id="end_date"
            label="End Date"
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            className="input-field"
            id="description"
            label="Description"
            variant="outlined"
            margin="dense"
            multiline
            rows="4"
            fullWidth
          />
          <Stack spacing={2} direction="row" justifyContent="flex-end">
            <Button size="medium" variant="text">
              Reset
            </Button>
            <Button size="medium" variant="contained">
              Save
            </Button>
          </Stack>
        </div>
      </Box>

      <div className="exp-view-box">
        {tempProfession.map((exp) => (
          <Card variant="outlined" sx={{ width: 700, m: 1 }}>
            <IconButton
              aria-label="Delete work experience"
              className="del-icon"
            >
              <ClearIcon />
            </IconButton>
            <CardContent>
              <div className="exp-item">
                <div className="designation_name">{exp.designation}</div>
                <div className="company">{exp.company}</div>
                <div className="exp-date">
                  {exp.start_date} - {exp.end_date}
                </div>
                <div className="wrk-desc">{exp.Description}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProfessionalDetails;
