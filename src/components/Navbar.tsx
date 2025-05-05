import { useState, useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import {Button, ListItem, ListItemText, AppBar, Toolbar, Typography, IconButton, Switch, FormControlLabel, Drawer, List, useMediaQuery, useTheme } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'; // Import the MenuIcon

export const Navbar = () => {
  const themeContext = useContext(ThemeContext);
  const [openDrawer, setOpenDrawer] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if screen size is small

  if (!themeContext) {
    throw new Error("Navbar must be used within a CustomThemeProvider");
  }

  const { toggleTheme, mode } = themeContext;

  // Function to toggle the Drawer (side menu)
  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {/* Hamburger menu for mobile */}
          {isMobile && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* App name or logo */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Loan Calculator
          </Typography>

          {/* Desktop buttons */}
          {!isMobile && (
            <>
              <Button color="inherit">Home</Button>
              <Button color="inherit">Exchange Rates</Button>
              <Button color="inherit">About</Button>
              <Button color="inherit">Error page</Button>
            </>
          )}

          {/* Theme toggle */}
          <FormControlLabel
            control={
              <Switch
                checked={mode === "dark"}
                onChange={toggleTheme}
                name="themeToggle"
                color="default"
              />
            }
          />
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile screens */}
      <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer}>
        <List>
          <ListItem button onClick={toggleDrawer}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={toggleDrawer}>
            <ListItemText primary="Exchange Rates" />
          </ListItem>
          <ListItem button onClick={toggleDrawer}>
            <ListItemText primary="About" />
          </ListItem>
          <ListItem button onClick={toggleDrawer}>
            <ListItemText primary="Error Page" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};
