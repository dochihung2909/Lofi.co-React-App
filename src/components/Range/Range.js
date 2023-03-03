import classNames from 'classnames/bind'
import styles from './Range.module.scss'

const cx = classNames.bind(styles)

function Range({ show, onChange, value, className, ...propsObj }) {
    const classes = cx('wrapper', {
        [className]: className,
        show,
    })

    return (
        <div className={classes} {...propsObj}>
            <div className={cx('range-track')}>
                <div style={{ width: `${value}%` }} className={cx('track')}></div>
            </div>
            <input
                onChange={(e) => onChange(e.target.value)}
                className={cx('input-range')}
                type="range"
                name="start"
                min="0"
                max="100"
                value={value}
            />
        </div>
    )
}

export default Range
