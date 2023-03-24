import { useContext, useEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind'
import Draggable from 'react-draggable'
import { Resizable, ResizableBox } from 'react-resizable'

import Button from '../Button'
import styles from './LateralMenu.module.scss'
import { WidgetsToolIcon, ScencesToolIcon, TemplateToolIcon, MixerToolIcon } from '~/components/Icons'
import Tools from '~/components/Tools'
import Modal from '~/components/Modal'
import Scene from '~/components/Scene'
import videos from '~/assets/videos'
import { ThemeContext } from '~/context'

const cx = classNames.bind(styles)

const regexYTLink = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/

// fetch data scene
const scenes = [
    {
        id: 1,
        bgTheme: 'book_cape',
        sceneThumb: 'https://app.lofi.co/static/media/book-cafe-preview.2fafe972d1a37ef69971.png',
        sceneNumber: 2,
        variations: 8,
        subScenes: [
            {
                id: 1.1,
                bgTheme: 'inside',
                sceneThumb: 'https://app.lofi.co/static/media/book_cafe_preview_in.cf06fd4a92871f248f72.png',
            },
            {
                id: 1.2,
                bgTheme: 'outside',
                sceneThumb: 'https://app.lofi.co/static/media/book_cafe_preview_out.aeae5beef7737b9ae88e.png',
            },
        ],
    },
    {
        id: 2,
        bgTheme: 'seoul',
        sceneThumb: 'https://app.lofi.co/static/media/seoul-preview.a738101f2d750652dfe9.png',
        sceneNumber: 2,
        variations: 8,
        subScenes: [
            {
                id: 1.1,
                bgTheme: 'inside',
                sceneThumb: 'https://app.lofi.co/static/media/seoul-inside.22f8dd0800042e313ae8.png',
            },
            {
                id: 1.2,
                bgTheme: 'outside',
                sceneThumb: 'https://app.lofi.co/static/media/seoul-preview.a738101f2d750652dfe9.png',
            },
        ],
    },
    {
        id: 3,
        bgTheme: 'slow_down',
        sceneThumb: 'https://app.lofi.co/static/media/slow-garden-preview.b614a2c2c69b26fb7e0c.png',
        sceneNumber: 1,
        variations: 2,
        subScenes: [
            {
                id: 3.1,
                sceneThumb: 'https://app.lofi.co/static/media/slow-garden.0220e772a25570cc0099.png',
            },
        ],
    },
    {
        id: 4,
        bgTheme: 'noise',
        sceneThumb: 'https://app.lofi.co/static/media/noise-preview.c9275832c16b80c97c29.png',
        sceneNumber: 3,
        variations: 3,
        subScenes: [
            {
                id: 1.1,
                bgTheme: 'noise1',
                sceneThumb: 'https://app.lofi.co/static/media/seoul-preview.a738101f2d750652dfe9.png',
            },
            {
                id: 1.2,
                bgTheme: 'noise2',
                sceneThumb: 'https://app.lofi.co/static/media/seoul-preview.a738101f2d750652dfe9.png',
            },
        ],
    },
    {
        id: 5,
        bgTheme: 'future',
        sceneThumb: 'https://app.lofi.co/static/media/future-preview.ff51450e5a063e62b157.png',
        sceneNumber: 2,
        variations: 6,
        subScenes: [
            {
                id: 5.1,
                bgTheme: 'future1',
                sceneThumb: 'https://app.lofi.co/static/media/seoul-preview.a738101f2d750652dfe9.png',
            },
            {
                id: 5.2,
                bgTheme: 'future2',
                sceneThumb: 'https://app.lofi.co/static/media/seoul-preview.a738101f2d750652dfe9.png',
            },
        ],
    },
    {
        id: 6,
        bgTheme: 'backseat',
        sceneThumb: 'https://app.lofi.co/static/media/backseat-preview.68c95df14c33eec1bb84.png',
        sceneNumber: 1,
        variations: 2,
        subScenes: [
            {
                id: 6.1,
                bgTheme: 'inside',
                sceneThumb: 'https://app.lofi.co/static/media/seoul-preview.a738101f2d750652dfe9.png',
            },
        ],
    },
    {
        id: 7,
        bgTheme: 'chill_vibe',
        sceneThumb: 'https://app.lofi.co/static/media/chill.6d5d8ab2260cceaa865d.png',
        sceneNumber: 2,
        variations: 8,
        subScenes: [],
    },
]

function LateralMenu() {
    const { changeBgTheme } = useContext(ThemeContext)
    const [showTools, setShowTools] = useState(false)
    const [showScenes, setShowScenes] = useState(false)
    const [activeScene, setActiveScene] = useState(1)
    const [history, setHistory] = useState([scenes])
    const [showYTURL, setShowYTURL] = useState(false)
    const [ytUrl, setYTURL] = useState('')
    const [isResize, setIsResize] = useState(false)

    // Ref
    const modalRef = useRef(null)
    const sceneRef = useRef(null)
    const dragedRef = useRef(null)

    const current = history[history.length - 1]

    const handleShowToolBar = () => {
        setShowTools(!showTools)
    }

    const handleShowScenes = () => {
        setShowScenes(!showScenes)
        resetScene()
    }

    const handleSelectTheme = (id, bgTheme) => {
        let subS = scenes[id - 1]?.subScenes
        let isChildren = !subS
        if (subS?.length > 0) {
            setHistory((prev) => [...prev, subS])
        }
        if (!isChildren) {
            setActiveScene(id)
            changeBgTheme(!videos[bgTheme]?.inside ? videos[bgTheme] : videos[bgTheme].inside)
        } else {
            changeBgTheme(videos[scenes[activeScene - 1]?.bgTheme][bgTheme])
        }
    }

    useEffect(() => {
        let myTimeout
        if (modalRef.current) {
            myTimeout = setTimeout(() => {
                modalRef.current.style.opacity = 1
            }, 0)
        }

        return () => {
            clearTimeout(myTimeout)
        }
    }, [showScenes])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                if (!sceneRef.current.contains(event.target)) {
                    setShowScenes(false)
                }
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [modalRef])

    const resetScene = () => {
        if (history.length > 1) {
            setHistory(history.slice(0, history.length - 1))
        }
    }

    const renderItems = () => {
        return current.map((scene) => (
            <Scene
                onClick={() => handleSelectTheme(scene.id, scene.bgTheme)}
                active={activeScene === scene.id}
                key={scene.id}
                sceneThumb={scene.sceneThumb}
                scenes={scene.sceneNumber}
                variations={scene.variations}
            ></Scene>
        ))
    }

    const handleShowYTURL = () => {
        setShowYTURL(!showYTURL)
    }

    const handleCloseYTDrag = () => {
        setShowYTURL(false)
        setYTURL('')
    }

    const handleSubmitYTURL = (e) => {
        e.preventDefault()
        let str = e.target.url.value
        if (regexYTLink.test(str)) {
            setYTURL('https://www.youtube.com/embed/' + str.match(regexYTLink)[1])
        }
    }

    const handleResize = (e, { node, size, handle }) => {
        setIsResize(true)
    }

    return (
        <>
            {showYTURL && (
                <Draggable
                    ref={dragedRef}
                    disabled={isResize}
                    defaultClassName={cx('youtube-url-drag')}
                    bounds="body"
                    defaultPosition={{ x: 500, y: -600 }}
                >
                    <div>
                        {!ytUrl ? (
                            <form onSubmit={handleSubmitYTURL} className={cx('youtube-url-input-wrapper')}>
                                <input
                                    name="url"
                                    className={cx('youtube-url-input')}
                                    type="text"
                                    placeholder="Enter Youtube video URL here: "
                                    spellCheck="false"
                                ></input>
                                <button type="submit"></button>
                                <button onClick={handleCloseYTDrag} className={cx('close-url-input-btn')}>
                                    <img src="https://app.lofi.co/icons/close-popup.svg" alt="close-btn" />
                                </button>
                            </form>
                        ) : (
                            <ResizableBox
                                className={cx('custom-box', 'box', 'yt-embedded-wrapper')}
                                width={400}
                                height={300}
                                handle={
                                    <button
                                        onMouseDownCapture={() => {
                                            setIsResize(true)
                                        }}
                                        className={cx('custom-handle', 'custom-handle-se')}
                                    >
                                        <img
                                            src="https://app.lofi.co/icons/new/corner-draghandle.svg"
                                            alt="resize-btn"
                                        ></img>
                                    </button>
                                }
                                handleSize={[8, 8]}
                                onResizeStop={() => setIsResize(false)}
                            >
                                <nav className={cx('yt-embedded-nav')}>
                                    <button onClick={() => setYTURL('')} className={cx('search-btn')}>
                                        <img src="https://app.lofi.co/icons/new/search.svg" alt="search-btn" />
                                    </button>
                                    <button onClick={handleCloseYTDrag} className={cx('close-btn')}>
                                        <img src="https://app.lofi.co/icons/close-popup.svg" alt="close-btn" />
                                    </button>
                                </nav>
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={ytUrl}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                ></iframe>
                            </ResizableBox>
                        )}
                    </div>
                </Draggable>
            )}

            <div className={cx('wrapper')}>
                {showScenes && (
                    <Modal
                        isSubItem={history.length > 1}
                        ref={modalRef}
                        title="Scenes"
                        className={cx('scene-modal', { active: showScenes })}
                        width={350}
                        height="auto"
                        onBack={resetScene}
                    >
                        <div className={cx('scene-container')}>{renderItems()}</div>
                    </Modal>
                )}
                <div className={cx('icon-wrapper')}>
                    <Button toolBtn titleTippy="Mixer" placement="left" arrow={false}>
                        <MixerToolIcon></MixerToolIcon>
                    </Button>
                    <Button toolBtn titleTippy="Templates" placement="left" arrow={false}>
                        <TemplateToolIcon></TemplateToolIcon>
                    </Button>
                    <Button
                        ref={sceneRef}
                        toolBtn
                        titleTippy="Scenes"
                        placement="left"
                        arrow={false}
                        onClick={handleShowScenes}
                    >
                        <ScencesToolIcon></ScencesToolIcon>
                    </Button>
                    <Button toolBtn onClick={handleShowToolBar} titleTippy="Tools" placement="left" arrow={false}>
                        <WidgetsToolIcon className={cx('tools-icon')}></WidgetsToolIcon>
                    </Button>
                    <Tools onShowYtURL={handleShowYTURL} show={showTools}></Tools>
                </div>
            </div>
        </>
    )
}

export default LateralMenu
