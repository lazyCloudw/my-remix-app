import { AppBar, Box, Button, Drawer, IconButton, List, ListItemButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AddHomeIcon from '@mui/icons-material/AddHome';
import XIcon from '@mui/icons-material/X';
import React from "react";

const drawerWidth = 150;

export default function Header() {

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <AppBar sx={{ backgroundColor: "#778899" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
            Number
          </Typography>
          {window.location.pathname !== "/vip" && (
            <Button
              variant='contained'
              onClick={() => window.location.assign('/vip')}
              sx={{ ml: 4, p: 1.5, fontWeight: "bold", borderRadius: 3, backgroundColor: "#d2b48c" }}
            >
              👑VIP
            </Button>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={() => window.open("https://telegra.ph/Link-11-26-27")}
          >
            <AddHomeIcon />
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={() => window.open("https://x.com/numbxxxs")}
          >
            <XIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            paddingTop: 0,
            width: drawerWidth,
          },
        }}
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={() => {
          setMobileOpen(false)
        }}
      >
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItemButton href='https://katfile.com/free335061.html'>
              <Typography fontWeight={"bold"}>Katfile</Typography>
            </ListItemButton>
            <ListItemButton href='https://www.kshared.com/aff/2ejlWXgPL4'>
              <Typography fontWeight={"bold"}>Kshared</Typography>
            </ListItemButton>
            <ListItemButton href='https://fikper.com/vzZ9snmkx5/register'>
              <Typography fontWeight={"bold"}>Fikper</Typography>
            </ListItemButton>
            <ListItemButton href='https://fileland.io/premium2539.html'>
              <Typography fontWeight={"bold"}>Fileland</Typography>
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}