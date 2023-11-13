import { ChevronRight } from "@mui/icons-material";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import { Box, IconButton } from "@mui/material";
import React from "react";

type Props = {
    open: boolean;
    toggleDraw: () => void;
}
const  DrawerToggle: React.FC<Props> = ({open, toggleDraw}) => {
    return (
        <Box sx={{ height: "50px", display: "flex", alignItems: "center", justifyContent: "center",}}>
            <IconButton onClick={toggleDraw}>
                { open ? <ChevronLeft /> : <ChevronRight /> }
            </IconButton>
        </Box>
    )
}

export default DrawerToggle;