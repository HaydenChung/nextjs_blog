import React, { useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '@/lib/theme'
import darkTheme from '@/lib/darkTheme'
import TopBar from '@/components/topBar'
import '@/styles/glob.css'
import Slide from '@material-ui/core/Slide'
import { useScrollTrigger } from '@material-ui/core'


export default function Main(props) {
  const { Component, pageProps, router } = props;
  
  const [darkMode, setDarkMode] = useState(false)
  const trigger = useScrollTrigger();

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

  });


  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={darkMode ? darkTheme : theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <TopBar setDarkMode={setDarkMode} isDarkMode={darkMode} />
        <CssBaseline />
            <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  );
}

Main.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};