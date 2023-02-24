import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'

import styles from './DigitClock.module.scss'

const cx = classNames.bind(styles)

function DigitClock() {
    const [time, setTime] = useState({ hour: 0, minute: 0, time: 'AM' })

    const updateTime = () => {
        const time = new Date()

        let hour = time.getHours()
        if (hour > 12) {
            hour -= 12
        }

        setTime((prev) => ({
            ...prev,
            hour,
            minute: time.getMinutes(),
            time: time.getHours() >= 12 ? 'PM' : 'AM',
        }))
    }

    // Init time current
    useEffect(() => {
        console.log('Init time')
        updateTime()
        return () => {}
    }, [])

    // Update every minute
    useEffect(() => {
        const autoUpdateTimeInterval = setInterval(() => {
            console.log('updated')
            updateTime()
        }, 60000)

        return () => {
            clearInterval(autoUpdateTimeInterval)
        }
    }, [])

    return (
        <div className={cx('wrapper')}>
            <span>
                {time.hour < 10 ? `0${time.hour}` : time.hour}:{time.minute < 10 ? `0${time.minute}` : time.minute}{' '}
                {time.time}
            </span>
        </div>
    )
}

export default DigitClock
