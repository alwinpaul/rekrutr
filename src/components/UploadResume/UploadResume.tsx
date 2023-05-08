import "./UploadResume.scss";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import CardHeader from "@mui/material/CardHeader";
import ClearIcon from "@mui/icons-material/Clear";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

import { useState } from "react";

interface UploadResumeProps {}

const UploadResume = (props: UploadResumeProps) => {
  const [fileName, setFileName] = useState("");

  return (
    <div className="personal-tab">
      <Box
        component="div"
        sx={{
          "& > :not(style)": { mr: 1, width: "61ch" },
        }}
      >
        <div className="resume-box">
          <Stack direction="column" alignItems="flex-start" spacing={2}>
            <Button variant="contained" component="label">
              <FileUploadOutlinedIcon />
              Upload Resume
              <input
                hidden
                accept=".doc,.docx,.pdf,.txt"
                type="file"
                onChange={(e) => {
                  if (!e.target.files) return;
                  setFileName(e.target.files[0].name);
                }}
              />
            </Button>
            <div className="file-type-name">DOC, DOCX, PDF, TXT</div>
            <div className="upload-file-name">{fileName}</div>
          </Stack>
          <Stack spacing={2} direction="row" justifyContent="flex-end">
            <Button size="medium" variant="contained">
              Save
            </Button>
          </Stack>
        </div>
      </Box>
    </div>
  );
};

export default UploadResume;
