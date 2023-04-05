import classNames from 'classnames/bind'
import Button from '../Button'
import styles from './GroupBox.module.scss'

const cx = classNames.bind(styles)

function GroupBox({
    onClick,
    noPadding,
    className,
    title,
    icon,
    onClose,
    children,
    height = 'auto',
    width = 'auto',
    noOpacityIcon,
    tooltip,
    arrow,
    placement,
    interactive,
}) {
    return (
        <div
            onClick={onClick}
            style={{ height, width }}
            className={cx('wrapper', {
                [className]: className,
                noPadding,
            })}
        >
            <div className={cx('header')}>
                {title && <h4 className={cx('title')}>{title}</h4>}
                {icon && (
                    <Button
                        titleTippy={tooltip}
                        placement={placement}
                        interactive={interactive}
                        arrow={arrow}
                        width={'auto'}
                        height={'100%'}
                        icon={<img src={icon} alt="icon" />}
                        className={cx('icon-btn', { noOpacityIcon })}
                        onClick={onClose}
                    ></Button>
                )}
            </div>
            <div className={cx('content')}>{children}</div>
        </div>
    )
}

export default GroupBox
