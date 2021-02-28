import { useContext } from 'react'
import { AccountContext } from '../contexts/AccountContext'

import styles from './../styles/LevelUpModal.module.css'

export function LevelUpModal() {

    const { level, closeLevelUpModal } = useContext(AccountContext);

    return (
        <div className={styles.overlay} >
            <div className={styles.container}>
                <header>
                    {level}
                </header>

                <strong>Congratulations</strong>
                <p>You reach another EVA fan, damn you are truly creative</p>

                <button type='button' onClick={closeLevelUpModal}>
                    <img src="/icons/close.svg" alt='Fechar modal' />
                </button>
            </div>
        </div>
    )
}