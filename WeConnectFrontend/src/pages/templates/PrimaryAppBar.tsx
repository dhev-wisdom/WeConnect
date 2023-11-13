import { AppBar, Box, Toolbar, Link, Typography, IconButton, Drawer, useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";

const PrimaryAppBar = () => {
    const [ sideMenu, setSideMenu ] = useState(false);
    const theme = useTheme();

    const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));

    useEffect(() => {
        if (isSmallScreen && sideMenu) {
            setSideMenu(false);
        }
    }, [isSmallScreen, sideMenu]);

    const toggleDraw = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === "keydown" &&
            ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
        ) {
            return;
        }
        setSideMenu(open);
    }
    return (
        <AppBar sx={{
            zIndex: (theme) =>theme.zIndex.drawer + 2,
            background: theme.palette.background.default,
            borderBottom: `1px solid ${theme.palette.divider}`,
            }}>
            <Toolbar variant="dense"
            sx={{
                height: theme.primaryAppBar.height,
                minHeight: theme.primaryAppBar.height
            }}>
                <Box sx={{display: {xs: "block", sm: "none"}}}>
                    <IconButton color= "inherit" aria-label="open drawer" edge="start" sx={{mr: 1}} onClick={toggleDraw(!sideMenu)}>
                        <MenuIcon />
                    </IconButton>
                </Box>

                <Drawer anchor="left" open={sideMenu} onClose={toggleDraw(false)}
                PaperProps={{
                    sx: {
                            mt: ` ${theme.primaryAppBar.height}px`,
                            height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
                        }
                }}
                >
                    {[...Array(100)].map((_, i) => {
                        return (<Typography key={i} paragraph>
                            {i + 1}
                        </Typography>)
                    })}
                </Drawer>
                <Link href="/" underline="none" color="inherit">
                    <Typography
                        variant="h5" noWrap component="div"
                        sx={{display: {fontWeight: 700, letterSpacing: "-0.5px"}}}>
                        WeConnect
                    </Typography>
                </Link>
            </Toolbar>
        </AppBar>
    )
}

export default PrimaryAppBar;