import { useEffect, forwardRef } from "react"
import { useDispatch } from "react-redux"
import { fetchLocations } from "./locationsSlice"

import './locationsList.scss';

function LocationsList(props, ref) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchLocations())
    }, [])

    return (
        <div ref={ref} className="locations">
            <ul className="locations__content">
            <li tabIndex={0} className="locations__item">Moscow, Russia</li>
            <li tabIndex={0} className="locations__item">London, England</li>
            <li tabIndex={0} className="locations__item">New York, USA</li>
            <li tabIndex={0} className="locations__item">Tokyo, Japan</li>
            <li tabIndex={0} className="locations__item">Moscow, Russia</li>
            <li tabIndex={0} className="locations__item">London, England</li>
            <li tabIndex={0} className="locations__item">New York, USA</li>
            <li tabIndex={0} className="locations__item">Tokyo, Japan</li>
            <li tabIndex={0} className="locations__item">Moscow, Russia</li>
            <li tabIndex={0} className="locations__item">London, England</li>
            <li tabIndex={0} className="locations__item">New York, USA</li>
            <li tabIndex={0} className="locations__item">Tokyo, Japan</li>
            <li tabIndex={0} className="locations__item">Moscow, Russia</li>
            <li tabIndex={0} className="locations__item">London, England</li>
            <li tabIndex={0} className="locations__item">New York, USA</li>
            <li tabIndex={0} className="locations__item">Tokyo, Japan</li>
        </ul>
        </div>
    )
}

export default forwardRef(LocationsList);
