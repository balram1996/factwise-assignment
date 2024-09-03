import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useSelector } from "react-redux";
import { deleteCelebs } from "../store/reducers/deleteCelebs";
import axios from "axios";

const DeletePopup = ({ sendDataToParent, deleteKeyy, IssetExpend }) => {
  const deleteButtonRef = useRef(null);

  useEffect(() => {
    if (deleteButtonRef.current) {
      deleteButtonRef.current.focus();
    }
  }, []);

  const [visible, setVisible] = useState("block");
  const myData = useSelector((state) => state.celebs.celebsProfile);
  const dispatch = useAppDispatch();
  const handleCancle = () => {
    setVisible("none");
    sendDataToParent(false);
  };
  const handleDelete = () => {
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
      <div
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
          position: "relative",
          backgroundColor: "white",
          boxShadow: "0px 5px 15px 5px rgb(199, 197, 197)",
        }}
      >
        <p style={{ color: "rgb(56, 56, 56)" }}>
          Are you sure you want to delete?
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "200px",
            margin: "auto",
            marginRight: "0",
          }}
        >
          <button
            // className="dialoge-btns"
            className="dialoge-btns cancel-btn"
            onClick={handleCancle}
            ref={deleteButtonRef}
          >
            Cancle
          </button>
          <button
            // className="dialoge-btns"
            className="dialoge-btns delete-btn"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default DeletePopup;
