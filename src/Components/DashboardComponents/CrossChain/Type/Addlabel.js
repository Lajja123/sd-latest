import React, { useState } from "react";
import { Modal, Button } from "antd";
import "antd/dist/reset.css";
import { PlusOutlined } from "@ant-design/icons";
import "../Type/label.css";

const AddLabel = ({ labels, setLabelValues, onAddLabel, index, data }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue === "") {
      setErrorMessage("Enter Label");
    } else {
      setErrorMessage("");
    }

    const regex = /^[a-zA-Z]*$/;

    if (regex.test(inputValue) && inputValue.length <= 10) {
      setLabelValues(index, inputValue);
    }
  };

  const handleSubmit = () => {
    if (labels[index] && labels[index].trim() !== "") {
      onAddLabel(index, data.address);
      setIsModalVisible(false);
    } else {
      setErrorMessage("Enter Label");
    }
  };

  return (
    <>
      <Button
        type="primary"
        shape="circle"
        icon={<PlusOutlined style={{ fill: "black" }} />}
        onClick={() => setIsModalVisible(true)}
      />
      <Modal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={handleSubmit}
            className="submitLable"
          >
            Submit
          </Button>,
        ]}
      >
        <div>
          <strong>Receiver Address:</strong> {data.address.substr(0, 5)}...
          {data.address.substr(-8)}
        </div>
        <div
          style={{
            display: "flex",
            margin: "0 auto",
            alignItems: "center",
            width: "85%",
            justifyContent: "space-evenly",
          }}
        >
          <div style={{ fontSize: "15px" }}>Add Label</div>
          <input
            type="text"
            value={labels[index] ? labels[index] : ""}
            style={{
              borderRadius: "8px",
              padding: "10px",
              color: "white",
              width: "65%",
              border: "1px solid white",
              background: "transparent",
            }}
            onChange={handleInputChange}
          />
          {errorMessage && (
            <p
              style={{
                color: "red",
                margin: "0px",
                fontSize: "13px",
              }}
            >
              {errorMessage}
            </p>
          )}
        </div>
      </Modal>
    </>
  );
};

export default AddLabel;
