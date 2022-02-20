// pages/404.js
import Link from 'next/link'
import Head from "next/head"
import HeadTitle from '../components/Utilities/HeadTitle'
import { motion } from 'framer-motion'
import { page } from '../components/Utilities/transitionHelpers'

const Custom404 = () => {
    return (
        <>
        <HeadTitle title="404" />
        <motion.div className="notfound" variants={page.home} initial="initial" animate="animate" exit="exit">
            <h1>
                <span>404</span>
                <span>Page Not Found</span>
            </h1>
        </motion.div>
        </>
    )
}

export default Custom404