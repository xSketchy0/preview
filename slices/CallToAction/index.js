import React from 'react'
import { RichText } from 'prismic-reactjs'


const CallToAction = ({ slice }) => {
    const justifyContent = () => {
        const justify = slice.primary.buttonAlign

        if (justify === 'Left') {
            return 'flex-start'
        }
        if (justify === 'Center') {
            return  'center'
        }
        if (justify === 'Right') {
            return 'flex-end'
        }
        return 'flex-start'
    }

    const textAlign = () => {
        const align = slice.primary.descriptionAlign

        if (align === 'Left') {
            return 'left'
        }
        if (align === 'Center') {
            return  'center'
        }
        if (align === 'Right') {
            return 'right'
        }
        return 'left'
    }

    return (
        <section className='calltoaction'>
            <div className='calltoaction__wrapper'>
                <div className='calltoaction__description'>
                    <RichText render={slice.primary.description}/>
                </div>
                <div className='calltoaction__button-wrapper'>
                    <a href={slice.primary.link}>
                        <div className='calltoaction__button'>
                            <span className='calltoaction__button-text'>
                                <RichText render={slice.primary.buttonText} />
                            </span>
                        </div>
                    </a>
                </div>
            </div>
            <style jsx>{`
                .calltoaction {
                    background: ${slice.primary.backgroundColor}
                }
                .calltoaction__description {
                    color: ${slice.primary.textColor}
                }
                .calltoaction__button {
                    background: ${slice.primary.buttonColor}
                }

                .calltoaction__button-text {
                    color: ${slice.primary.buttonTextColor}
                }
                
                .calltoaction__button-wrapper {
                    justify-content: ${justifyContent()}
                }

                .calltoaction__description {
                    text-align: ${textAlign()}
                }
            `}</style>
        </section>
    )
}


export default CallToAction

// (
//   <section>
//     <span className="title">
//       {
//         slice.primary.title ?
//         <RichText render={slice.primary.title}/>
//         : <h2>Template slice, update me!</h2>
//       }
//     </span>
//     {
//       slice.primary.description ?
//       <RichText render={slice.primary.description}/>
//       : <p>start by editing this slice from inside Prismic builder!</p>
//     }
//     <style jsx>{`
//         section {
//           max-width: 600px;
//           margin: 4em auto;
//           text-align: center;
//         }
//         .title {
//           color: #8592e0;
//         }
//     `}</style>
//   </section>