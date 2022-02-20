import React from 'react'
import Image from 'next/image'

const FullImage = ({ slice }) => {
    let objectFit = slice.primary.objectFit
    if (objectFit == "Cover") {
        objectFit = "cover"
    }
    if (objectFit == "Contain") {
        objectFit = "contain"
    }
    if (objectFit == null) {
        objectFit = "cover"
    }

    const image = slice.primary.image
    return (
        <section className='image'>
            <Image data-scroll data-scroll-speed=".5" src={image.url} alt={image.alt} layout="fill" objectFit={objectFit} />
        </section>
    )
}

export default FullImage