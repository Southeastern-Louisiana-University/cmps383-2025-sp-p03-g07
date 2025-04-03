import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { Button, Icon } from "@mui/material";
import TheaterLocation from "./TheaterLocation";

function ResponsiveAppBar() {
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      sx={{
        width: "100%",
        top: 0, // Ensures it stays at the top
        left: 0, // Ensures it is aligned to the left edge
        zIndex: 1000, // Makes sure it appears on top of other content
        height: "60px",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Icon onClick={() => navigate("/login")}>Logo</Icon>
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Button
              onClick={() => navigate("/theaters")}
              style={{
                border: "solid",
                background: "#00000f",
                color: "inherit",
              }}
            >
              HOME
            </Button>
          </Typography>
          <TheaterLocation />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
