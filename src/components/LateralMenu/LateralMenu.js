import classNames from 'classnames/bind'
import Button from '../Button'
import styles from './LateralMenu.module.scss'
import { WidgetsToolIcon, ScencesToolIcon, TemplateToolIcon, MixerToolIcon } from '~/components/Icons'
import Tools from '~/components/Tools'
import { useState } from 'react'

const cx = classNames.bind(styles)

function LateralMenu() {
    const [showTools, setShowTools] = useState(false)

    const handleShowToolBar = () => {
        setShowTools(!showTools)
    }

    return (
        <div className={cx('wrapper')}>
            <Button toolBtn titleTippy="Mixer" placement="left" arrow={false}>
                <MixerToolIcon></MixerToolIcon>
            </Button>
            <Button toolBtn titleTippy="Templates" placement="left" arrow={false}>
                <TemplateToolIcon></TemplateToolIcon>
            </Button>
            <Button toolBtn titleTippy="Scenes" placement="left" arrow={false}>
                <ScencesToolIcon></ScencesToolIcon>
            </Button>
            <Button toolBtn onClick={handleShowToolBar} titleTippy="Tools" placement="left" arrow={false}>
                <WidgetsToolIcon className={cx('tools-icon')}></WidgetsToolIcon>
            </Button>
            <Tools show={showTools}></Tools>
        </div>
    )
}

export default LateralMenu
