import { AppBar, Toolbar, InputBase, IconButton } from "@material-ui/core"
import NavMenu from "./navMenu"
import MenuIcon from "@material-ui/icons/Menu"
import SearchIcon from "@material-ui/icons/Search"
import BrightnessIcon from "@material-ui/icons/Brightness4TwoTone"
import { makeStyles } from "@material-ui/styles"
import LinearProgress from "@material-ui/core/LinearProgress"
import Slide  from "@material-ui/core/Slide"
import { useState } from 'react'
import SearchInput from '@/components/searchInput'

type TopBarProps = {
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>,
    isDarkMode: boolean
}

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        zIndex: 99
    },
    loadingBar: {
        zIndex: -1
    },
    iconButton: {
        marginRight: '1rem'
    }
});


export default function TopBar(props: TopBarProps) {

    const classes = useStyles();
    const [ pageChanging, setPageChanging ] = useState(false);
    const [ openSearch, setOpenSearch ] = useState(false);
    const { setDarkMode, isDarkMode } = props;

    return (
        <div className={classes.root}>
            <AppBar position="static" >
                <Toolbar>
                    <IconButton
                        edge="start"

                    >
                        <MenuIcon />
                    </IconButton>
                    <NavMenu displayLoadBar={setPageChanging.bind(this)} />
                    <IconButton onClick={()=> { setDarkMode(!isDarkMode) }}
                        edge="end"
                        className={classes.iconButton}
                    >
                        <BrightnessIcon />
                    </IconButton>

                    <SearchInput show={openSearch}/>
                    <IconButton
                        edge="end"
                        onClick={()=> { setOpenSearch(!openSearch) }}
                    >
                        <SearchIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Slide direction='down' in={pageChanging}>
                <LinearProgress className={classes.loadingBar} color="secondary" />
            </Slide>


        </div>
    )

}