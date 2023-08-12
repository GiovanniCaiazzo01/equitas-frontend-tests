import { Box } from "@mui/material";
import React from "react";
import { Text } from "../../layouts";
import style from "./style.module.css";
const Header = ({ launches: data }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
      className={style.header_container}
    >
      <Text fontSize="3rem" color="#ffffff" marginRight="10px">
        SpaceX 🚀
      </Text>
      <Text
        fontSize="3rem"
        color="#ffffff"
        marginRight="10px"
        marginLeft="10px"
      >
        Total Launches: {data["totalDocs"]} 🧑‍💻
      </Text>
    </Box>
  );
};

export default Header;
