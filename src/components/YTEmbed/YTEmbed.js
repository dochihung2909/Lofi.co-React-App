import Draggable from 'react-draggable'
import classNames from 'classnames/bind'
import { ResizableBox } from 'react-resizable'
import styles from './YTEmbed.module.scss'
import { useState } from 'react'

const cx = classNames.bind(styles)

const regexYTLink = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/

function YTEmbed({ onClose }) {
    const [ytUrl, setYTURL] = useState('')
    const [isResize, setIsResize] = useState(false)

    const handleSubmitYTURL = (e) => {
        e.preventDefault()
        let str = e.target.url.value
        if (regexYTLink.test(str)) {
            setYTURL('https://www.youtube.com/embed/' + str.match(regexYTLink)[1])
        } else {
            e.target.url.value = ''
        }
    }

    return (
        <Draggable
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
                        <button onClick={onClose} className={cx('close-url-input-btn')}>
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
                                onMouseDownCapture={() => setIsResize(true)}
                                className={cx('custom-handle', 'custom-handle-se')}
                            >
                                <img src="https://app.lofi.co/icons/new/corner-draghandle.svg" alt="resize-btn"></img>
                            </button>
                        }
                        handleSize={[8, 8]}
                        onResizeStop={() => setIsResize(false)}
                    >
                        <nav className={cx('yt-embedded-nav')}>
                            <button onClick={() => setYTURL('')} className={cx('search-btn')}>
                                <img src="https://app.lofi.co/icons/new/search.svg" alt="search-btn" />
                            </button>
                            <button onClick={onClose} className={cx('close-btn')}>
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
    )
}

export default YTEmbed
