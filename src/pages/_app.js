import { AnimatePresence } from 'framer-motion'
import Layout from '../components/Layout'
import NextNprogress from 'nextjs-progressbar'
import '../styles/style.scss'
import { useState, useEffect } from 'react'

const MyApp = ({ Component, pageProps, router }) => {
    const [isLoaded, setLoaded] = useState(false);
  
    useEffect(() => {
        setLoaded(true);
    }, []);

    if (!isLoaded) {
        return <></>;
    }

    return (
        <>
            <NextNprogress
                color="#AD080F"
                startPosition={0.3}
                options={{ easing: 'ease', speed: 500, showSpinner: false }}
                height={2}
                showOnShallow={true}
            />
            <Layout>
                <AnimatePresence
                    exitBeforeEnter
                    onExitComplete={() => window.scrollTo(0, 0)}
                >
                    <Component {...pageProps} key={router.route} />
                </AnimatePresence>
            </Layout>
        </>
    )
}

export default MyApp
