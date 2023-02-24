import classNames from 'classnames/bind'
import styles from './Button.module.scss'

const cx = classNames.bind(styles)

function Button({ children, border, onClick, icon, to, href, ...props }) {
    return (
        <button href={href} onClick={onClick} className={cx('wrapper', { 'btn-border': border })} {...props}>
            <span className={cx('icon')}>{icon}</span>
            {children}
        </button>
    )
}
export default Button
