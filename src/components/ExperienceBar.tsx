import { useContext } from 'react';
import { AccountContext } from '../contexts/AccountContext';
import styles from '../styles/ExperienceBar.module.css'
export function ExperienceBar() {
    const { currentExperience, experienceToNextLevel } = useContext(AccountContext)

    const percentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel

    return (
        <header className={styles.experienceBar + ' mx-auto'}>
            <span>0 xp</span>
            <div>
                <div style={{ width: `${percentToNextLevel}%` }} />

                <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%` }}>
                    {currentExperience} xp
                </span>
            </div>
            <span>{experienceToNextLevel} xp</span>
        </header>
    );
}