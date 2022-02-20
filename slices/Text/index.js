import React from 'react'
import { RichText } from 'prismic-reactjs'
import { motion } from 'framer-motion'
import InView from 'react-intersection-observer'
import { sentence } from '../../src/components/Utilities/transitionHelpers'

const Text = ({ slice }) => (
            <section
                className='text'
            >
                <InView threshold={0.25}>
                    {({ref, inView}) => (
                        <motion.div 
                            ref={ref}
                            animate={
                                inView ? sentence.fadeIn.animate : sentence.fadeIn.initial
                            }
                            variants={sentence.fadeIn}
                            className='text__wrapper' 
                            data-scroll 
                            data-scroll-speed="1"
                        >
                            <span className='text__title'>
                                <RichText render={slice.primary.title}/>
                            </span>
                            <span className='text__description'>
                                <RichText render={slice.primary.description}/>
                            </span>
                        </motion.div>
                    )}
                </InView>
                <style jsx global>{`
                    .text {
                        color: ${slice.primary.textColor};
                        background: ${slice.primary.backgroundColor};
                    }
                    .text__wrapper {
                        text-align: ${ slice.primary.align ? 'right' : 'left' };
                    }
                `}</style>
            </section>
)

export default Text