import Draggable from 'react-draggable'
import classNames from 'classnames/bind'
import styles from './Mixer.module.scss'
import GroupBox from '../GroupBox/GroupBox'

const cx = classNames.bind(styles)

function Mixer({ onClose }) {
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
                        <GroupBox title="Music" icon="https://app.lofi.co/icons/custom-playlist.svg">
                            <div className={cx('music-btn-wrapper')}>
                                <button className={cx('music-btn')}></button>
                                <button className={cx('music-btn')}></button>
                                <button className={cx('music-btn')}></button>
                            </div>
                        </GroupBox>
                    </div>
                </div>
            </div>
        </Draggable>
    )
}

export default Mixer
