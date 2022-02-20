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
        <a className="creatives__item-image" href={href} onClick={onClick} ref={ref}>
            <Image src={image.url} layout="fill" objectFit="cover" objectPosition="center" alt={image.alt} />
        </a>
    )
})

const Creatives = ({ creatives }) => {
    const list = creatives.results

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

    const overlayControls = useAnimation()
    const titleControls = useAnimation()

    return (
        <>
            <HeadTitle title="Creatives"/>
            <motion.div 
                initial="initial"
                animate="animate"
                exit="exit"
                variants={page.fadeIn}
                className="creatives"
            >
                <div className="creatives__scroll">
                    <div className="creatives__wrap" ref={scrollRef}>
                        <div className="creatives__wrapper">
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
                            {list.map((creative, i) => {
                                if (i == 0) {
                                    return (
                                        <React.Fragment key={i}>
                                            <div className="creatives__item" key={i}>
                                                <Link href={creative.data.redirectSocial ? creative.data.social : `/creatives/${creative.uid}`} scroll={false}>
                                                    <MyImage image={creative.data.image} />
                                                </Link>
                                                {creative.data.overlay &&  
                                                    <Link href={creative.data.redirectSocial ? creative.data.social : `/creatives/${creative.uid}`} scroll={false}>
                                                        <div 
                                                            className="creatives__item-overlay"
                                                        >
                                                            <span><RichText render={creative.data.title} /></span>
                                                        </div>
                                                    </Link>
                                                }
                                            </div>
                                            <div className="creatives__between">
                                                <span  data-scroll data-scroll-speed=".5">VOOR DE BUURT,</span>
                                                <span  data-scroll data-scroll-speed="-1">DOOR DE BUURT.</span>
                                            </div>
                                        </React.Fragment>
                                    )
                                }

                                return ( 
                                    <div className="creatives__item" key={i}>
                                        <Link href={creative.data.redirectSocial ? creative.data.social : `/creatives/${creative.uid}`} scroll={false}>
                                            <MyImage image={creative.data.image} />
                                        </Link>
                                       {creative.data.overlay &&  
                                            <Link href={creative.data.redirectSocial ? creative.data.social : `/creatives/${creative.uid}`} scroll={false}>
                                                <div 
                                                    className="creatives__item-overlay"
                                                >
                                                    <span><RichText render={creative.data.title} /></span>
                                                </div>
                                            </Link>
                                        }
                                    </div>
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
        const creatives = (await Client().query(Prismic.Predicates.at("document.type", "creatives")))

        return {
            props: {
                creatives
            }
        }
    } catch (e) {
        return {
            notFound: true
        }
    }
}

export default Creatives