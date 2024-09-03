import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import DeletePopup from "./DeletePopup";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useAppDispatch } from "../store/hooks";
import { updateCelebs } from "../store/reducers/updateCelebs";
import axios from "axios";

const Card = ({ celebsProfiles, isSearching }) => {
  const dispatch = useAppDispatch();

  function calculateAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }
    return age;
  }
  //convert number into dob
  function calculateDOBFromAge(age) {
    const today = new Date();
    const birthYear = today.getFullYear() - age;
    const birthMonth = today.getMonth();
    const birthDay = today.getDate();
    const birthDate = new Date(birthYear, birthMonth, birthDay);
    const formattedDOB = birthDate.toISOString().split("T")[0];

    return formattedDOB;
  }

  const genders = [
    "male",
    "female",
    "transgender",
    "Rather not to say",
    "Others",
  ];
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [borderVal, setBorderVal] = useState("none");
  const [deleteClick, setDeleteClick] = useState(false);
  const [deleteKey, setDeletekey] = useState(null);
  const [isDropdown, setIsDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [initialInputValues, setInitialInputValues] = useState({
    dob: null,
    gender: null,
    country: null,
  });

  const handleEditButtonClick = (event, item) => {
    event.preventDefault();
    setInitialInputValues((prevValues) => ({
      ...prevValues,
      first: item.first,
      dob: item.dob,
      gender: item.gender,
      country: item.country,
      description: item.description,
    }));
    setSelectedOption(item.gender);
    setIsEditable(true);
    setBorderVal("1px solid #c7c5c5");
    setIsDropdown(true);
  };

  const handleInputChange = (event) => {
    setSelectedOption(event.target.value);
    setInitialInputValues((prevValues) => ({
      ...prevValues,
      gender: event.target.value,
    }));
  };

  const handleIconClick = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const ChangeCancle = () => {
    setIsEditable(false);
    setBorderVal("none");
  };
  const ChangeSave = (event, item, id) => {
    let ifChangedVal = false;
    setIsEditable(false);
    setBorderVal("none");
    setIsDropdown(false);
    const updatedItem = { ...item };
    for (let key in initialInputValues) {
      if (initialInputValues[key] !== item[key]) {
        updatedItem[key] = initialInputValues[key];
        ifChangedVal = true;
      }
    }
    if (ifChangedVal) {
      updateCelebrity(id, updatedItem);
      dispatch(updateCelebs(updatedItem));
    }
  };

  const deleteProfile = (id) => {
    setDeleteClick(true);
    setDeletekey(id);
  };
  //update save profile
  const updateCelebrity = (id, updatedData) => {
    axios
      .put(`http://localhost:8000/celebrities/${id}`, updatedData)
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      {celebsProfiles
        ? celebsProfiles.map((item) => {
            // Hide other profiles when one is expanded
            if (expandedIndex !== null && expandedIndex !== item.id) {
              if (isSearching) {
                setExpandedIndex(null);
              }
              return null;
            }
            return (
              <>
                <Box
                  style={{
                    border: "1.5px solid #c7c5c5",
                    borderRadius: "10px",
                    marginTop: "10px",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    key={item.id}
                  >
                    <Box
                      sx={{
                        width: "50%",
                        padding: "10px 15px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        className="profile_img"
                        src={item.picture}
                        alt={"profile"}
                        style={{
                          maxWidth: "100%",
                          height: "auto",
                          flexShrink: "0",
                        }}
                      />

                      <input
                        className="nameField"
                        style={{
                          fontFamily: "sans-serif",
                          color: "#4f4e4e",
                          borderRadius: "10px",
                          minWidth: "60px",
                          border: borderVal,
                        }}
                        defaultValue={item.first}
                        disabled={!isEditable}
                        onChange={(event) => {
                          if (event.target.value) {
                            setInitialInputValues((prevValues) => ({
                              ...prevValues,
                              first: event.target.value,
                            }));
                          }
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "0px 15px",
                      }}
                    >
                      <KeyboardArrowDownIcon
                        className="downarrow_icon"
                        onClick={() => handleIconClick(item.id)}
                        style={{ cursor: "pointer", color: "#4f4e4e" }}
                      />
                    </Box>
                  </Box>
                  {expandedIndex === item.id && (
                    <Box
                      sx={{
                        width: "100%",
                        // border: "1px solid #c7c5c5",
                        borderRadius: "10px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                      className="detailed_parentDiv"
                    >
                      <Box
                        sx={{
                          width: "100%",
                          //   border: "1px solid #c7c5c5",
                          borderRadius: "10px",
                          display: "flex",
                          justifyContent: "space-between",
                          gap: "10px",
                        }}
                      >
                        <Box
                          sx={{
                            width: "20%",
                            padding: "5px 10px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "left",
                            gap: "8px",
                          }}
                        >
                          <div>Age</div>
                          <input
                            className="age_TextField"
                            style={{
                              // width: "100%",
                              border: borderVal,
                              height: "25px",
                              borderRadius: "10px",
                            }}
                            defaultValue={`${calculateAge(item.dob)} Years`}
                            disabled={!isEditable}
                            onChange={(event) => {
                              if (event.target.value.includes(Number)) {
                                setInitialInputValues((prevValues) => ({
                                  ...prevValues,
                                  dob: calculateDOBFromAge(
                                    parseInt(
                                      event.target.value.replace(/\D/g, ""),
                                      10
                                    )
                                  ),
                                }));
                              }
                            }}
                          ></input>
                        </Box>
                        <Box
                          sx={{
                            width: "20%",
                            padding: "5px 10px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "left",
                            gap: "8px",
                          }}
                        >
                          <div>Gender</div>
                          {!isDropdown ? (
                            <input
                              style={{
                                border: borderVal,
                                height: "25px",
                                borderRadius: "10px",
                              }}
                              type="text"
                              onChange={(event) => {
                                handleInputChange(event);
                              }}
                              className="gender_TextField"
                              defaultValue={`${item.gender}`}
                              disabled={!isEditable}
                            />
                          ) : (
                            <select
                              value={selectedOption}
                              onChange={(event) => {
                                handleInputChange(event);
                              }}
                              style={{
                                border: borderVal,
                                height: "25px",
                                borderRadius: "10px",
                              }}
                            >
                              {genders.map((item) => {
                                return (
                                  <>
                                    <option value={item}>{item}</option>
                                  </>
                                );
                              })}
                            </select>
                          )}
                        </Box>
                        <Box
                          sx={{
                            width: "20%",
                            padding: "5px 10px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "left",
                            gap: "8px",
                          }}
                        >
                          <div>Country</div>
                          <input
                            className="country_TextField"
                            style={{
                              border: borderVal,
                              height: "25px",
                              borderRadius: "10px",
                            }}
                            defaultValue={`${item.country}`}
                            disabled={!isEditable}
                            onChange={(event) => {
                              if (event.target.value) {
                                setInitialInputValues((prevValues) => ({
                                  ...prevValues,
                                  country: event.target.value,
                                }));
                              }
                            }}
                          ></input>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          width: "100%",
                          borderRadius: "10px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "5px",
                        }}
                      >
                        <div
                          style={{
                            padding: "10px",
                            color: "gray",
                          }}
                        >
                          Description
                        </div>
                        <div
                          style={{
                            display: "flex",
                            padding: "10px",
                            color: "gray",
                          }}
                        >
                          <textarea
                            className="description_TextField"
                            defaultValue={`${item.description}`}
                            disabled={!isEditable}
                            style={{
                              border: borderVal,
                              height: "70px",
                              overflow: "hidden",
                              resize: "none",
                              width: "100%",
                              padding: "10px",
                              borderRadius: "10px",
                              tabindex: "0",
                              fontFamily: "sans-serif",
                            }}
                            onChange={(event) => {
                              if (event.target.value) {
                                setInitialInputValues((prevValues) => ({
                                  ...prevValues,
                                  description: event.target.value,
                                }));
                              }
                            }}
                          ></textarea>
                        </div>
                      </Box>
                      <Box
                        style={{
                          width: "15%",
                          display: "flex",
                          justifyContent: "space-evenly",
                          padding: "10px",
                          margin: "auto",
                          marginRight: "0px",
                        }}
                      >
                        {isEditable ? (
                          <>
                            <CancelOutlinedIcon
                              style={{ fill: "#ea0027" }}
                              onClick={ChangeCancle}
                            />
                            <CheckCircleOutlineIcon
                              style={{ fill: "rgba(0, 234, 70, 0.764)" }}
                              onClick={(event) => {
                                ChangeSave(event, item, item.id);
                              }}
                            />
                          </>
                        ) : (
                          <>
                            <DeleteOutlineOutlinedIcon
                              style={{ fill: "#ea0027" }}
                              onClick={() => deleteProfile(item.id)}
                            />
                            <ModeEditOutlinedIcon
                              style={{ fill: "#0072ea" }}
                              onClick={(event) =>
                                handleEditButtonClick(event, item)
                              }
                            />
                          </>
                        )}
                      </Box>
                    </Box>
                  )}
                </Box>
              </>
            );
          })
        : ""}
      {deleteClick ? (
        <DeletePopup
          sendDataToParent={setDeleteClick}
          deleteKeyy={deleteKey}
          IssetExpend={setExpandedIndex}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Card;
