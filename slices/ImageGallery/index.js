import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import InView from 'react-intersection-observer'
import { sentence } from '../../src/components/Utilities/transitionHelpers'

const ImageGallery = ({ slice }) => {
    return (
        <section 
            className='imagegallery'
        >
            { slice?.items?.map((item, i) => {
                return (
                    <InView threshold={0.25}>
                        {({ref, inView}) => (
                            <motion.div
                            ref={ref}
                            animate={
                                inView ? sentence.fadeIn.animate : sentence.fadeIn.initial
                            }
                            variants={sentence.fadeIn}
                            key={i} className='imagegallery__item'>
                                <Image data-scroll data-scroll-speed=".5" src={item.image.url} alt={item.image.alt} layout="fill" objectFit='cover'/>
                            </motion.div>
                        )}
                    </InView>
                )
            })}
        </section>

    )
}

export default ImageGallery