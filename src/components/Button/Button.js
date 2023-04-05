import classNames from 'classnames/bind'
import styles from './Button.module.scss'

import { forwardRef, Fragment } from 'react'

import { Link } from 'react-router-dom'

import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
const cx = classNames.bind(styles)

const Button = forwardRef(
    (
        {
            width = '33px',
            height = '33px',
            titleTippy,
            toolBtn,
            placement,
            arrow,
            interactive,
            offset,
            children,
            className,
            border,
            onClick,
            icon,
            to,
            href,
            ...passProps
        },
        ref,
    ) => {
        let Comp = 'button'
        const props = {
            onClick,
            ...passProps,
        }
        if (to) {
            Comp = Link
            props.to = to
        } else if (href) {
            Comp = 'a'
            props.href = href
        }

        const classes = cx('wrapper', {
            [className]: className,
            'btn-border': border,
            'tool-btn': toolBtn,
        })

        const Wrapper = titleTippy ? Tippy : 'div'

        const tippyProps = {
            content: titleTippy,
            placement,
            arrow,
            offset,
            interactive,
        }

        return (
            <Wrapper style={{ display: 'flex' }} {...tippyProps}>
                <Comp
                    style={{
                        width: width,
                        height: height,
                    }}
                    ref={ref}
                    className={classes}
                    {...props}
                >
                    <span className={cx('icon')}>{icon}</span>
                    {children}
                </Comp>
            </Wrapper>
        )
    },
)
export default Button
