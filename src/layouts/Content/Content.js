import classNames from 'classnames/bind'

import styles from './Content.module.scss'
import { useContext, useEffect, useRef } from 'react'
import { ThemeContext } from '~/context'

const cx = classNames.bind(styles)

function Content() {
    const { theme, bgTheme } = useContext(ThemeContext)

    return (
        <div className={cx('wrapper')}>
            <div className={cx('background-video', { active: !theme })}>
                <video src={bgTheme.day} loop preload="auto" autoPlay muted height="100%" width="100%"></video>
            </div>
            <div className={cx('default-background')}></div>
            <div className={cx('background-video', { active: theme })}>
                <video src={bgTheme.night} loop preload="auto" autoPlay muted height="100%" width="100%"></video>
            </div>
        </div>
    )
}

export default Content
