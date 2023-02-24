import classNames from 'classnames/bind'

import styles from './Button.module.scss'

const cx = classNames.bind(styles)

function Toggle({ onClick, leftIcon, rightIcon }) {
    return (
        <div className={cx('switch-btn')}>
            <input onClick={onClick} id={cx('toggle')} type="checkbox" className={cx('switch-input')}></input>
            <label htmlFor={cx('toggle')} className={cx('switch-handle')}></label>
            <span className={cx('switch-icon')}>
                {leftIcon && <span>{leftIcon}</span>}
                {rightIcon && <span>{rightIcon}</span>}
            </span>
        </div>
    )
}

export default Toggle
