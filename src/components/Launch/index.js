import { Card, Box, Avatar } from "@mui/material";
import moment from "moment";
import { Text } from "../../layouts";
import style from "./style.module.css";

const truncateWords = (string, limit) => {
  const words = string ? string.split(" ") : "";
  return words
    ? words.slice(0, limit).join(" ") + (words.length > limit ? "..." : "")
    : "";
};

const Launch = ({ props }) => {
  return (
    <Card
      sx={{
        backgroundColor: "#1d1e22",
        width: "500px",
        maxWidth: "400px",
        display: "flex",
        flexDirection: "column",
        borderStyle: "solid",
        borderColor: "rgb(65, 63, 63)",
        borderWidth: "thin",
        borderRadius: "10px",
        padding: "20px",
        margin: "20px 6px",
        boxShadow: "0 5px 8px rgba(0, 0, 0, 1)",
        color: "#ffffff",
      }}
      className={style.launch}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "flex-end",
          marginBottom: "20px",
        }}
      >
        <Avatar src={props.links.patch.small} sx={{ marginRight: "10px" }} />
        <Text fontWeight="bold" fontSize="large" marginBottom="10px"></Text>

        <Text fontWeight="bold" fontSize="large" marginBottom="10px">
          {truncateWords(props.name, 3)}
          {props.rocket.type === "rocket" ? " 🚀" : " 🛰️"}
        </Text>
      </Box>
      <Text fontWeight="100" fontSize="large" marginBottom="10px">
        <strong>Height:</strong> {props.rocket.height.meters} meters(
        {props.rocket.height.feet} feet)
      </Text>
      <Text fontWeight="100" fontSize="large" marginBottom="10px">
        <strong>Mass:</strong> {props.rocket.mass.kg} kg(
        {props.rocket.mass.lb} lb)
      </Text>
      <Text fontWeight="100" fontSize="large" marginBottom="10px">
        <strong>Launched from:</strong> {props.launchpad.region}
      </Text>
      <Text fontWeight="100" fontSize="large" marginBottom="10px">
        <strong>Launchpad full name:</strong> {props.launchpad.full_name}
      </Text>

      <Text fontWeight="100" fontSize="large" marginBottom="10px">
        <strong>Flight Number:</strong> {props.flight_number}
      </Text>

      <Text fontWeight="100" fontSize="large">
        <strong>Launch Date:</strong>
        {moment(props.date_utc).format("MMMM Do YYYY, h:mm:ss a")}
      </Text>
    </Card>
  );
};

export default Launch;
