import React, { useState } from "react";
import { Modal, Button } from "antd";
import "antd/dist/reset.css";
import { PlusOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../Type/label.css";
import {
  faArrowDown,
  faArrowUp,
  faCopy,
  faMagnifyingGlass,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const AddLabel = ({ labels, setLabelValues, onAddLabel, index, data }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isCopied, setIsCopied] = useState(false);


  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000); // Reset the copy status after 2 seconds
        toast.success("Token Address Copied Successfully!");
      },
      (err) => {
        console.error("Unable to copy to clipboard:", err);
      }
    );
  };

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
        title="Enter Label"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={handleSubmit}
            className="submitLable"
          >
            Save
          </Button>,
        ]}
      >
        <div
          style={{
            display: "flex",
            margin: "20px auto",
            alignItems: "center",
            width: "85%",
            gap: "19px",
            color: "white",
          }}
        >
          <strong style={{fontSize:"15px"}}>Receiver Address:</strong>
          <div
            style={{
              color: "white",
              fontSize: "15px",
              fontWeight: "500",
            }}
          >
            {data.address.substr(0, 15)}...
            {data.address.substr(-15)}
            <FontAwesomeIcon
                                className="copyicon"
                                onClick={() => copyToClipboard(data.address)}
                                icon={faCopy}
                              />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            margin: "0 auto",
            alignItems: "center",
            width: "85%",
            justifyContent: "space-between",
            color: "white",
          }}
        >
          <strong style={{fontSize:"15px"}}>Add Label: </strong>{" "}
          <input
            type="text"
            value={labels[index] ? labels[index] : ""}
            style={{
              borderRadius: "8px",
              padding: "10px",
              color: "white",
              width: "67%",
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
