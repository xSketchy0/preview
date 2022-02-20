import { useRouter } from "next/router"
import { Client } from "../../utils/prismicHelpers"
import { queryRepeatableDocuments } from "../../utils/queries"
import useUpdatePreviewRef from "../../utils/useUpdatePreviewRef"
import Custom404 from "../404"
import Loader from "../../components/Loader"
import HeadTitle from "../../components/Utilities/HeadTitle"
import { RichText } from "prismic-reactjs"
import { motion } from "framer-motion"
import { page } from "../../components/Utilities/transitionHelpers"
import { useEffect, useRef } from "react"
import { isFirefox } from "react-device-detect"
import Footer from "../../components/Footer"
import SliceZone from 'next-slicezone';
import * as Slices from '../../../slices'

const Creative = ({ creative, previewRef }) => {
    const router = useRouter()
    if (router.isFallback) {
        return <Loader />
    }
    
    if (!creative.id) {
        return <Custom404 />
    }

    useUpdatePreviewRef(previewRef, creative.id)

    if (creative && creative.data) {
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
                <HeadTitle title={RichText.asText(creative.data.title)} />
                <motion.div
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={page.fadeIn}
                    ref={scrollRef}
                    className="creative"
                >
                    {
                        creative.data.title ?
                        <>
                        <style jsx global>{`
                            .creative {
                                color: ${creative.data.pageTextColor};
                                background: ${creative.data.pageBackgroundColor};
                            }
                        `}</style>
                        <div className="creative__title">
                            <RichText render={creative.data.title} />
                        </div></>  : <></>
                    }
                    {
                        creative.data.description ?
                        <>
                        <div className="creative__description">
                            <div className="creative__description-wrapper">
                                <RichText render={creative.data.description} />
                            </div>
                        </div></> : <></>
                    }
                    {
                        creative.data.slices.length > 0 ? <div className="slices">
                            <SliceZone
                                slices={creative.data.slices}
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

export const getStaticPaths = async () => {
    const creatives = await queryRepeatableDocuments((doc) => doc.type === 'creatives')

    return {
        paths: creatives.map(creative => `/creatives/${creative.uid ? creative.uid : creative.slugs[0]}`),
        fallback: true
    }
}

export const getStaticProps = async ({ params, previewData }) => {
    try {
        const previewRef = previewData ? previewData.ref : null
        const refOption = previewRef ? { ref: previewRef } : null

        const creative = (await Client().getByUID("creatives", params.slug, refOption)) || {}

        return {
            props: {
                creative,
                previewRef
            }
        }
    } catch (e) {
        return {
            notFound: true
        }
    }
}

export default Creative