import classNames from 'classnames/bind'
import Button from '../Button'
import styles from './Tools.module.scss'
import { MenuNotesToolIcon, MenuYoutubeToolIcon, MenuTimerToolIcon } from '~/components/Icons'

const cx = classNames.bind(styles)

function Tools({ onShowYtURL, show }) {
    return (
        <div className={cx('wrapper', { show: show === true })}>
            <Button onClick={onShowYtURL} toolBtn className={cx('sub-tool-btn')}>
                <MenuYoutubeToolIcon></MenuYoutubeToolIcon>
            </Button>
            <Button toolBtn className={cx('sub-tool-btn')}>
                <MenuTimerToolIcon></MenuTimerToolIcon>
            </Button>
            <Button toolBtn className={cx('sub-tool-btn')}>
                <MenuNotesToolIcon></MenuNotesToolIcon>
            </Button>
        </div>
    )
}

export default Tools
