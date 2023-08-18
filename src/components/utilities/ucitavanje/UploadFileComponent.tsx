import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface UploadFileComponentProps {
  onFileUpload: (file: File) => void;
}

export const UploadFileComponent: React.FC<UploadFileComponentProps> = ({
  onFileUpload,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    if (selectedFile) {
      onFileUpload(selectedFile);
      setSelectedFile(null);
    }
  };

  return (
    <Box>
      <input
        type="file"
        accept=".pdf,.doc,.docx,.txt"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="fileInput"
      />
      <label htmlFor="fileInput">
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<CloudUploadIcon />}
        >
          Upload File
        </Button>
      </label>
      {selectedFile && (
        <Box mt={2}>
          <Typography variant="body1">
            Selected File: {selectedFile.name}
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleUploadClick}
          >
            Upload
          </Button>
        </Box>
      )}
    </Box>
  );
};
