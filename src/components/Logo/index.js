import Image from "next/image"

const Logo = () => {
    return (
        <Image src="/svg/KZRN_LIGHT.svg" alt="Logo" layout="fill" objectFit="contain" objectPosition="center" priority />
    )
}

export default Logo