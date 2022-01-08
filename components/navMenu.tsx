import Link from 'next/link'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Typography, Tab, Tabs } from '@material-ui/core'
import React, { useState, useEffect } from "react"
import { useRouter } from 'next/router'
import classnames from 'classnames'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    padding: {
        padding: theme.spacing(5),
    },
    topTab: {
        height: '6rem',
        font: '700 13px Helvetica,Arial,Sans-Serif'
    },
    prominentDrop: {
        flexGrow: 1,
        alignSelf: 'flex-end',
    }
}));

type NavMenuProps = {
    displayLoadBar: (isShow: boolean)=> {} ,
    prominent?: boolean
}

export default function NavMenu(props: NavMenuProps) {

    const classes = useStyles();
    const router = useRouter();
    const { displayLoadBar, prominent } = props;
    const [value, setValue] = useState(0);
    const [targetPath, setTargetPath] = useState(router.asPath);

    const tabPathMapping = [
        '/',
        '/tech',
        '/bike',
        '/others',
        '/about'
    ]

    const curTabIndex = tabPathMapping.indexOf(router.asPath);

    if(curTabIndex !== -1 && value != curTabIndex) setValue(curTabIndex);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if(typeof newValue == 'number' && typeof tabPathMapping[newValue] != 'undefined') {
            setTargetPath(tabPathMapping[newValue])
            router.push(tabPathMapping[newValue]);
            displayLoadBar(true);
        }
    };

    useEffect(()=> {
        if(targetPath === router.asPath) displayLoadBar(false);
    })

    return (
        <div className={classnames(classes.root, prominent && classes.prominentDrop)}>
            <Tabs centered={true} value={value} onChange={handleChange} aria-label="tabs">
                <Tab label="Home" value={0} className={classes.topTab} />
                <Tab label="Tech" value={1} className={classes.topTab} />
                <Tab label="Bike" value={2} className={classes.topTab} />
                <Tab label="Others" value={3} className={classes.topTab} />
                <Tab label="About" value={4} className={classes.topTab} />
            </Tabs>
        </div>
    )

}