import classNames from 'classnames/bind'
import { forwardRef } from 'react'
import styles from './Modal.module.scss'

const cx = classNames.bind(styles)

const Modal = forwardRef(
    (
        {
            onBack,
            className,
            title,
            children,
            height = '30.9rem',
            width = '27.8rem',
            border,
            bRadius = '16px',
            isSubItem,
        },
        ref,
    ) => {
        return (
            <div
                ref={ref}
                style={{ height, width, borderRadius: bRadius }}
                className={cx('wrapper', { border: border, [className]: className })}
            >
                <div className={cx({ 'title-wrapper': isSubItem })}>
                    {isSubItem && (
                        <button onClick={onBack} className={cx('back-btn')}>
                            <img
                                src="https://app.lofi.co/static/media/arrow.d6cbebf6027a50ebb60c1498195be54d.svg"
                                alt="backBtn"
                            />
                        </button>
                    )}
                    {title && <h5 className={cx('title')}>{title}</h5>}
                </div>
                {children}
            </div>
        )
    },
)

export default Modal
