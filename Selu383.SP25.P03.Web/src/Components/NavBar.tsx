import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import TheaterLocation from "./TheaterLocation";

function ResponsiveAppBar() {
  const navigate = useNavigate();

  return (
    <AppBar position="fixed" color="primary" elevation={4}>
      <Toolbar disableGutters sx={{ width: "100vw" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Button onClick={() => navigate("/login")} color="inherit">
            Home
          </Button>
          <TheaterLocation />
          <Button onClick={() => navigate("/login")} color="inherit">
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default ResponsiveAppBar;
