import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import FileUpload from "./FileUpload";
import { Button, Select, message } from "antd";
import axios from "axios";

function Home() {
  const [workflowData, setWorkflowData] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (val) => {
    setCurrentId(val);
  };

  const handleRun = () => {
    setIsLoading(true);
    console.log(uploadedFiles[0]);
    const formData = new FormData();
    formData.append("file", uploadedFiles[0]);
    formData.append("id", currentId);

    axios({
      method: "post",
      url: "https://workflow-builder-backend.vercel.app/api/upload",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        console.log(res);
        message.open({
          type: "success",
          content: (
            <p>
              Triggered workflow successfully. Visit{" "}
              <a href="https://workflowcsv.requestcatcher.com/" target="blank">
                https://workflowcsv.requestcatcher.com/
              </a>{" "}
              if sent post request to request catcher and re-run.
            </p>
          ),
        });
      })
      .catch((err) => {
        message.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    axios
      .get("https://workflow-builder-backend.vercel.app/api/workflows")
      .then((res) => {
        console.log(res);
        setWorkflowData(
          res.data.map((item) => {
            return { value: item._id, label: item._id };
          })
        );
      });
  }, []);
  return (
    <div className="wrapper">
      <div className="content-container">
        <div className="body">
          <FileUpload
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
          />
        </div>
      </div>
      <div className="dropdown-wrapper">
        <div> Select Workflow Id</div>
        <Select
          style={{
            width: 120,
          }}
          onChange={handleChange}
          options={workflowData}
        />
      </div>
      <Button
        type="primary"
        disabled={!currentId || uploadedFiles.length === 0}
        onClick={handleRun}
        loading={isLoading}
      >
        Run Workflow
      </Button>
    </div>
  );
}

export default Home;
