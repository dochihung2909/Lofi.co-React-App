import classNames from 'classnames/bind'
import { useContext, useEffect, useRef, useState } from 'react'

import DigitClock from '~/components/DigitClock'
import styles from './MenuHeader.module.scss'
import Toggle from '~/components/Button/Toggle'
import Range from '~/components/Range'
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
import { PlayVideoContext, ThemeContext, AudioContext } from '~/context'

const cx = classNames.bind(styles)

function MenuHeader() {
    const { isPlayed, togglePlay } = useContext(PlayVideoContext)
    const { toggleTheme } = useContext(ThemeContext)
    const { audioPlaying, setNextAudio, setPrevAudio } = useContext(AudioContext)

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

    // Handle music
    const audioRef = useRef(null)
    const [muted, setMuted] = useState(false)
    const [volumeAudio, setVolumeAudio] = useState({
        current: 0.5,
        prev: 0.5,
    })
    const [showVolume, setShowVolume] = useState(false)
    const [audioNow, setAudioNow] = useState({
        now: audioPlaying.music[0],
        prev: [],
    })

    useEffect(() => {
        audioRef.current.volume = volumeAudio.current
    }, [volumeAudio])

    // Play music when click
    const handlePlayMusic = () => {
        togglePlay()
        const audioElement = audioRef.current
        !isPlayed ? audioElement.play() : audioElement.pause()
        audioElement.volume = volumeAudio.current
    }

    // Mute when click muted btn
    const handleMuted = () => {
        const isMuted = !muted
        if (isMuted) {
            setVolumeAudio({
                ...volumeAudio,
                prev: volumeAudio.current,
                current: 0,
            })
        } else {
            setVolumeAudio({
                ...volumeAudio,
                current: volumeAudio.prev,
            })
        }
        setMuted(isMuted)
    }

    // Change volume value when drag range input
    const handleChangeVolume = (value) => {
        value = value / 100
        setVolumeAudio({
            ...volumeAudio,
            current: value,
        })
    }

    // Show volume when click
    const handleShowVolumeControl = () => {
        setShowVolume(!showVolume)
    }

    // Handle onblur event hide volume control
    const handleOnBlurVolumeControl = () => {
        setTimeout(handleShowVolumeControl, 3000)
    }

    // Change audio when click next
    const handleNext = () => {
        const randNum = Math.floor(Math.random() * (audioPlaying.music.length - 1))
        setAudioNow({
            ...audioNow,
            prev: [...audioNow.prev, audioNow.now],
            now: audioPlaying.music[randNum],
        })
        setNextAudio()
    }

    // Change audio when click prev
    const handlePrev = () => {
        if (audioNow.prev.length === 0) {
            handleNext()
            return
        }

        setAudioNow({
            ...audioNow,
            now: audioNow.prev[audioNow.prev.length - 1],
            prev: audioNow.prev.slice(0, audioNow.prev.length - 1),
        })
        setPrevAudio()
    }

    useEffect(() => {
        const audioElement = audioRef.current
        audioElement.src = audioNow.now
        if (audioElement.hasAttribute('autoplay')) {
            audioElement.removeAttribute('autoplay')
        }
        if (isPlayed) {
            audioElement.setAttribute('autoplay', true)
        }

        console.log(audioNow)
    }, [audioNow, isPlayed])

    return (
        <>
            <div className={cx('wrapper')}>
                <DigitClock />
                <Toggle
                    onClick={toggleTheme}
                    leftIcon={<DayIcon></DayIcon>}
                    rightIcon={<NightIcon></NightIcon>}
                ></Toggle>
                <div className={cx('controller', { showVolume: showVolume })}>
                    <Button onClick={handlePrev} icon={<PrevIcon />}></Button>
                    <Button onClick={handlePlayMusic} icon={!isPlayed ? <PlayIcon /> : <PauseIcon />}></Button>
                    <Button onClick={handleNext} icon={<NextIcon />}></Button>
                    <Button onClick={handleShowVolumeControl} icon={<VolumeIcon />}></Button>
                    <Range
                        onBlur={handleOnBlurVolumeControl}
                        show={showVolume}
                        onChange={handleChangeVolume}
                        value={volumeAudio.current * 100}
                    ></Range>
                </div>
                <Button onClick={handleMuted} className={cx({ muted: muted })} icon={<VolumeMutedIcon />}></Button>
                <Button onClick={handleFullScreen} icon={<FullScreenIcon />}></Button>
                <Button icon={<MenuIcon />}></Button>
            </div>
            <audio onEnded={handleNext} src={audioNow.now} ref={audioRef} preload="auto">
                <source src={audioNow.now} type="audio/mpeg"></source>
            </audio>
        </>
    )
}

export default MenuHeader
