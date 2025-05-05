import { useState, useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import { Button, ListItemText, AppBar, Toolbar, Typography, IconButton, Switch, FormControlLabel, Drawer, List, useMediaQuery, useTheme, ListItemButton,} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

export const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("Navbar must be used within a CustomThemeProvider");
  }

  const { toggleTheme, mode } = themeContext;
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const toggleDrawer = () => {
    setOpenDrawer(prev => !prev);
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Exchange Rates", path: "/exchange-rates" },
    { label: "About", path: "/about" },
    { label: "Error Page", path: "/error" },
  ];

  return (
    <>
      <AppBar position="static">
        <Toolbar>
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

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Loan Calculator
          </Typography>

          {!isMobile && navLinks.map(({ label, path }) => (
            <Button
              key={path}
              color="inherit"
            >
              {label}
            </Button>
          ))}

          <FormControlLabel
            control={
              <Switch
                checked={mode === "dark"}
                onChange={toggleTheme}
                name="themeToggle"
                color="default"
              />
            }
            label=""
          />
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer}>
        <List>
          {navLinks.map(({ label, path }) => (
            <ListItemButton
            key={path}
            onClick={toggleDrawer}
            component="a"
            href={path} // You can replace this with a <Link> if using React Router
          >
            <ListItemText primary={label} />
          </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
};
