import { Client } from "../utils/prismicHelpers"
import useUpdatePreviewRef from "../utils/useUpdatePreviewRef"
import { useRef, useEffect } from "react"
import { isFirefox } from "react-device-detect"
import { useRouter } from "next/router"
import { motion } from "framer-motion"
import { page } from "../components/Utilities/transitionHelpers"
import SliceZone from 'next-slicezone';
import * as Slices from '../../slices'
import _ from "lodash"
import Footer from "../components/Footer"
import HeadTitle from "../components/Utilities/HeadTitle"

const Contact = ({ contact, previewRef }) => {
    const router = useRouter()
    if (router.isFallback) {
        return <Loader />
    }

    if (!contact.id) {
        return <Custom404 />
    }

    useUpdatePreviewRef(previewRef, contact.id)

    if (contact && contact.data) {
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

        const contacts = _.chain(contact.data.item)
        .groupBy('veld')
        .map((contacts, veld) => ({ contacts, veld }))
        .value();

        return (
            <>
                <HeadTitle title="Contact" />
                <motion.div
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={page.fadeIn}
                    ref={scrollRef}
                    className="contact"
                >
                    { contact.data.slices1.length > 0 ?
                        <div className="slices">
                            <SliceZone
                                slices={contact.data.slices1}
                                resolver={({ sliceName }) => Slices[sliceName]}
                            />
                        </div>
                        :
                        <></>
                    }
                    <div className="contact__hero">
                        <div className="contact__hero-forms">
                            <div className="contact__hero-circle"></div>
                            <div className="contact__hero-circle"></div>
                        </div>
                        <div className="contact__hero-text">
                            {contacts.map((contact, i) => {
                                return (
                                    <div className="contact__veld" key={contact.veld}>
                                        <span className="contact__title">{contact.veld}</span>
                                        {contact.contacts.map((item, i) => {
                                            return (
                                                <div className="contact__content" key={i}>
                                                    <span className="contact__naam">{item.naam}</span>
                                                    <span className="contact__email">{item.email}</span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    { contact.data.slices.length > 0 ?
                        <div className="slices">
                            <SliceZone
                                slices={contact.data.slices}
                                resolver={({ sliceName }) => Slices[sliceName]}
                            />
                        </div>
                        :
                        <></>
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

        const contact = (await Client().getSingle("contact", refOption)) || {}

        return {
            props: {
                contact,
                previewRef
            }
        }
    } catch (e) {
        return {
            notFound: true
        }
    }
}

export default Contact