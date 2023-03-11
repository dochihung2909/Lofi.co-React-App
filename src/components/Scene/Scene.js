import classNames from 'classnames/bind'
import Tippy from '@tippyjs/react'

import styles from './Scene.module.scss'
import { SceneIcon, VariationIcon } from '~/components/Icons'

const cx = classNames.bind(styles)

function Scene({ onClick, sceneThumb, scenes, variations, active }) {
    return (
        <div onClick={onClick} className={cx('wrapper')}>
            <img className={cx({ active: active })} src={sceneThumb} alt="scene thumb" />
            <Tippy
                placement="bottom"
                content={`${scenes} scenes ${variations} variations`}
                arrow={false}
                offset={[0, 6]}
            >
                <div className={cx('icon-scenes')}>
                    <SceneIcon />
                    {scenes}
                    <VariationIcon />
                    {variations}
                </div>
            </Tippy>
        </div>
    )
}

export default Scene
