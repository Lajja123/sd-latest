import React, { useState } from "react";
import { Modal, Button } from "antd";
// import "antd/dist/antd.css"; // Importing Ant Design styles
import { PlusOutlined } from "@ant-design/icons";

const Addlabel = ({ labels, setLabelValues, onAddLabel, index, data }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue === "") {
      setErrorMessage("Enter Label");
    } else {
      setErrorMessage("Press Enter to submit");
    }

    const regex = /^[a-zA-Z]*$/;

    if (regex.test(inputValue) && inputValue.length <= 10) {
      setLabelValues(index, inputValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onAddLabel(index, data.address);
      setIsModalVisible(false); // Close the modal after submission
    }
  };

  return (
    <>
      <Button
        type="primary"
        shape="circle"
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
      />
      <Modal
        title="Add Label"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Cancel
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
            border: "1px solid #8D37FB",
            background: "transparent",
          }}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
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

export default Addlabel;
