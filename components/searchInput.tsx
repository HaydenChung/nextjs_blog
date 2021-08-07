import InputAdornment from "@material-ui/core/InputAdornment"
import IconButton from "@material-ui/core/IconButton"
import SearchIcon from "@material-ui/icons/Search"
import TextField from "@material-ui/core/TextField"
import InputBase from "@material-ui/core/InputBase"
import { makeStyles } from "@material-ui/styles"
import Slide from "@material-ui/core/Slide"
import Grow from "@material-ui/core/Grow"


const useStyles = makeStyles({
    searchIcon: {

    },
    text: {

    }
});

type SearchInputProps = {
    show: boolean
};

export default function SearchInput({show = true}: SearchInputProps) {

    const classes = useStyles();

    return (
        <Grow in={show} mountOnEnter={true} unmountOnExit={true} >
            <TextField 
                className={classes.text}
                label="To Search....."
            />
        </Grow>
    //     <TextField
    //     label="With normal TextField"
    //     InputProps={{
    //       endAdornment: (
    //         <InputAdornment position="end">
    //           <IconButton className={classes.searchIcon}>
    //             <SearchIcon />
    //           </IconButton>
    //         </InputAdornment>
    //       )
    //     }}
    //   />
    )

}