import classNames from 'classnames/bind'
import { useEffect, useRef, useState } from 'react'

import Header from '~/layouts/Header'
import Content from '~/layouts/Content'
import styles from './DefaultLayout.module.scss'
import { ThemeContext, PlayVideoContext, AudioContext } from '~/context'
import LateralMenu from '~/components/LateralMenu'
import Bottom from '../Bottom'
import videos from '~/assets/videos'
import playList from '~/assets/musics'

const cx = classNames.bind(styles)

function DefaultLayout() {
    const [theme, setTheme] = useState(false)
    const [isPlayed, setIsPlayed] = useState(false)
    const [audioPlaying, setAudioPlaying] = useState(playList[0])
    const [prevAudioPlaying, setPrevAudioPlaying] = useState()
    const [bgTheme, setBgTheme] = useState({
        day: videos.seoul.inside.day,
        night: videos.seoul.inside.night,
        dayRainy: '',
        nightRainy: '',
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
            <PlayVideoContext.Provider
                value={{
                    isPlayed,
                    togglePlay() {
                        setIsPlayed((prev) => !prev)
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
            </PlayVideoContext.Provider>
        </ThemeContext.Provider>
    )
}

export default DefaultLayout
