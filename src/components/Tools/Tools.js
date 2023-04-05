import classNames from 'classnames/bind'
import Button from '../Button'
import styles from './Tools.module.scss'
import { MenuNotesToolIcon, MenuYoutubeToolIcon, MenuTimerToolIcon } from '~/components/Icons'

const cx = classNames.bind(styles)

function Tools({ onShowYtURL, show }) {
    return (
        <div className={cx('wrapper', { show: show === true })}>
            <Button
                width={'42px'}
                height={'52px'}
                onClick={onShowYtURL}
                toolBtn
                className={cx('sub-tool-btn')}
                titleTippy="Youtube"
                placement="left"
                arrow={false}
            >
                <MenuYoutubeToolIcon></MenuYoutubeToolIcon>
            </Button>
            <Button
                width={'42px'}
                height={'52px'}
                toolBtn
                className={cx('sub-tool-btn')}
                titleTippy="Timer"
                placement="left"
                arrow={false}
            >
                <MenuTimerToolIcon></MenuTimerToolIcon>
            </Button>
            <Button
                width={'42px'}
                height={'52px'}
                toolBtn
                className={cx('sub-tool-btn')}
                titleTippy="Notes"
                placement="left"
                arrow={false}
            >
                <MenuNotesToolIcon></MenuNotesToolIcon>
            </Button>
        </div>
    )
}

export default Tools
