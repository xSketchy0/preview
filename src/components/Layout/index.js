import Head from "next/head"
import Header from "../Header"

const Layout = ({ children }) => {
    return (
        <>  
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header/>
            <main>
                {children}
            </main>
        </>
    )
}

export default Layout