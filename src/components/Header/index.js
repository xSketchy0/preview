import { MenuAlt4Icon } from "@heroicons/react/outline"
import React, { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { motion } from "framer-motion"
import Logo from "../Logo"
import { menu } from "../Utilities/transitionHelpers"

const MyLogo = React.forwardRef(({ onClick, href}, ref) => {
    return (
        <a href={href} onClick={onClick} ref={ref} className="header__logo-wrapper">
            <Logo />
        </a>
    )
})

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()

    return (
        <>  
            <motion.div
                className="menu"
                initial={menu.fadeIn.closed}
                animate={isOpen ? "open" : "closed"}
                variants={menu.fadeIn}
            >
                <div className="menu__forms">
                    <span className="menu__circle"></span>
                    <span className="menu__circle"></span>
                </div>
                <div className="menu__wrapper">
                    <div className="menu__items">
                        <div 
                            className="menu__item" onClick={() => setIsOpen(isOpen => !isOpen)}>
                            <Link href="/" scroll={false} passHref>
                                <a className={router.pathname == "/" ? "active" : ""}>HOME</a>
                            </Link>  
                        </div>
                        <div 

                            className="menu__item" onClick={() => setIsOpen(isOpen => !isOpen)}>
                            <Link href="/over-ons" scroll={false}>
                                <a className={router.pathname == "/over-ons" ? "active" : ""}>OVER ONS</a>
                            </Link>
                        </div>
                        <div 
                            className="menu__item" onClick={() => setIsOpen(isOpen => !isOpen)}>
                            <Link href="/agenda" scroll={false}>
                                <a className={router.pathname == "/agenda" ? "active" : ""}>AGENDA</a>
                            </Link>
                        </div>
                        <div 
                            className="menu__item" onClick={() => setIsOpen(isOpen => !isOpen)}>
                            <Link href="/creatives" scroll={false}>
                                <a className={router.pathname == "/creatives" ? "active" : ""}>CREATIVES</a>
                            </Link> 
                        </div>
                        <div 
                            className="menu__item" onClick={() => setIsOpen(isOpen => !isOpen)}>
                            <Link href="/ruimtes" scroll={false}>
                                <a className={router.pathname == "/ruimtes" ? "active" : ""}>VERHUUR</a>
                            </Link> 
                        </div>
                        <div 
                            className="menu__item" onClick={() => setIsOpen(isOpen => !isOpen)}>
                            <Link href="/contact" scroll={false}>
                                <a className={router.pathname == "/contact" ? "active" : ""}>CONTACT</a>
                            </Link> 
                        </div>
                    </div>
                </div>
            </motion.div>
            <motion.div className="header">
                <div className="header__button">
                    <div 
                        className="header__button-wrapper" 
                        onClick={() => setIsOpen(isOpen => !isOpen)}
                    >
                        <MenuAlt4Icon strokeWidth="1" className="h-5 h-5"/>
                        <span className="header__button-text">MENU</span>
                    </div>
                </div>
                <div className="header__logo">
                    <Link href="/" passHref>
                        <MyLogo />
                    </Link>
                </div>
            </motion.div>
        </>
    )
}

export default Header

// import Image from "next/image"
// import Link from "next/link"
// import { BeakerIcon } from "@heroicons/react/outline";
// import { menu } from "../Utilities/MotionTransitions";
// import { useRouter } from "next/router";
// import React from "react";
// import { motion } from "framer-motion"
// import { useState } from "react";

// const MyLink = React.forwardRef(({ onClick, href }, ref) => {
//     return (
//         <a href={href} onClick={onClick} ref={ref} className="header__logo__wrapper">
//             <Image src="/svg/KZRN_LIGHT.svg" alt="Kazerne Reigersbos Logo" layout="fill" objectFit="contain" objectPosition="right" priority/>
//         </a>
//     )
// })

// const Header = () => {
//     const [isOpen, setIsOpen] = useState(false)
//     const router = useRouter()

//     return (
//         <>
//             <motion.div
//                 className="menu"
//                 animate={isOpen ? "open" : "closed"}
//                 variants={menu.toggle}
//             >
//                 <div className="menu__circles">
//                     <span className="menu__circle"></span>
//                     <span className="menu__circle"></span>
//                 </div>  
//                 <div className="menu__wrapper">
//                     <div className="menu__items">
//                         <div className="menu__item" onClick={() => setIsOpen(isOpen => !isOpen)}>
//                             <Link href="/" scroll={false} passHref>
//                                 <a className={router.pathname == "/" ? "active" : ""}>HOME</a>
//                             </Link>  
//                         </div>
//                         <div className="menu__item" onClick={() => setIsOpen(isOpen => !isOpen)}>
//                             <Link href="/over-ons" scroll={false}>
//                                 <a className={router.pathname == "/over-ons" ? "active" : ""}>OVER ONS</a>
//                             </Link>
//                         </div>
//                         <div className="menu__item" onClick={() => setIsOpen(isOpen => !isOpen)}>
//                             <Link href="/agenda" scroll={false}>
//                                 <a className={router.pathname == "/agenda" ? "active" : ""}>AGENDA</a>
//                             </Link>
//                         </div>
//                         <div className="menu__item" onClick={() => setIsOpen(isOpen => !isOpen)}>
//                             <Link href="/creatives" scroll={false}>
//                                 <a className={router.pathname == "/creatives" ? "active" : ""}>CREATIVES</a>
//                             </Link> 
//                         </div>
//                         <div className="menu__item" onClick={() => setIsOpen(isOpen => !isOpen)}>
//                             <Link href="/ruimtes" scroll={false}>
//                                 <a className={router.pathname == "/ruimtes" ? "active" : ""}>VERHUUR</a>
//                             </Link> 
//                         </div>
//                         <div className="menu__item" onClick={() => setIsOpen(isOpen => !isOpen)}>
//                         <Link href="/contact" scroll={false}>
//                                 <a className={router.pathname == "/contact" ? "active" : ""}>CONTACT</a>
//                             </Link> 
//                         </div>
//                     </div>
//                 </div>
//             </motion.div>
//             <motion.div className="header">
//                 <div className="header__button">
//                         <div className="header__button-wrapper" onClick={() => setIsOpen(isOpen => !isOpen)}>
//                             <Button className="header__button-btn" />
//                             <MenuAlt1Icon className="h-5 h-5" />
//                             MENU
//                         </div>
//                 </div>
//                 <div className="header__logo">
//                     <Link href="/" passHref>
//                         <MyLink />
//                     </Link>
//                 </div>
//             </motion.div>
//         </>
//     )
// }

// export default Header