import { Box } from "@mui/material";
import Launch from "../Launch";

const Launches = ({ launches }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "start",
      }}
    >
      {launches.map((launch) => (
        <Launch props={launch} key={launch.id} />
      ))}
    </Box>
  );
};

export default Launches;
