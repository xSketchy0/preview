import Instagram from "../../../public/svg/instagram.svg"
import Facebook from "../../../public/svg/facebook.svg"
import Vimeo from "../../../public/svg/vimeo.svg"
import Image from "next/image"

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer__wrapper">
                <span className="footer__title">Wees welkom!</span>
                <div className="footer__horizontal">
                    <div className="footer__address">
                        <span>Remmerdenplein 100</span>
                        <span>1106 AK Amsterdam</span>
                    </div>
                    <div className="footer__socials">
                        <a href="https://www.instagram.com/kazernereigersbos/?hl=en" target="_blank" rel="noreferrer">
                            <span><Instagram /></span>
                        </a>
                        <a href="https://www.facebook.com/kazernereigersbos/" target="_blank" rel="noreferrer">
                            <span><Facebook /></span>
                        </a>
                        <a href="#">
                            <span><Vimeo /></span>
                        </a>
                    </div>
                    <div className="footer__image">
                        <Image src="/images/LOGOWEBSITE-300x82.png" alt="Sponsors" width={300} height={82} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer