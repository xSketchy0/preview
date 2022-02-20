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

const Ruimte = ({ ruimte, previewRef }) => {
    const router = useRouter()
    if (router.isFallback) {
        return <Loader />
    }
    
    if (!ruimte.id) {
        return <Custom404 />
    }

    useUpdatePreviewRef(previewRef, ruimte.id)

    if (ruimte && ruimte.data) {
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
                <HeadTitle title={RichText.asText(ruimte.data.title)} />
                <motion.div
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={page.fadeIn}
                    ref={scrollRef}
                    className="ruimte"
                >
                    {
                        ruimte.data.title ?
                        <>
                        <style jsx global>{`
                            .ruimte {
                                color: ${ruimte.data.pageTextColor};
                                background: ${ruimte.data.pageBackgroundColor};
                            }
                        `}</style>
                        <div className="ruimte__title">
                            <RichText render={ruimte.data.title} />
                        </div></>  : <></>
                    }
                    {
                        ruimte.data.description ?
                        <>
                        <div className="ruimte__description">
                            <div className="ruimte__description-wrapper">
                                <RichText render={ruimte.data.description} />
                            </div>
                        </div></> : <></>
                    }
                    {
                        ruimte.data.slices.length > 0 ? <div className="slices">
                            <SliceZone
                                slices={ruimte.data.slices}
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
    const ruimtes = await queryRepeatableDocuments((doc) => doc.type === 'ruimtes')

    return {
        paths: ruimtes.map(ruimte => `/ruimtes/${ruimte.uid ? ruimte.uid : ruimte.slugs[0]}`),
        fallback: true
    }
}

export const getStaticProps = async ({ params, previewData }) => {
    try {
        const previewRef = previewData ? previewData.ref : null
        const refOption = previewRef ? { ref: previewRef } : null

        const ruimte = (await Client().getByUID("ruimtes", params.slug, refOption)) || {}

        return {
            props: {
                ruimte,
                previewRef
            }
        }
    } catch (e) {
        return {
            notFound: true
        }
    }
}

export default Ruimte