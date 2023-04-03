import Draggable from 'react-draggable'
import classNames from 'classnames/bind'
import styles from './Mixer.module.scss'
import GroupBox from '../GroupBox/GroupBox'
import { SleepyIcon } from '~/components/Icons'
import { useState } from 'react'

const cx = classNames.bind(styles)

const musicStyles = [
    {
        id: 1,
        icon: SleepyIcon,
        title: 'Sleepy',
    },
    {
        id: 2,
        icon: SleepyIcon,
        title: 'Jazzy',
    },
    {
        id: 3,
        icon: SleepyIcon,
        title: 'Chill',
    },
]

function Mixer({ onClose }) {
    const [selected, setSeleted] = useState(1)

    const handleChangeStyleMusic = (id) => {
        console.log(id)
        setSeleted(id)
    }

    return (
        <Draggable defaultClassName={cx('mixer-drag')} bounds="body" defaultPosition={{ x: 500, y: -600 }}>
            <div>
                <div className={cx('wrapper')}>
                    <div className={cx('header')}>
                        <button onClick={onClose} className={cx('close-btn')}>
                            <img src="https://app.lofi.co/icons/new/mixer-close-icon.svg" alt="close mixer" />
                        </button>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('content-header')}>
                            <GroupBox title="Music" icon="https://app.lofi.co/icons/custom-playlist.svg">
                                <div className={cx('music-btn-wrapper')}>
                                    {musicStyles.map((musicStyle) => {
                                        const Icon = musicStyle.icon
                                        return (
                                            <button
                                                key={musicStyle.id}
                                                onClick={() => handleChangeStyleMusic(musicStyle.id)}
                                                className={cx('music-btn')}
                                            >
                                                <div
                                                    className={cx('btn-icon-wrapper', {
                                                        selected: selected === musicStyle.id,
                                                    })}
                                                >
                                                    <Icon className={cx('btn-icon')}></Icon>
                                                </div>
                                                <h5 className={cx('btn-title')}>{musicStyle.title}</h5>
                                            </button>
                                        )
                                    })}
                                </div>
                            </GroupBox>
                            <div className={cx('publisher')}>
                                <GroupBox>
                                    <div className={cx('publisher-wrapper')}>
                                        <img
                                            className={cx('publisher-avt')}
                                            src="https://app.lofi.co/icons/lofi-logo.png"
                                            alt="logo"
                                        />
                                        <h5 className={cx('publisher-name')}>lofi.co</h5>
                                    </div>
                                </GroupBox>
                                <GroupBox className={cx('actived')}>
                                    <div className={cx('publisher-wrapper')}>
                                        <img
                                            className={cx('publisher-avt')}
                                            src="https://app.lofi.co/icons/controls/spotify-player.svg"
                                            alt="spotify"
                                        />
                                        <h5 className={cx('publisher-name')}>Spotify</h5>
                                    </div>
                                </GroupBox>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Draggable>
    )
}

export default Mixer
