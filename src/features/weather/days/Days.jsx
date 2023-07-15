import { useMemo, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'

import { setDate, getDays } from '../weatherSlice'
import { getWeatherByWMO, getLocalDate } from '../../../utils'

import Message from '../../../components/message/Message'

import './days.scss'


export default function DaysList() {
    const dispatch = useDispatch()
    const daysRef = useRef([])
    const days = useSelector(getDays)

    function createListItems({timestamps, utcOffset, weathercodes}) {
        let listItems = []
        
        for(let i = 0; i < timestamps.length; i++) {    
            const [weathercode, timestamp] = [weathercodes[i], timestamps[i]],
                  {year, month, day} = getLocalDate(timestamp, utcOffset),
                  weather = getWeatherByWMO(weathercode)  
            
            listItems = listItems.concat(
                <motion.li 
                    initial={{ opacity: 0, scale: 1 }} 
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.1, delay: i/20 }}
                    key={timestamp} 
                    ref={node => {daysRef.current[i] = node}}
                    onClick={() => onDateChange([i, timestamp])}> 
                
                    <div className='days-list__content'>
                        <div>
                            <p>{`${year}-${month}-${day}`}</p>
                            <p>{weather.description}</p>
                        </div>
                        {weather.icon}
                    </div>
                    <div className='days-list__shadow'></div>
                </motion.li>
            )
        }
        
        return listItems
    }

    function onDateChange(date) {
        dispatch(setDate(date))
        daysRef.current.forEach((node, i) => {
            date[0] === i ? node.classList.add('active') : node.classList.remove('active')
        })
    }

    const listItems = useMemo(() => createListItems(days), [days])
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 1 }} 
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.1, delay: 0 }}
            className='days-list'>
            
            <Message>select desired date:</Message>
            <ul>
                {listItems}
            </ul>
        </motion.div>
    )
}