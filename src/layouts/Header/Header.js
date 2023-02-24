import classNames from 'classnames/bind'

import styles from './Header.module.scss'
import images from '~/assets/images'
import MenuHeader from '~/components/MenuHeader'

const cx = classNames.bind(styles)

function Header() {
    return (
        <nav className={cx('wrapper')}>
            <a href="/home" target="_blank">
                <img className={cx('logo')} src={images.logo} alt="Logo" />
            </a>
            <MenuHeader></MenuHeader>
        </nav>
    )
}

export default Header
