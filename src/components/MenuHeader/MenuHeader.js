import classNames from 'classnames/bind'
import { useContext } from 'react'

import DigitClock from '~/components/DigitClock'
import styles from './MenuHeader.module.scss'
import Toggle from '~/components/Button/Toggle'
import {
    DayIcon,
    NightIcon,
    PrevIcon,
    PauseIcon,
    PlayIcon,
    NextIcon,
    VolumeIcon,
    VolumeMutedIcon,
    FullScreenIcon,
    MenuIcon,
} from '~/components/Icons'
import Button from '~/components/Button'
import { PlayVideoContext, ThemeContext } from '~/context'

const cx = classNames.bind(styles)

function MenuHeader() {
    const { isPlayed, togglePlay } = useContext(PlayVideoContext)
    const { toggleTheme } = useContext(ThemeContext)

    function toggleFullScreen(elem) {
        // ## The below if statement seems to work better ## if ((document.fullScreenElement && document.fullScreenElement !== null) || (document.msfullscreenElement && document.msfullscreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (
            (document.fullScreenElement !== undefined && document.fullScreenElement === null) ||
            (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) ||
            (document.mozFullScreen !== undefined && !document.mozFullScreen) ||
            (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)
        ) {
            if (elem.requestFullScreen) {
                elem.requestFullScreen()
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen()
            } else if (elem.webkitRequestFullScreen) {
                elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen()
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen()
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen()
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen()
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen()
            }
        }
    }

    const handleFullScreen = () => {
        toggleFullScreen(document.body)
    }

    console.log(isPlayed)

    return (
        <div className={cx('wrapper')}>
            <DigitClock />
            <Toggle onClick={toggleTheme} leftIcon={<DayIcon></DayIcon>} rightIcon={<NightIcon></NightIcon>}></Toggle>
            <div className={cx('controller')}>
                <Button icon={<PrevIcon />}></Button>
                <Button onClick={togglePlay} icon={!isPlayed ? <PlayIcon /> : <PauseIcon />}></Button>
                <Button icon={<NextIcon />}></Button>
                <Button icon={<VolumeIcon />}></Button>
            </div>
            <Button border icon={<VolumeMutedIcon />}></Button>
            <Button onClick={handleFullScreen} border icon={<FullScreenIcon />}></Button>
            <Button border icon={<MenuIcon />}></Button>
        </div>
    )
}

export default MenuHeader
