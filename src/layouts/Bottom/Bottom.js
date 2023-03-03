import classNames from 'classnames/bind'
import styles from './Bottom.module.scss'

const cx = classNames.bind(styles)

function Bottom({ artist }) {
    return (
        <div className={cx('wrapper')}>
            Music by -
            {artist.includes('lofi.co') ? (
                'lofi.co 2021'
            ) : (
                <img src={artist} alt="Artist" className={cx('artist-thumb')} />
            )}
        </div>
    )
}

export default Bottom
