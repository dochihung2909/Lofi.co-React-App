import classNames from 'classnames/bind'
import Button from '../Button'
import styles from './LateralMenu.module.scss'
import { WidgetsToolIcon, ScencesToolIcon, TemplateToolIcon, MixerToolIcon } from '~/components/Icons'
import Tools from '~/components/Tools'
import { useState } from 'react'
import Modal from '~/components/Modal'
import Scene from '~/components/Scene'

const cx = classNames.bind(styles)

function LateralMenu() {
    const [showTools, setShowTools] = useState(false)
    const [showScenes, setShowScenes] = useState(false)
    const [activeScene, setActiveScene] = useState(1)

    const handleShowToolBar = () => {
        setShowTools(!showTools)
    }

    const handleShowScenes = () => {
        setShowScenes(!showScenes)
    }

    const handleSetActiveScene = (value) => {
        setActiveScene(value)
    }

    // fetch data scene
    const scenes = [
        {
            id: 1,
            sceneThumb: 'https://app.lofi.co/static/media/cafe-set.588fc661c5366cd35582.png',
            sceneNumber: 2,
            variations: 8,
        },
        {
            id: 2,
            sceneThumb: 'https://app.lofi.co/static/media/seoul-preview.a738101f2d750652dfe9.png',
            sceneNumber: 2,
            variations: 8,
        },
        {
            id: 3,
            sceneThumb: 'https://app.lofi.co/static/media/noise-preview.c9275832c16b80c97c29.png',
            sceneNumber: 3,
            variations: 3,
        },
        {
            id: 4,
            sceneThumb: 'https://app.lofi.co/static/media/future-preview.ff51450e5a063e62b157.png',
            sceneNumber: 2,
            variations: 6,
        },
        {
            id: 5,
            sceneThumb: 'https://app.lofi.co/static/media/backseat-preview.68c95df14c33eec1bb84.png',
            sceneNumber: 1,
            variations: 2,
        },
        {
            id: 6,
            sceneThumb: 'https://app.lofi.co/static/media/chill.6d5d8ab2260cceaa865d.png',
            sceneNumber: 2,
            variations: 8,
        },
    ]

    return (
        <div className={cx('wrapper')}>
            {showScenes && (
                <Modal title="Scenes" className={cx('scene-modal')} width={350} height="auto">
                    <div className={cx('scene-container')}>
                        {scenes.map((scene) => (
                            <Scene
                                onClick={() => handleSetActiveScene(scene.id)}
                                active={activeScene === scene.id}
                                key={scene.id}
                                sceneThumb={scene.sceneThumb}
                                scenes={scene.sceneNumber}
                                variations={scene.variations}
                            ></Scene>
                        ))}
                    </div>
                </Modal>
            )}
            <div className={cx('icon-wrapper')}>
                <Button toolBtn titleTippy="Mixer" placement="left" arrow={false}>
                    <MixerToolIcon></MixerToolIcon>
                </Button>
                <Button toolBtn titleTippy="Templates" placement="left" arrow={false}>
                    <TemplateToolIcon></TemplateToolIcon>
                </Button>
                <Button toolBtn titleTippy="Scenes" placement="left" arrow={false} onClick={handleShowScenes}>
                    <ScencesToolIcon></ScencesToolIcon>
                </Button>
                <Button toolBtn onClick={handleShowToolBar} titleTippy="Tools" placement="left" arrow={false}>
                    <WidgetsToolIcon className={cx('tools-icon')}></WidgetsToolIcon>
                </Button>
                <Tools show={showTools}></Tools>
            </div>
        </div>
    )
}

export default LateralMenu
