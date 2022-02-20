import React from 'react'
import { RichText } from 'prismic-reactjs'
import Image from "next/image"

const TextImage = ({ slice }) => (
    <section className={`textimage textimage--${slice.variation}`}>
        <div className='textimage__description'>
            <RichText render={slice.primary.description} />
        </div>
        <div className='textimage__image'>
            <div className='textimage__image-wrapper'>
                <Image src={slice.primary.image.url} layout="fill" objectFit='cover' objectPosition="center" />
            </div>
        </div>
    </section>
)

export default TextImage