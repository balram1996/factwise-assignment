import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Card = ({ celebsProfiles }) => {
  return (
    <>
      {celebsProfiles
        ? celebsProfiles.map((item) => {
            return (
              <Box
                sx={{
                  width: "100%",
                  border: "1.5px solid gray",
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
                key={item.index}
              >
                <Box
                  sx={{
                    width: "20%",
                    padding: "15px",
                    display: "flex",
                  }}
                >
                  <img className="profile_img" src={item.picture} />
                  <span className="nameField">{item.first}</span>
                </Box>
                <KeyboardArrowDownIcon className="downarrow_icon" />
              </Box>
            );
          })
        : ""}
    </>
  );
};

export default Card;
