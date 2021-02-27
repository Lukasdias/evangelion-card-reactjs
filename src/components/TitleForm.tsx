import { useState } from 'react'
import styles from './../styles/TitleForm.module.css'

export function TitleForm() {
    const [firstLine, setFirstLine] = useState('NEON')
    const [secondLine, setSecondLine] = useState('GENESIS')
    const [thirdLine, setThirdLine] = useState('EVANGELION')
    const [fourthLine, setFourthLine] = useState('EPISODE: 27')
    const [descriptionLine, setDescriptionLine] = useState(`"They say in heaven, love comes first, We'll make heaven a place on Earth."`)
    return (
        <div className={styles.titleFormContainer}>
            <form>
                <input type="text" placeholder={firstLine} onChange={event => setFirstLine(event.target.value)}></input>
                <input type="text" placeholder={secondLine} onChange={event => setSecondLine(event.target.value)}></input>
                <input type="text" placeholder={thirdLine} onChange={event => setThirdLine(event.target.value)}></input>
                <input type="text" placeholder={fourthLine} onChange={event => setFourthLine(event.target.value)}></input>
                <input type="text" placeholder={descriptionLine} onChange={event => setDescriptionLine(event.target.value)}></input>
                <button type='button'>
                    Download
                </button>
            </form>
            <section>
                <p className={styles.FirstLine}>
                    {firstLine}
                </p>
                <p className={styles.SecondLine}>
                    {secondLine}
                </p>
                <p className={styles.ThirdLine}>
                    {thirdLine}
                </p>
                <p className={styles.FourthLine}>
                    {fourthLine}
                </p>
                <p className={styles.DescriptionLine}>
                    {descriptionLine}
                </p>
            </section>
        </div>
    )
}