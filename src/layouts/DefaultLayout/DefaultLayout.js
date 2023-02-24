import classNames from 'classnames/bind'
import { useState } from 'react'

import Header from '~/layouts/Header'
import Content from '~/layouts/Content'
import styles from './DefaultLayout.module.scss'
import { ThemeContext, PlayVideoContext } from '~/context'

const cx = classNames.bind(styles)

function DefaultLayout() {
    const [theme, setTheme] = useState(false)
    const [isPlayed, setIsPlayed] = useState(false)

    return (
        <ThemeContext.Provider
            value={{
                theme,
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
                <Header></Header>
                <div className={cx('wrapper')}>
                    <Content></Content>
                </div>
            </PlayVideoContext.Provider>
        </ThemeContext.Provider>
    )
}

export default DefaultLayout
