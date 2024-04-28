import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import axios from "axios";

const SideBar = ({ nodes, edges }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  const [workflowId, setWorkflowId] = useState("");
  function randomStr(len, arr) {
    let ans = "";
    for (let i = len; i > 0; i--) {
      ans += arr[Math.floor(Math.random() * arr.length)];
    }
    console.log(ans);
    setWorkflowId(ans);
  }

  const handleSave = () => {
    const modifiedNodes = nodes.reduce((acc, node) => {
      return { ...acc, [node.id]: node.type };
    }, {});
    const steps = [];
    for (let i = 1; i < edges.length; i++) {
      steps.push({ name: modifiedNodes[edges[i].source] });
    }
    const payload = {
      _id: workflowId,
      steps: steps,
    };
    axios
      .post("https://workflow-builder-backend.vercel.app/api/workflows", payload)
      .then((res) => {
        console.log(res);
        message.success("Workflow successfully created");
        randomStr(9, "12345ab");
      }).catch((err) => {
        message.error(err);
      });
  };

  useEffect(() => {
    randomStr(9, "12345ab");
  }, []);

  return (
    <aside>
      <div style={{ marginBottom: "4px" }}>Workflow Id : {workflowId}</div>
      <div className="description">
        <Button type="primary" style={{ width: "100%" }} onClick={handleSave}>
          Save
        </Button>
      </div>

      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "Filter Data")}
        draggable
      >
        Filter Data
      </div>

      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "Wait")}
        draggable
      >
        Wait
      </div>

      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "Convert Format")}
        draggable
      >
        Convert Format
      </div>

      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "Send POST Request")}
        draggable
      >
        Send POST Request
      </div>
    </aside>
  );
};

export default SideBar;
