import { useContext, useState } from 'react'
import styles from './../styles/TitleForm.module.css'
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { AccountContext } from '../contexts/AccountContext';

export function TitleForm() {
    const [firstLine, setFirstLine] = useState('NEON')
    const [secondLine, setSecondLine] = useState('GENESIS')
    const [thirdLine, setThirdLine] = useState('EVANGELION')
    const [fourthLine, setFourthLine] = useState('EPISODE: 27')
    const [descriptionLine, setDescriptionLine] = useState(`"They say in heaven, love comes first, We'll make heaven a place on Earth."`)

    const { levelUp, picturesCompleted } = useContext(AccountContext)
    function DownloadImage() {

        htmlToImage.toJpeg(document.getElementById('download-content'), { quality: 1 })
            .then(function (dataUrl) {
                var link = document.createElement('a');
                link.download = 'eva-card.jpeg';
                link.href = dataUrl;
                link.click();
            });
        levelUp()
    }


    return (
        <div className={styles.titleFormContainer}>
            <form>
                <input type="text" placeholder={firstLine} onChange={event => setFirstLine(event.target.value)}></input>
                <input type="text" placeholder={secondLine} onChange={event => setSecondLine(event.target.value)}></input>
                <input type="text" placeholder={thirdLine} onChange={event => setThirdLine(event.target.value)}></input>
                <input type="text" placeholder={fourthLine} onChange={event => setFourthLine(event.target.value)}></input>
                <input type="text" placeholder={descriptionLine} onChange={event => setDescriptionLine(event.target.value)}></input>
                <button type='button' onClick={DownloadImage}>
                    Download
                </button>
                <span>
                    Pictures Saved: {picturesCompleted}
                </span>
            </form>
            <section id='download-content'>
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
            <br />
        </div>
    )
}