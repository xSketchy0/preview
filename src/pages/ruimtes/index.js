import HeadTitle from "../../components/Utilities/HeadTitle"
import { motion, useAnimation } from "framer-motion"
import { page } from "../../components/Utilities/transitionHelpers"
import { Client } from "../../utils/prismicHelpers"
import Prismic from '@prismicio/client'
import Image from "next/image"
import { useRef, useEffect } from "react"
import { isFirefox } from "react-device-detect"
import React from "react"
import Link from "next/link"
import Footer from "../../components/Footer"
import { RichText } from "prismic-reactjs"

const MyImage = React.forwardRef(({ onClick, href, image }, ref) => {
    return (
        <a className="ruimtes__item-image" href={href} onClick={onClick} ref={ref}>
            <Image src={image.url} layout="fill" objectFit="cover" objectPosition="center" alt={image.alt} />
        </a>
    )
})

const Ruimtes = ({ ruimtes }) => {
    const list = ruimtes.results

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
                direction: 'horizontal'
            })
        })

        return () => {
            scroll.destroy()
        }
    })

    // const overlayControls = useAnimation()
    // const titleControls = useAnimation()

    return (
        <>
            <HeadTitle title="Ruimtes" />
            <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={page.fadeIn}
                className="ruimtes"
            >
                <div className="ruimtes__scroll">
                    <div className="ruimtes__wrap" ref={scrollRef}>
                        <div className="ruimtes__wrapper">
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
                            <div className="ruimtes__between">
                                <span  data-scroll data-scroll-speed=".5">WERK</span>
                                <span  data-scroll data-scroll-speed="-1">RUIMTES.</span>
                            </div>
                            {list.map((ruimte, i) => {
                                return ( 
                                    <motion.div 
                                        // onHoverStart={async () => {
                                        //     await overlayControls.start({opacity: 1})
                                        //     return await titleControls.start({y: 0, opacity: 1})
                                        // }} 
                                        // onHoverEnd={async () => {
                                        //     await titleControls.start({y: 50, opacity: 0})
                                        //     return await overlayControls.start({opacity: 0})
                                        // }}
                                        className="ruimtes__item" key={i}>
                                        <Link href={ruimte.data.redirectSocial ? ruimte.data.social : `/ruimtes/${ruimte.uid}`} scroll={false}>
                                            <MyImage image={ruimte.data.cover} />
                                        </Link>
                                        <Link href={ruimte.data.redirectSocial ? ruimte.data.social : `/ruimtes/${ruimte.uid}`} scroll={false}>
                                            <motion.div 
                                                // initial={{opacity: 0}}
                                                // animate={overlayControls}
                                                // transition={{ease: [0.6, 0.01, -0.05, 0.9], duration: 0.5,}}
                                                className="ruimtes__item-overlay"
                                            >
                                                <motion.span
                                                    // initial={{ opacity: 0, y: 50 }}
                                                    // animate={titleControls}
                                                    // transition={{ease: [0.6, 0.01, -0.05, 0.9], duration: 0.6,}}
                                                ><RichText render={ruimte.data.title} /></motion.span>
                                            </motion.div>
                                        </Link>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
               </div>
               <Footer />
            </motion.div>
        </>
    )
}

export const getStaticProps = async () => {
    try {
        const ruimtes = (await Client().query(Prismic.Predicates.at("document.type", "ruimtes")))

        return {
            props: {
                ruimtes
            }
        }
    } catch (e) {
        return {
            notFound: true
        }
    }
}

export default Ruimtes