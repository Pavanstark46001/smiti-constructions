import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Grid,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    Collapse,
    Box,
    useTheme,
    useMediaQuery,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import image from "../asstes/image.png";

const Header = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const [servicesAnchor, setServicesAnchor] = useState(null);
    const [projectsAnchor, setProjectsAnchor] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
    const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);

    return (
        <>
            <AppBar position="static" sx={{ background: "#ebedeb", boxShadow: "none", }}>
                <Toolbar sx={{ height: 100, ml: 5 }}>
                    <Grid container alignItems="center">
                        {/* Logo */}
                        <Grid item xs={6} md={2}>
                            <img src={image} alt="logo" style={{ height: 60, }} />
                        </Grid>

                        {/* Desktop Menu */}
                        {!isMobile && (
                            <Grid
                                item
                                md={7}
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    alignItems: "center",
                                    gap: 2,
                                }}
                            >
                                <NavButton label="About Us" />

                                <DropdownButton
                                    label="Services"
                                    anchor={servicesAnchor}
                                    setAnchor={setServicesAnchor}
                                    items={["Interior Design", "Construction", "Renovation"]}
                                />

                                <DropdownButton
                                    label="Projects"
                                    anchor={projectsAnchor}
                                    setAnchor={setProjectsAnchor}
                                    items={["Residential", "Commercial", "Ongoing"]}
                                />

                                <NavButton label="Cost Calculation" />
                                <NavButton label="Gallery" />
                                <NavButton label="Blog" />
                            </Grid>
                        )}

                        {/* CTA / Hamburger */}
                        <Grid item xs={6} md={3} textAlign="left" sx={{ ml: 0 }}>
                            {isMobile ? (
                                <IconButton
                                    onClick={() => setDrawerOpen(true)}
                                    sx={{
                                        backgroundColor: "#1976d2",
                                        color: "#fff",
                                        "&:hover": { backgroundColor: "#1565c0" },
                                    }}
                                >
                                    <MenuIcon />
                                </IconButton>
                            ) : (
                                <Button
                                    sx={{
                                        textTransform: "none",
                                        fontWeight: 600,
                                        fontSize: "20px",
                                        px: 1,
                                        py: 1,
                                        width: "80%",
                                        borderRadius: "30px",
                                        color: "#fff",
                                        background: "#303940",
                                        overflow: "hidden",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 1,
                                        position: "relative",
                                        transition: "all 0.3s ease",
                                        boxShadow: "0 8px 20px rgba(0,0,0,0.25)",

                                        "&:hover .btn-text": {
                                            transform: "translateX(-6px)",
                                        },
                                        "&:hover .btn-arrow": {
                                            opacity: 1,
                                            transform: "translateX(4px)",
                                        },
                                    }}
                                >
                                    {/* Animated Text */}
                                    <Box
                                        className="btn-text"
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            transition: "transform 0.3s ease",

                                        }}
                                    >
                                        Get A Quote
                                    </Box>

                                    {/* Arrow */}
                                    <ArrowForwardIcon
                                        sx={{
                                            fontSize: 30,
                                            ml: 0.5,
                                            animation: "arrowMove 1.2s ease-in-out infinite",
                                            "@keyframes arrowMove": {
                                                "0%": {
                                                    transform: "translateX(0)",
                                                    opacity: 0.6,
                                                },
                                                "50%": {
                                                    transform: "translateX(6px)",
                                                    opacity: 1,
                                                },
                                                "100%": {
                                                    transform: "translateX(0)",
                                                    opacity: 0.6,
                                                },
                                            },
                                        }}
                                    />

                                </Button>
                            )}
                        </Grid>

                    </Grid>
                </Toolbar>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box sx={{ width: 280 }}>
                    <List>
                        <DrawerItem label="About Us" />

                        {/* Services */}
                        <ListItemButton onClick={() => setMobileServicesOpen(!mobileServicesOpen)}>
                            <ListItemText primary="Services" />
                            {mobileServicesOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </ListItemButton>

                        <Collapse in={mobileServicesOpen}>
                            <List disablePadding>
                                {["Interior Design", "Construction", "Renovation"].map((item) => (
                                    <DrawerSubItem key={item} label={item} />
                                ))}
                            </List>
                        </Collapse>

                        {/* Projects */}
                        <ListItemButton onClick={() => setMobileProjectsOpen(!mobileProjectsOpen)}>
                            <ListItemText primary="Projects" />
                            {mobileProjectsOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </ListItemButton>

                        <Collapse in={mobileProjectsOpen}>
                            <List disablePadding>
                                {["Residential", "Commercial", "Ongoing"].map((item) => (
                                    <DrawerSubItem key={item} label={item} />
                                ))}
                            </List>
                        </Collapse>

                        <DrawerItem label="Cost Calculation" />
                        <DrawerItem label="Gallery" />
                        <DrawerItem label="Blog" />
                        <DrawerItem label="Contact Us" />
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

/* Desktop Nav Button */
const NavButton = ({ label }) => (
    <Button
        sx={{
            textTransform: "none",
            color: "#000",
            fontWeight: 600,
            fontSize: 16,
            "&:hover": { color: "#1976d2" },
        }}
    >
        {label}
    </Button>
);

/* Desktop Dropdown WITH animated menu icon */
const DropdownButton = ({ label, anchor, setAnchor, items }) => {
    const open = Boolean(anchor);

    return (
        <>
            <Button
                onClick={(e) => setAnchor(e.currentTarget)}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{
                    textTransform: "none",
                    color: "#000",
                    fontWeight: 600,
                    fontSize: 16,
                }}
            >
                {label}
            </Button>


            <Menu anchorEl={anchor} open={open} onClose={() => setAnchor(null)}>
                {items.map((item) => (
                    <MenuItem key={item} onClick={() => setAnchor(null)}>
                        {item}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

/* Drawer Items */
const DrawerItem = ({ label }) => (
    <ListItemButton>
        <ListItemText primary={label} />
    </ListItemButton>
);

const DrawerSubItem = ({ label }) => (
    <ListItemButton sx={{ pl: 4 }}>
        <ListItemText primary={label} />
    </ListItemButton>
);

export default Header;
