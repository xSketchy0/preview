import { motion } from "framer-motion"

const Split = ({ text, sentence, transition }) => {
    return (
        <div 
            className="split"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={sentence}
        >
            {text.split(" ").map((char, index) => {
                return (
                    <motion.div
                        key={char + "-" + index}
                        variants={transition}
                        className="split__char"
                    >
                        {char}
                    </motion.div>
                )
            })}
        </div>
    )
}

export default Split