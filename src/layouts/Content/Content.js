import classNames from 'classnames/bind'

import styles from './Content.module.scss'
import videos from '~/assets/videos'
import { useContext } from 'react'
import { ThemeContext } from '~/context'

const cx = classNames.bind(styles)

function Content() {
    const { theme } = useContext(ThemeContext)

    return (
        <div className={cx('wrapper')}>
            <div className={cx('background-video', { active: !theme })}>
                <video src={videos.insideDay} loop preload="auto" autoPlay muted height="100%" width="100%"></video>
            </div>
            <div className={cx('background-video', { active: theme })}>
                <video src={videos.insideNight} loop preload="auto" autoPlay muted height="100%" width="100%"></video>
            </div>
        </div>
    )
}

export default Content
