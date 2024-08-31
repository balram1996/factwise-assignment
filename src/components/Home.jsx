import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import "./style.css";
import Card from "./Card";
import { useAppDispatch, useAppSelector } from "../index";
import { useSelector } from "react-redux";

const Home = () => {
  const [mapData, setMapData] = useState([]);
  const dispatch = useAppDispatch();
  const allUsers = useSelector((state) => state.celebs.celebsProfile);

  useEffect(() => {
    setMapData(allUsers);
  }, [allUsers]);

  function handleSearchQuery(query) {
    const filteredData = allUsers.filter((singleProfile) =>
      singleProfile.first.toLowerCase().includes(query)
    );
    setMapData(filteredData);
  }
  function debouce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }
  const applyDebounce = debouce(handleSearchQuery, 500);
  const onChangeHandle = (event) => {
    applyDebounce(event.target.value);
  };

  return (
    <>
      <Box
        sx={{
          p: 2,
          border: "1.5px solid black",
          width: "50%",
          margin: "auto",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            border: "1.5px solid gray",
            borderRadius: "10px",
            display: "flex",
            padding: "1px",
          }}
        >
          <SearchIcon
            style={{
              marginLeft: "10px",
              padding: "3px",
              color: "gray",
            }}
          />
          <input
            className="inputField"
            placeholder="Search user"
            onChange={onChangeHandle}
          ></input>
        </Box>
        <Card celebsProfiles={mapData} />
      </Box>
    </>
  );
};

export default Home;
