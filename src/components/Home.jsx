import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import "./style.css";
import Card from "./Card";
import axios from "axios";
import { apicall } from "../store/reducers/callApi";
import { useAppDispatch } from "../store/hooks";

const Home = () => {
  const dispatch = useAppDispatch();
  const [mapData, setMapData] = useState([]);
  const [compareData, setCompareData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/celebrities")
      .then((response) => {
        console.log(response.data, "shivani data");
        setMapData(response.data);
        setCompareData(response.data);
        dispatch(apicall(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleSearchQuery(query) {
    const filteredData = compareData.filter((singleProfile) =>
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
          maxWidth: "500px",
          margin: "auto",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            border: "1.5px solid #c7c5c5",
            borderRadius: "10px",
            display: "flex",
            padding: "1px",
          }}
        >
          <SearchIcon
            style={{
              marginLeft: "10px",
              padding: "3px",
              color: "#c7c5c5",
            }}
          />
          <input
            className="inputField"
            placeholder="Search user"
            onChange={(event) => onChangeHandle(event)}
          ></input>
        </Box>
        <Card celebsProfiles={mapData} />
      </Box>
    </>
  );
};

export default Home;
