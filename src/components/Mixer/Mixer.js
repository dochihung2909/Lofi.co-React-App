import Draggable from 'react-draggable'
import classNames from 'classnames/bind'
import styles from './Mixer.module.scss'
import GroupBox from '~/components/GroupBox'
import Range from '../Range'
import { SleepyIcon, JazzyIcon, ChillIcon } from '~/components/Icons'

import { useContext, useState } from 'react'
import { ControlsContext } from '~/context'
import { storage } from '~/config/firebase'

import { ref, listAll, getDownloadURL } from 'firebase/storage'

const cx = classNames.bind(styles)

const musicStyles = [
    {
        id: 1,
        icon: SleepyIcon,
        title: 'Sleepy',
    },
    {
        id: 2,
        icon: JazzyIcon,
        title: 'Jazzy',
    },
    {
        id: 3,
        icon: ChillIcon,
        title: 'Chill',
    },
]

const sounds = [
    {
        id: 1,
        title: 'City traffic',
        sound: 'https://app.lofi.co/static/media/city-active.d70df9fa9773589925d473060688536b.svg',
        icon: '',
    },
    {
        id: 2,
        title: 'City traffic',
        sound: 'file name',
        icon: '',
    },
    {
        id: 3,
        title: 'City traffic',
        sound: 'file name',
        icon: '',
    },
    {
        id: 4,
        title: 'City traffic',
        sound: 'file name',
        icon: '',
    },
    {
        id: 5,
        title: 'City traffic',
        sound: 'file name',
        icon: '',
    },
    {
        id: 6,
        title: 'City traffic',
        sound: 'https://app.lofi.co/static/media/city-active.d70df9fa9773589925d473060688536b.svg',
        icon: '',
    },
    {
        id: 7,
        title: 'City traffic',
        sound: 'file name',
        icon: '',
    },
    {
        id: 8,
        title: 'City traffic',
        sound: 'file name',
        icon: '',
    },
    {
        id: 9,
        title: 'City traffic',
        sound: 'file name',
        icon: '',
    },
    {
        id: 10,
        title: 'City traffic',
        sound: 'file name',
        icon: '',
    },
    {
        id: 11,
        title: 'City traffic',
        sound: 'https://app.lofi.co/static/media/city-active.d70df9fa9773589925d473060688536b.svg',
        icon: '',
    },
    {
        id: 12,
        title: 'City traffic',
        sound: 'file name',
        icon: '',
    },
    {
        id: 13,
        title: 'City traffic',
        sound: 'file name',
        icon: '',
    },
    {
        id: 14,
        title: 'City traffic',
        sound: 'file name',
        icon: '',
    },
    {
        id: 15,
        title: 'City traffic',
        sound: 'file name',
        icon: '',
    },
]

function Mixer({ onClose }) {
    const [selected, setSeleted] = useState(3)
    const [publisher, setPublisher] = useState(false)
    const { handleHide, controls, handleChangeVolume } = useContext(ControlsContext)

    // const [sounds, setSounds] = useState([])

    // const fetchSounds = async () => {
    //     const storageRef = await ref(storage, 'dataset')
    //     const result = await listAll(storageRef)

    //     const urlPromises = result.items.map((imageRef) => getDownloadURL(imageRef))

    //     return Promise.all(urlPromises)
    // }

    // const loadImages = async () => {
    //     const _urls = await fetchSounds()
    //     console.log(_urls)
    //     setSounds(_urls)
    // }

    // loadImages()

    const handleChangeStyleMusic = (id) => {
        setSeleted(id)
    }

    const handleChangePublisher = (value) => {
        if (value !== publisher) {
            handleHide(value)
            setPublisher(value)
        }
    }

    return (
        <Draggable
            handle="strong"
            defaultClassName={cx('mixer-drag')}
            bounds="body"
            defaultPosition={{ x: 500, y: -600 }}
        >
            <div>
                <div className={cx('wrapper')}>
                    <strong>
                        <div className={cx('header')}>
                            <button onClick={onClose} className={cx('close-btn')}>
                                <img src="https://app.lofi.co/icons/new/mixer-close-icon.svg" alt="close mixer" />
                            </button>
                        </div>
                    </strong>
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
                                <GroupBox
                                    onClick={() => handleChangePublisher(false)}
                                    noPadding
                                    className={cx({ active: !publisher })}
                                >
                                    <div className={cx('publisher-wrapper')}>
                                        <img
                                            className={cx('publisher-avt')}
                                            src="https://app.lofi.co/icons/lofi-logo.png"
                                            alt="logo"
                                        />
                                        <h5 className={cx('publisher-name')}>lofi.co</h5>
                                    </div>
                                </GroupBox>
                                <GroupBox
                                    onClick={() => handleChangePublisher(true)}
                                    noPadding
                                    className={cx({ active: publisher })}
                                >
                                    <div className={cx('publisher-wrapper')}>
                                        <img
                                            className={cx('publisher-avt')}
                                            src="https://app.lofi.co/icons/controls/spotify-player-active.svg"
                                            alt="spotify"
                                        />
                                        <h5 className={cx('publisher-name')}>Spotify</h5>
                                    </div>
                                </GroupBox>
                            </div>
                        </div>

                        {publisher && (
                            <div className={cx('spotify-embed')}>
                                <iframe
                                    style={{
                                        borderRadius: '12px',
                                    }}
                                    src="https://open.spotify.com/embed/playlist/4dJSLiR8n2ZQUccpyXYKvE?utm_source=generator"
                                    width="100%"
                                    height="152"
                                    frameBorder="0"
                                    allowfullscreen
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                    loading="lazy"
                                    title="spotify-embed"
                                ></iframe>
                            </div>
                        )}

                        {/* Controls Volume */}
                        {!controls.isHide && (
                            <GroupBox title={'music volume'}>
                                <div className={cx('volume-wrapper')}>
                                    <span>
                                        <img
                                            src="https://app.lofi.co/icons/controls/volume-down.svg"
                                            alt="volume-icon"
                                        />
                                    </span>
                                    <Range
                                        noAbsolute
                                        show
                                        value={controls.volume.current * 100}
                                        onChange={handleChangeVolume}
                                        className={cx('volume-controls')}
                                    />
                                    <span>
                                        <img src="https://app.lofi.co/icons/controls/volume-up.svg" alt="volume-icon" />
                                    </span>
                                </div>
                            </GroupBox>
                        )}

                        {/* Sounds */}

                        <GroupBox
                            noOpacityIcon
                            tooltip={
                                "Mix mode let's you mix all the sounds in the catalog instead of only ones in the scene you are using. When active, sounds will not stop playing if you chang the scene"
                            }
                            arrow={true}
                            placement="bottom-start"
                            title={
                                <>
                                    sound from{' '}
                                    <span
                                        style={{
                                            color: 'var(--primary-color)',
                                        }}
                                    >
                                        lofi cafè
                                    </span>
                                </>
                            }
                            icon={'https://app.lofi.co/icons/controls/mix-mode.svg'}
                            className={cx('sounds')}
                            height={'270px'}
                        >
                            {sounds.map((sound) => (
                                <div key={sound.id} className={cx('sound-wrapper')}>
                                    <h5 className={cx('sound-title')}>{sound.title}</h5>
                                    <Range
                                        icon={sound.icon}
                                        soundRange
                                        className={cx('sound-range-controls')}
                                        show
                                        noAbsolute
                                        value={50}
                                    ></Range>
                                </div>
                            ))}
                        </GroupBox>
                    </div>
                </div>
            </div>
        </Draggable>
    )
}

export default Mixer
