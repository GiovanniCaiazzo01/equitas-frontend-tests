import { Button, circularProgressClasses, Box } from "@mui/material";
import React from "react";
import { Text } from "../../layouts";
import styled from "./style.module.css";
const Footer = ({ launches: data, nextPage, prevPage, currentPage }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "flex",
        padding: "25px",
      }}
      className={styled.footer_container}
    >
      <Button
        variant="contained"
        onClick={prevPage}
        disabled={currentPage === 1}
        sx={{
          backgroundColor: "white",
          color: "black",
          fontFamily: "Handjet, cursive",
          letterSpacing: "4px",
          ":hover": {
            bgcolor: "black",
            color: "white",
          },
        }}
      >
        Prev Page
      </Button>
      <Text
        color="#ffffff"
        fontSize="2rem"
        marginLeft="30px"
        marginRight="30px"
      >
        Page {data["page"]} / {data["totalPages"]}{" "}
      </Text>

      <Button
        variant="contained"
        onClick={nextPage}
        disabled={currentPage === data["totalPages"]}
        sx={{
          backgroundColor: "white",
          color: "black",
          fontFamily: "Handjet, cursive",
          letterSpacing: "4px",
          ":hover": {
            bgcolor: "black",
            color: "white",
          },
        }}
      >
        Next Page
      </Button>
    </Box>
  );
};

export default Footer;
