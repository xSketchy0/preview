import { motion } from "framer-motion"
import { page, sentence, letter } from "../components/Utilities/transitionHelpers"
import useUpdatePreviewRef from "../utils/useUpdatePreviewRef"
import { Client } from '../utils/prismicHelpers'
import { useRouter } from 'next/router'
import Footer from "../components/Footer"
import HeadTitle from "../components/Utilities/HeadTitle"
import { RichText } from "prismic-reactjs"
import InView from "react-intersection-observer"
import Image from "next/image"
import { isFirefox } from "react-device-detect";
import { useRef, useEffect } from "react";
import SliceZone from 'next-slicezone';
import * as Slices from '../../slices'

const overOns = ({ about, previewRef }) => {
    const router = useRouter()
    if (router.isFallback) {
        return <Loader />
    }

    if (!about.id) {
        return <Custom404 />
    }

    useUpdatePreviewRef(previewRef, about.id)

    if (about && about.data) {
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
                <HeadTitle title="Over Ons" />
                <motion.div 
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={page.fadeIn}
                    className="over-ons"
                    ref={scrollRef}
                >
                    <div className="over-ons__hero">
                        <div className="over-ons__hero-forms">
                            <div className="over-ons__hero-form"></div>
                        </div>
                        <div className="over-ons__hero-text">
                            <InView threshold={0.25}>
                                {({ref, inView}) => (
                                    <motion.div
                                        data-scroll 
                                        data-scroll-speed="1"
                                        data-scroll-direction="horizontal" 
                                        className="over-ons__hero-top"
                                        ref={ref}
                                        animate={
                                            inView ? sentence.fadeIn.animate : sentence.fadeIn.initial
                                        }
                                        variants={sentence.fadeIn}
                                    >
                                        <RichText render={about.data.title} />
                                    </motion.div>
                                )}
                            </InView>
                            <InView threshold={0.25}>
                                {({ref, inView}) => (
                                    <motion.div 
                                        data-scroll 
                                        data-scroll-speed="1"
                                        className="over-ons__hero-bottom"
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
                                        <RichText render={about.data.subText} />
                                    </motion.div>
                                )}
                            </InView>
                        </div>
                    </div>
                    <div className="over-ons__double">
                        <div className="over-ons__double-wrapper">
                            <InView threshold={0.25}>
                                {({ref, inView}) => (
                                    <motion.div 
                                        data-scroll 
                                        data-scroll-speed="1"
                                        className="over-ons__double-text"
                                        ref={ref}
                                        animate={
                                            inView ? sentence.fadeIn.animate : sentence.fadeIn.initial
                                        }
                                        variants={sentence.fadeIn}
                                    >
                                        <RichText render={about.data.description} />
                                    </motion.div>
                                )}
                            </InView>
                            <InView threshold={0.25}>
                                {({ref, inView}) => (
                                    <motion.div 
                                        className="over-ons__double-image"
                                        ref={ref}
                                        animate={
                                            inView ? sentence.fadeIn.animate : sentence.fadeIn.initial
                                        }
                                        variants={sentence.fadeIn}
                                    >
                                        <div 
                                            data-scroll 
                                            data-scroll-speed="2"
                                            className="over-ons__double-image-wrapper"
                                        >
                                            <Image src={about.data.image.url} layout="fill" objectFit="cover" alt={about.data.image.alt} />
                                        </div>
                                    </motion.div>
                                )}
                            </InView>
                        </div>
                    </div>
                    {
                        about.data.slices2.length > 0 ? <div className="slices">
                            <SliceZone
                                slices={about.data.slices2}
                                resolver={({ sliceName }) => Slices[sliceName]}
                            />
                        </div> : <></>
                    }
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

        const about = (await Client().getSingle("about", refOption)) || {}

        return {
            props: {
                about,
                previewRef
            }
        }
    } catch (e) {
        console.log(e)
        return {
            notFound: true
        }
    }
}

export default overOns