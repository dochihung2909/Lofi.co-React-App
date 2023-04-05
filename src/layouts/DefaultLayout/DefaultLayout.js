import classNames from 'classnames/bind'
import { useEffect, useRef, useState } from 'react'

import Header from '~/layouts/Header'
import Content from '~/layouts/Content'
import styles from './DefaultLayout.module.scss'
import { ThemeContext, AudioContext, ControlsContext } from '~/context'
import LateralMenu from '~/components/LateralMenu'
import Bottom from '../Bottom'
import videos from '~/assets/videos'
import playList from '~/assets/musics'

const cx = classNames.bind(styles)

function DefaultLayout() {
    const [theme, setTheme] = useState(false)
    const [audioPlaying, setAudioPlaying] = useState(playList[0])
    const [prevAudioPlaying, setPrevAudioPlaying] = useState()
    const [bgTheme, setBgTheme] = useState({
        day: videos.seoul.inside.day,
        night: videos.seoul.inside.night,
        dayRainy: '',
        nightRainy: '',
    })

    const [controls, setControls] = useState({
        isHide: false,
        isPlayed: false,
        volume: {
            current: 0.5,
            bfMuted: 0.5,
        },
        isMuted: false,
    })

    return (
        <ThemeContext.Provider
            value={{
                theme,
                bgTheme,
                changeBgTheme(newBg) {
                    setBgTheme((prev) => ({
                        ...prev,
                        ...newBg,
                    }))
                },
                toggleTheme() {
                    setTheme((prev) => !prev)
                },
            }}
        >
            <ControlsContext.Provider
                value={{
                    controls,
                    togglePlay() {
                        setControls((prev) => ({
                            ...prev,
                            isPlayed: !prev.isPlayed,
                        }))
                    },
                    setPlay(value) {
                        setControls((prev) => ({
                            ...prev,
                            isPlayed: value,
                        }))
                    },
                    handleChangeVolume(value) {
                        value = value / 100
                        setControls((prev) => ({
                            ...prev,
                            volume: {
                                ...prev.volume,
                                current: value,
                            },
                        }))
                    },
                    handleMuted() {
                        const isMuted = !controls.isMuted
                        if (isMuted) {
                            setControls((prev) => ({
                                ...prev,
                                volume: {
                                    bfMuted: prev.volume.current,
                                    current: 0,
                                },
                                isMuted: true,
                            }))
                        } else {
                            setControls((prev) => ({
                                ...prev,
                                volume: {
                                    ...prev.volume,
                                    current: prev.volume.bfMuted,
                                },
                                isMuted: false,
                            }))
                        }
                    },
                    handleHide(hide) {
                        setControls((prev) => ({
                            ...prev,
                            isHide: hide,
                        }))
                    },
                }}
            >
                <AudioContext.Provider
                    value={{
                        audioPlaying,
                        prevAudioPlaying,
                        setNextAudio() {
                            const randAudio = Math.floor(Math.random() * (playList.length - 1))
                            setAudioPlaying((prev) => {
                                setPrevAudioPlaying(prev)
                                return playList[randAudio]
                            })
                        },
                        setPrevAudio() {
                            setAudioPlaying(prevAudioPlaying)
                        },
                    }}
                >
                    <Header></Header>
                    <div className={cx('wrapper')}>
                        <Content></Content>
                        <LateralMenu></LateralMenu>
                    </div>
                    <Bottom artist={audioPlaying.artist}></Bottom>
                </AudioContext.Provider>
            </ControlsContext.Provider>
        </ThemeContext.Provider>
    )
}

export default DefaultLayout
