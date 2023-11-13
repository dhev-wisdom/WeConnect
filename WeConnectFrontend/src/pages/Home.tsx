import { Box, CssBaseline } from "@mui/material";
import PrimaryAppBar from "./templates/PrimaryAppBar";
import PrimaryDraw from "./templates/PrimaryDraw";
import PopularChannels from "../components/PrimaryDraw/PopularChannels";
import ExploreCategories from "../components/SecondaryDraw/ExploreCategories";
import useTheme from "@mui/material";
import SecondaryDraw from "./templates/SecondaryDraw";
import Main from "./templates/Main";

const Home = () => {

    return (
        <>
            <Box sx={{display: "flex"}}>
                <CssBaseline />
                <PrimaryAppBar />
                <PrimaryDraw>
                    <PopularChannels open={false} />
                </PrimaryDraw>
                <SecondaryDraw>
                    <ExploreCategories />
                </SecondaryDraw>
                <Main />
            </Box>
        </>
    )
}

export default Home;