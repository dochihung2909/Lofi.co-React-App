import classNames from 'classnames/bind'
import styles from './Modal.module.scss'

const cx = classNames.bind(styles)

function Modal({ className, title, children, height = '30.9rem', width = '27.8rem', border, bRadius = '16px' }) {
    return (
        <div
            style={{ height, width, borderRadius: bRadius }}
            className={cx('wrapper', { border: border, [className]: className })}
        >
            {title && <h5 className={cx('title')}>{title}</h5>}
            {children}
        </div>
    )
}

export default Modal
