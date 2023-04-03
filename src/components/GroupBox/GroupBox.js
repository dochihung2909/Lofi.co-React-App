import classNames from 'classnames/bind'
import styles from './GroupBox.module.scss'

const cx = classNames.bind(styles)

function GroupBox({ className, title, icon, onClick, children, height = 'auto', width = 'auto' }) {
    return (
        <div
            style={{ height, width }}
            className={cx('wrapper', {
                [className]: className,
            })}
        >
            <div className={cx('header')}>
                {title && <h4 className={cx('title')}>{title}</h4>}
                {icon && (
                    <button className={cx('icon-btn')} onClick={onClick}>
                        <img src={icon} alt="icon-btn" />
                    </button>
                )}
            </div>
            <div className={cx('content')}>{children}</div>
        </div>
    )
}

export default GroupBox
