import "./EducationDetails.scss";

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
interface EducationDetailsProps {}

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

const tempEdu = [
  {
    id: 1,
    college: "Centennial College",
    degree: "Master of Business Administration",
    graduation_date: "2020",
    specialization: "Human resource",
  },
  {
    id: 2,
    college: "Humber College",
    degree: "Bachelor of Business Administration",
    graduation_date: "2017",
    specialization: "Human resource",
  },
];

const EducationDetails = (props: EducationDetailsProps) => {
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
            id="college"
            label="College / University"
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            className="input-field"
            id="graduation_year"
            label="Graduation year"
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            className="input-field"
            id="degree"
            label="Degree / Major"
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            className="input-field"
            id="specialization"
            label="Specialization"
            variant="outlined"
            margin="dense"
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

      <div className="edu-view-box">
        {tempEdu.map((edu) => (
          <Card variant="outlined" sx={{ width: 700, m: 1 }}>
            <IconButton
              aria-label="Delete education detail"
              className="del-icon"
            >
              <ClearIcon />
            </IconButton>
            <CardContent>
              <div className="edu-item">
                <div className="deg_name">
                  {edu.degree} - ({edu.specialization})
                </div>
                <div className="clg_name">{edu.college}</div>
                <div className="grad_yr">{edu.graduation_date}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EducationDetails;
