import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#f8f8ff'
//            main: '#efedea'
        },
        secondary: {
//            main: '#4E8098'
            main: '#00a1d6'
        },
        background: {
            default: '#efedea'
//            default: '#f8f8ff',
        }
    },
});

export default theme;