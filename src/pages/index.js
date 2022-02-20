import HeadTitle from "../components/Utilities/HeadTitle"
import { motion } from "framer-motion"
import InView from 'react-intersection-observer';
import { page, sentence } from "../components/Utilities/transitionHelpers"
import Loader from '../components/Loader'
import Custom404 from './404'
import { useRouter } from 'next/router'
import useUpdatePreviewRef from '../utils/useUpdatePreviewRef'
import { RichText } from 'prismic-reactjs'
import { Client } from '../utils/prismicHelpers'
import Image from "next/image"
import Footer from "../components/Footer"
import { isFirefox } from "react-device-detect";
import { useRef, useEffect } from "react";
import SliceZone from 'next-slicezone';
import * as Slices from '../../slices'
// import { useEffect } from "react"
// import Split from "../components/Utilities/Split"
// import Link from "next/link"

const Home = ({ home, previewRef }) => {
    const router = useRouter()
    if (router.isFallback) {
        return <Loader />
    }

    if (!home.id) {
        return <Custom404 />
    }

    useUpdatePreviewRef(previewRef, home.id)

    if (home && home.data) {
        const scrollRef = useRef();
        const matchFirefox = (multiplier = 1, level = 2.5) => Math.round((isFirefox ? level * multiplier : multiplier) * 100) / 100
        
        useEffect(() => {
            import("locomotive-scroll").then((Loco) => {
                scroll = new Loco.default({
                    el: scrollRef.current,
                    smooth: true,
                    getSpeed: true,
                    getDirection: true,
                    reloadOnContextChange: true,
                    multiplier: matchFirefox(1.2),
                    direction: 'vertical'
                })
            })

            return () => {
                scroll.destroy()
            }
        })

        return (
            <>
                <HeadTitle title="Home" />
                <motion.div
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={page.fadeIn}
                    className="home"
                    ref={scrollRef}
                >
                    <div className="home__hero">
                        <div className="home__hero-forms">
                            <div className="home__hero-wave-top"></div>
                            <div className="home__hero-wave-bottom"></div>
                            <div className="home__hero-circle-top"></div>
                            <div className="home__hero-circle"></div>
                        </div>
                        <div className="home__hero-wrapper">
                            <InView threshold={0.25}>
                                {({ref, inView}) => (
                                    <motion.div 
                                        data-scroll 
                                        data-scroll-speed="1"
                                        data-scroll-direction="horizontal"
                                        className="home__hero-text"
                                        ref={ref}
                                        animate={
                                            inView ? sentence.fadeIn.animate : sentence.fadeIn.initial
                                        }
                                        variants={sentence.fadeIn}
                                    >
                                        <span 
                                            className="circle"
                                            data-scroll 
                                            data-scroll-speed="0.3"
                                        ></span>
                                        <span 
                                            className="circle"
                                            data-scroll 
                                            data-scroll-speed="0.5"
                                        ></span>
                                        <span 
                                            className="circle"
                                            data-scroll 
                                            data-scroll-speed="0.7"
                                        ></span>
                                        <RichText render={home.data.title} />
                                    </motion.div>
                                )}
                            </InView>
                        </div>
                    </div>
                    <div className="home__about">
                        <div className="home__about-forms">
                            <div className="home__about-wave"></div>
                        </div>
                        <div className="home__about-wrapper">
                            <InView threshold={0.25}>
                                {({ref, inView}) => (
                                    <motion.div 
                                        data-scroll 
                                        data-scroll-speed="1"
                                        className="home__about-text" 
                                        ref={ref}
                                        animate={
                                            inView ? sentence.fadeIn.animate : sentence.fadeIn.initial
                                        }
                                        variants={sentence.fadeIn}
                                    >
                                        <RichText render={home.data.description} />
                                    </motion.div>
                                )}
                            </InView>
                        </div>
                    </div>
                    <div className="home__double">
                        <div className="home__double-forms">
                            <div className="home__double-wave"></div>
                        </div>
                        <div className="home__double-wrapper">
                            <InView threshold={0.25}>
                                {({ref, inView}) => (
                                    <motion.div 
                                        data-scroll 
                                        data-scroll-speed="1"
                                        className="home__double-text"
                                        ref={ref}
                                        animate={
                                            inView ? sentence.fadeIn.animate : sentence.fadeIn.initial
                                        }
                                        variants={sentence.fadeIn}
                                    >
                                        <span 
                                            className="circle"
                                            data-scroll 
                                            data-scroll-speed="0.3"
                                        ></span>
                                        <span 
                                            className="circle"
                                            data-scroll 
                                            data-scroll-speed="0.5"
                                        ></span>
                                        <span 
                                            className="circle"
                                            data-scroll 
                                            data-scroll-speed="1.5"
                                        ></span>
                                        <RichText render={home.data.text} />
                                    </motion.div>
                                )}
                            </InView>
                            <InView threshold={0.25}>
                                {({ref, inView}) => (
                                    <motion.div 
                                        data-scroll 
                                        data-scroll-speed="0.7"
                                        className="home__double-image"
                                        ref={ref}
                                        animate={
                                            inView ? sentence.fadeIn.animate : sentence.fadeIn.initial
                                        }
                                        variants={sentence.fadeIn}
                                    >
                                        <Image src={home.data.image.url} layout="fill" objectFit="contain" alt={home.data.image.alt} />
                                    </motion.div>
                                )}
                            </InView>
                        </div>
                    </div>
                    {
                        home.data.slices3.length > 0 ? <div className="slices">
                            <SliceZone
                                slices={home.data.slices3}
                                resolver={({ sliceName }) => Slices[sliceName]}
                            />
                        </div> : <></>
                    }
                    {/* <div className="home__section">
                        <Split text={RichText.asText(home.data.title)} sentence={sentence.fadeIn} transition={letter.fadeDown} />
                        <Link href="/over-ons" scroll={false}>
                            Go
                        </Link>
                    </div>
                    <div className="home__section">
                        <Split text={RichText.asText(home.data.title)} sentence={sentence.fadeIn} transition={letter.fadeDown} />
                        <Link href="/over-ons" scroll={false}>
                            Go
                        </Link>
                    </div> */}
                    <Footer />
                </motion.div>
            </>
        )
    }
}

export const getStaticProps = async ({ previewData }) => {
    try {
        const previewRef = previewData ? previewData.ref : null
        const refOption = previewRef ? { ref: previewRef } : null

        const home = (await Client().getSingle("home", refOption)) || {}

        return {
            props: {
                home,
                previewRef
            }
        }
    } catch (e) {
        return {
            notFound: true
        }
    }
}

export default Home

// import Head from 'next/head'
// import Image from 'next/image'
// import { RichText } from 'prismic-reactjs'
// import { Client } from '../utils/prismicHelpers'
// import useUpdatePreviewRef from '../utils/useUpdatePreviewRef'
// import Loader from '../components/Loader'
// import Custom404 from './404'
// import { useRouter } from 'next/router'

// const Home = ({ thuis, previewRef }) => {
//     const router = useRouter()
//     if (router.isFallback) {
//         return <Loader />
//     }

//     if (!thuis.id) {
//         return <Custom404 />
//     }

//     useUpdatePreviewRef(previewRef, thuis.id)
    
//         return (
//             <div>
//                 <h1>{RichText.asText(thuis.data.title)}</h1>
//             </div>
//         )

// }

// export async function getStaticProps({ previewData }) {

//     const previewRef = previewData ? previewData.ref : null
//     const refOption = previewRef ? { ref: previewRef } : null

//     const thuis = (await Client().getSingle("test", refOption)) || {}

//     return {
//         props: {
//             thuis,
//             previewRef,
//         }
//     }
// }

// export default Home;