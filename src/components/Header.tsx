import styles from './../styles/Header.module.css'
import { ExperienceBar } from './ExperienceBar'

export function Header() {
    return (
        <div className={styles.headerContainer}>
            <img src='/icons/eva-logo.png' alt='eva-logo' />
            <span>
                Evangelion Card Simulator
            </span>
            <ExperienceBar />
        </div>
    )
}