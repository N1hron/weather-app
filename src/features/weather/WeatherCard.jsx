import { forwardRef } from 'react'
import { motion } from 'framer-motion'

const WeatherCard = forwardRef(function WeatherCard(props, ref) {
    const {className, children, title, subtitle, description, headerChild, animationDelay = 0} = props
    return (
        <article ref={ref} className={`weather-card${className && ' ' + className}`}>
            {
                children &&
                <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1, delay: animationDelay }}
                className='weather-card__content'>
                    <header className='weather-card__header'>
                        <div>
                            <h3>{title}</h3>
                            {subtitle && <span className='secondary-text'>{subtitle}</span>}
                        </div>
                        {description && <span className='secondary-text secondary-text_big'>{description}</span>}
                        {headerChild}
                    </header>
                    {children}
                </motion.div>
            }
        </article>
    )
})

const AnimatedWeatherCard = motion(WeatherCard)

export default AnimatedWeatherCard