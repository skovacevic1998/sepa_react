import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { IconButtonProps } from "@mui/material/IconButton";
import Logo from "./../../../assets/vub_logo.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { clearUser } from "../../../redux/slice";

const pages = [
  { label: "Početna stranica", path: "/home" },
  { label: "Unos naloga", path: "/home/unos" },
  { label: "Učitavanje naloga", path: "/home/ucitavanje" },
  { label: "Konsignacija", path: "/home/konsignacija" },
  { label: "Pregled naloga", path: "/home/pregled" },
];
const settings = ["Profil", "Logout"];

interface NavBarProps {
  iconButton: React.ReactElement<IconButtonProps>;
  getBackgroundColorNavBar: any;
  getTextColorNavBar: any;
}

export const NavBar: React.FC<NavBarProps> = ({
  iconButton,
  getBackgroundColorNavBar,
  getTextColorNavBar,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getTextColor = getTextColorNavBar();

  const userData = useSelector((state: RootState) => state.user.currentUser);

  const routeChange = (path: string) => {
    if (userData) {
      navigate(path);
    }
  };

  const sRouteChange = (settingName: string) => {
    if (settingName === "Profil") {
      routeChange("/home/profil");
    } else if (settingName === "Logout") {
      dispatch(clearUser());
      navigate("/");
    }
  };

  const sRouteChangeNav = (page: any) => {
    routeChange(page.path);
  };

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar
        position="relative"
        sx={{
          backgroundColor: getBackgroundColorNavBar,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Avatar src={Logo} style={{ marginRight: "2%" }} />
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                    <Typography
                      color={getTextColor}
                      textAlign="center"
                      style={{
                        fontWeight:
                          location.pathname === page.path ? "bold" : "normal",
                      }}
                    >
                      <Button onClick={() => sRouteChangeNav(page)}>
                        {page.label}
                      </Button>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  style={{ color: getTextColor }}
                  onClick={() => routeChange(page.path)}
                  key={page.label}
                  sx={{
                    fontWeight:
                      location.pathname === page.path ? "bold" : "normal",
                  }}
                >
                  {page.label}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {iconButton}
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Button
                      style={{ color: getTextColor }}
                      onClick={() => sRouteChange(setting)}
                    >
                      {setting}
                    </Button>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
