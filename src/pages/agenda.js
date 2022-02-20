import { useState } from "react"
import HeadTitle from "../components/Utilities/HeadTitle"
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import useSWR from "swr";
import { endOfDay, startOfDay, addWeeks } from "date-fns";
import Custom404 from "./404";
import { page } from "../components/Utilities/transitionHelpers";
import Loader from "../components/Loader";
import Calendar from "../components/Calendar";
import { isFirefox } from "react-device-detect";
import { useRef, useEffect } from "react";

const fetchWithData = (...args) => fetch(...args).then((res) => res.json())

const Agenda = () => {
    const [calendarData, setCalendarData] = useState([{
        startDate: startOfDay(new Date()),
        endDate: endOfDay(addWeeks(new Date(), 1)),
        key: 'selection',
        color: "#AD080F"
    }])

    const [isOpen, setIsOpen] = useState(false)
    
    const fetchWithData = (url, startDate, endDate) => fetch(`${url}?startDate=${startDate}&endDate=${endDate}`)
    .then((res) => res.json())

    const startData = calendarData[0].startDate.toString()
    const endData = endOfDay(calendarData[0].endDate).toString()

    const { data, error } = useSWR(['/api/calendar', startData, endData], fetchWithData)

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

    return (
        <>  
            <HeadTitle title="Agenda" />
            <motion.div 
                initial="initial"
                animate="animate"
                exit="exit"
                variants={page.fadeIn}
                className="agenda"
                ref={scrollRef}
            >
                <div className="agenda__header">
                    <div className="agenda__title">
                        <h1>Agenda</h1>
                    </div>
                    <div className="agenda__subtitle">
                        <span>Laatse evenementen.</span>
                    </div>
                </div>
                <div className="agenda__calendar">
                    {error ? <div className="agenda__error">Er is iets fout gegaan...</div> :
                        !data ? <div className="agenda__empty"><Loader /></div> : <Calendar list={data} />
                    }
                </div>
                <Footer />
            </motion.div>
        </>
    )
} 

export default Agenda