export const page = {
    fadeUp: {
        initial: {
            opacity: 0,
            y: 50
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.08,
                ease: [0.6, 0.01, -0.05, 0.9],
                duration: 1
            }
        },
        exit: {
            y: 50,
            opacity: 0,
            transition: {
                ease: [0.6, 0.01, -0.05, 0.9],
                duration: 1,
                staggerChildren: 0.02,
                staggerDirection: -1
            }
        }
    },
    fadeIn: {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                ease: [0.6, 0.01, -0.05, 0.9],
                duration: 1
            }
        },
        exit: {
            opacity: 0,
            transition: {
                ease: [0.6, 0.01, -0.05, 0.9],
                duration: 1,
                staggerChildren: 0.02,
                staggerDirection: -1
            }
        }
    }
}

export const letter = {
    fadeDown: {
        initial: {
            y: -50,
            opacity: 0
        },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                ease: [0.6, 0.01, -0.05, 0.9],
                duration: .5
            }
        },
        exit: {
            y: -50,
            opacity: 0,
            transition: {
                ease: [0.6, 0.01, -0.05, 0.9],
                duration: .5
            }
        }
    }
}

export const sentence = {
    fadeIn: {
        initial: {
            opacity: 0
        },
        animate: {
            opacity: 1,
            transition: {
                ease: [0.6, 0.01, -0.05, 0.9],
                duration: 0.6
            }
        },
        exit: {
            opacity: 0
        }
    }
}

export const menu = {
    fadeIn: {
        open: {
            opacity: 1,
            display: 'block',
            
            transition: {
                duration: 0.6,
                ease: [0.6, 0.01, -0.05, 0.9],
                staggerChildren: 0.05,
                delayChildren: 0.5
            }
        },
        closed: {
            opacity: 0,
            transition: {
                duration: 0.4,
                ease: [0.6, 0.01, -0.05, 0.9],
                staggerChildren: 0.05,
                delayChildren: 0.5
            },
            transitionEnd: {
                display: "none",
            },
        }
    }
}