import Head from "next/head"

const HeadTitle = ({ title }) => {
    return (
        <Head>
            <title>{`${title} - Kazerne Reigersbos`}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
    )
}

export default HeadTitle