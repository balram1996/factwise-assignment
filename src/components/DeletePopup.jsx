import React, { useState, useEffect } from "react";
import "./style.css";
import { Box, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useSelector } from "react-redux";
import { deleteCelebs } from "../store/reducers/deleteCelebs";
import axios from "axios";
import zIndex from "@mui/material/styles/zIndex";

const DeletePopup = ({ sendDataToParent, deleteKeyy, IssetExpend }) => {
  const [visible, setVisible] = useState("block");
  const myData = useSelector((state) => state.celebs.celebsProfile);
  const dispatch = useAppDispatch();
  const handleCancle = () => {
    setVisible("none");
    sendDataToParent(false);
  };
  const handleDelete = () => {
    console.log(myData, "ahivaaaa");
    deleteCelebrityById(deleteKeyy);
    dispatch(deleteCelebs(deleteKeyy));
    setVisible("none");
    sendDataToParent(false);
    IssetExpend(null);
  };

  //find by id and delete
  const deleteCelebrityById = (id) => {
    axios
      .delete(`http://localhost:8000/celebrities/${id}`)
      .then((response) => {
        const updatedData = myData.filter((celebrity) => celebrity.id !== id);
        //   setMapData(updatedData);
        //   setCompareData(updatedData);
        //   dispatch(apicall(updatedData));
      })
      .catch((error) => {
        console.log(`Error deleting celebrity with ID ${id}`, error);
      });
  };

  return (
    <>
      <Box
        style={{
          width: "80%",
          height: "100px",
          border: "1.5px solid rgb(199, 197, 197)",
          margin: "auto",
          padding: "10px",
          borderRadius: "10px",
          display: visible,
          marginTop: "-250px",
          zIndex: 999,
        }}
      >
        <p style={{ color: "rgb(56, 56, 56)" }}>
          Are you sure you want to delete?
        </p>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "200px",
            margin: "auto",
            marginRight: "0",
          }}
        >
          <button className="dialoge-btns" onClick={handleCancle}>
            Cancle
          </button>
          <button className="dialoge-btns" onClick={handleDelete}>
            Delete
          </button>
        </Box>
      </Box>
    </>
  );
};

export default DeletePopup;
