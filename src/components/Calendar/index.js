import { format, parseISO } from "date-fns";
import parse, { domToReact } from 'html-react-parser';
import { nl } from "date-fns/locale";
import { motion } from "framer-motion";
import _ from "lodash"
import React from "react";
import { sentence } from "../Utilities/transitionHelpers";
import InView from "react-intersection-observer";

const Calendar = ({ list }) => {
    const events = list

    const dashArr = _.chain(events)
    .groupBy('location')
    .map((events, location) => ({ events, location}))
    .value();

    const arr = new Array()

    if (typeof(events) != "undefined") {
        try {
            events.forEach(event => {
                let str = event.start.dateTime
                arr.push(str.slice(0,10))
            });   
        } catch (error) {
            console.error(error)
        }
    }
    
    const daysArr = Array.from(new Set(arr))

    return (
        <div className="calendar">
            {dashArr.map((events, i) => {
                const arr = new Array();

                if (typeof(events.events) != "undefined") {
                    try {
                        events.events.forEach(event => {
                            let str = event.start.dateTime
                            arr.push(str.slice(0,10))
                        })
                    } catch (error) {
                        console.warn(error)
                    }
                }

                const daysArr = Array.from(new Set(arr))

                return (
                    <React.Fragment key={i}>
                        {events.location != "undefined" &&
                            <div className="calendar__heading">
                                <h2 
                                    data-scroll 
                                    data-scroll-speed="0.6"
                                    className="calendar__location"
                                >
                                    {events.location}.
                                </h2>
                            </div>
                        }
                        {daysArr.map((day) => {
                            let number = parseISO(day).getDate()

                            let name = format(parseISO(day), "eeee", { locale: nl })
                            
                            if (number.toString.length === 2) {
                                number = "0" + number;
                            }
            
            
                            let evs = new Array();
            
                            events.events.forEach(event => {
                                let str = event.start.dateTime
                                if (str.slice(0,10) == day) {
                                    evs.push(event)
                                }
                            });

                            return (
                                <InView threshold={0.25}>
                                    {({ref, inView}) => (
                                        <motion.div 
                                            className="calendar__row" 
                                            key={number}
                                            ref={ref}
                                            animate={
                                                inView ? sentence.fadeIn.animate : sentence.fadeIn.initial
                                            }
                                            variants={sentence.fadeIn}
                                        >
                                            <div className="calendar__data">
                                                <span className="calendar__day-name">{name}</span>
                                                <span className="calendar__day-number">{number}</span>
                                            </div>
                                            <div className="calendar__events">
                                                {evs.map((second, i) => 
                                                    <div className="calendar__event" key={i}>
                                                        <div className="calendar__wrapper">
                                                            <span className="calendar__event-summary">{second.summary}</span>
                                                            <span className="calendar__event-time">
                                                                <time>{format(parseISO(second.start.dateTime), 'HH:mm')}</time><time>-</time><time>{format(parseISO(second.end.dateTime), 'HH:mm')}</time>
                                                            </span>
                                                            <span className="calendar__event-location">{second.location}</span>
                                                            <span className="calendar__event-description">
                                                                {typeof second.description !== "undefined" ? parse(second.description) : ""}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </InView>
                            )
                        })}
                    </React.Fragment>
                )
            })}
        </div>
    )
}

export default Calendar