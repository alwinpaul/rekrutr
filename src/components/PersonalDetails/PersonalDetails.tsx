import InputCard from "./../InputCard/InputCard";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

interface PersonalDetailsProps {}

const roles = [
  {
    value: "SD",
    label: "Software Developer",
  },
  {
    value: "FD",
    label: "Frontend Developer",
  },
  {
    value: "SAP",
    label: "SAP Professional",
  },
  {
    value: "SF",
    label: "Salesforce",
  },
];

const PersonalDetails = (props: PersonalDetailsProps) => {
  return (
    <div className="personal-tab">
      {/* Name */}
      <InputCard name="Name" cardDescription="Enter first and last name">
        <Box
          component="div"
          sx={{
            "& > :not(style)": { mr: 1, width: "30ch" },
          }}
        >
          <TextField
            className="input-field"
            id="first_name"
            label="First name"
            variant="outlined"
          />
          <TextField
            className="input-field"
            id="last_name"
            label="Last name"
            variant="outlined"
          />
        </Box>
      </InputCard>

      {/* contact information */}
      <InputCard name="Contact information">
        <Box
          component="div"
          sx={{
            "& > :not(style)": { mr: 1, width: "61ch" },
          }}
        >
          <TextField
            className="input-field"
            id="email"
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <TextField
            className="input-field"
            id="contact"
            label="Contact number"
            variant="outlined"
            fullWidth
          />
        </Box>
      </InputCard>

      {/* Role */}
      <InputCard name="Role" cardDescription="Enter candidates primary role">
        <Box
          component="div"
          sx={{
            "& > :not(style)": { mr: 1, width: "61ch" },
          }}
        >
          <TextField
            className="input-field"
            id="role"
            select
            label="Primary Role"
            variant="outlined"
            fullWidth
          >
            {roles.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </InputCard>

      {/* Location */}
      <InputCard name="Location">
        <Box
          component="div"
          sx={{
            "& > :not(style)": { mr: 1, width: "61ch" },
          }}
        >
          <TextField
            className="input-field"
            id="location"
            label="Current location"
            variant="outlined"
            fullWidth
          />
        </Box>
      </InputCard>

      {/* Summary */}
      <InputCard name="Summary">
        <Box
          component="div"
          sx={{
            "& > :not(style)": { mr: 1, width: "61ch" },
          }}
        >
          <TextField
            className="input-field"
            id="summary"
            label="Professional Summary"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
          />
        </Box>
      </InputCard>

      <Stack spacing={2} direction="row" justifyContent="flex-end">
        <Button size="large" variant="text">
          Reset
        </Button>
        <Button size="large" variant="contained">
          Save
        </Button>
      </Stack>
    </div>
  );
};

export default PersonalDetails;
