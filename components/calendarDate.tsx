import { makeStyles } from "@material-ui/core/styles"
import { Grid } from "@material-ui/core"
import classnames from "classnames"
import { useEffect, useState } from "react";

const useStyles = makeStyles((theme)=> ({
    wrapper: {
        float: 'right',
        width: '80px',
        margin: '10px'
    },
    item: {
        alignSelf: 'center'
    },
    upperBlock: {
        border: 'black 1px solid',
        borderRadius: '10px 10px 0 0',
        padding: '4px 10px',
        marginBottom: '2px',
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.text.secondary,
        fontWeight: 'bold',
//        color: 
        //        backgroundColor: '#dd4621',
//        color: '#FFFFFF'
    },
    lowerBlock: {
        border: 'black 1px solid',
        borderRadius: '0 0 10px 10px',
        padding: '10px',
        backgroundColor: theme.palette.text.primary,
        color: theme.palette.primary.dark
    }
}));

type CalendarDateProps = {
    date?: Date
};

export default function CalendarDate(props: CalendarDateProps) {

    const classes = useStyles();
    const [year, setYear] = useState(null)
    const [month, setMonth] = useState(null)
    const [date, setDate] = useState(null)
    
    useEffect(()=> {
        if(props.date !== null && typeof props.date.getFullYear === 'function') {
            setYear(props.date.getFullYear())
            setMonth(props.date.getMonth() + 1);
            setDate(props.date.getDate());
        }
    }, [props.date])



    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            className={classes.wrapper}
        >
            <Grid container justifyContent="center" className={classnames(classes.item, classes.upperBlock)}>
                {year}
            </Grid>
            <Grid 
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                className={classnames(classes.lowerBlock)}
            >
                <Grid item className={classes.item}>
                    {month}
                </Grid>
                <span>/</span>
                <Grid item className={classes.item}>
                    {date}
                </Grid>
            </Grid>
        </Grid>
    )

}