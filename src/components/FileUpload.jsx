import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import "../styles/FileUpload.css";

const FileUpload = ({ uploadedFiles, setUploadedFiles }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setUploadedFiles(acceptedFiles);
      // Call your backend API endpoint to upload files
    },
    multiple: false,
  });
  return (
    <div className="dnd" {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag and drop files here or click to browse.</p>
      <div>{uploadedFiles[0]?.name}</div>
    </div>
  );
};
export default FileUpload;
