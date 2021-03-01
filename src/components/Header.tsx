import styles from './../styles/Header.module.css'
import { ExperienceBar } from './ExperienceBar'

export function Header() {
    return (
        // <div className={styles.headerContainer}>
        //     <img src='/icons/eva-logo.png' alt='eva-logo' />
        //     <span>
        //         Evangelion Card Simulator
        //     </span>
        //     <ExperienceBar />
        // </div>
        <div className='container mx-auto flex flex-col justify-content-center'>
            <div className='px-2 flex justify-center'>
                <img src='/icons/eva-logo.png' alt='' className='w-32' />
            </div>
            <div className='px-2 flex justify-center'>
                <div className={'text-center ' + styles.title}>
                    <span>
                        Evangelion Card Generator
                    </span>
                </div>
            </div>
            <div className='px-2 font-medium'>
                <p className='text-lg text-center'>
                    Current Experience
                </p>
            </div>
            <div className='flex-1 text-center'>
                <ExperienceBar />
            </div>
        </div>
    )
}