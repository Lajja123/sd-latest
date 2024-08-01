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
        title="Add Label"
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
        <input
          type="text"
          value={labels[index] ? labels[index] : ""}
          style={{
            borderRadius: "8px",
            padding: "10px",
            color: "white",
            width: "60%",
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
      </Modal>
    </>
  );
};

export default AddLabel;
