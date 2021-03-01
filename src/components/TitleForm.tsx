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
        <div>
            <div
                className='container p-4 py-8 max-w-3xl mx-auto justify-center grid  grid-cols-1 md:grid-cols-2'
            >
                <input
                    className='m-2 px-2 py-3 md:py-4 rounded-sm hover:bg-purple-200 transition-all outline-none'
                    type="text"
                    placeholder={firstLine}
                    onChange={event => setFirstLine(event.target.value)}
                />
                <input
                    className='m-2 px-2 py-3 md:py-4 rounded-sm hover:bg-purple-200 transition-all outline-none'
                    type="text"
                    placeholder={secondLine}
                    onChange={event => setSecondLine(event.target.value)}
                />
                <input
                    className='m-2 px-2 py-3 md:py-4 rounded-sm hover:bg-purple-200 transition-all outline-none'
                    type="text"
                    placeholder={thirdLine}
                    onChange={event => setThirdLine(event.target.value)}
                />
                <input
                    className='m-2 px-2 py-3 md:py-4 rounded-sm hover:bg-purple-200 transition-all outline-none'
                    type="text"
                    placeholder={fourthLine}
                    onChange={event => setFourthLine(event.target.value)}
                />
                <input
                    className='m-2 px-2 py-3 md:py-4 rounded-sm hover:bg-purple-200 transition-all outline-none focus-within:border-current'
                    type="text"
                    placeholder={descriptionLine}
                    onChange={event => setDescriptionLine(event.target.value)}
                />
            </div>
            <div className='flex justify-center'>
                <div id='download-content' className='bg-black px-4 py-5 rounded-md container flex flex-col text-white font-semibold max-w-5xl overflow-x-auto'>
                    <p className={'text-6xl ' + styles.StyledFont}>
                        {firstLine}
                    </p>
                    <p className={'text-5xl ' + styles.StyledFont}>
                        {secondLine}
                    </p>
                    <p className={'text-8xl ' + styles.StyledFont}>
                        {thirdLine}
                    </p>
                    <p className={'text-3xl ' + styles.StyledFont}>
                        {fourthLine}
                    </p>
                    <p className={'text-2xl ' + styles.StyledFont}>
                        {descriptionLine}
                    </p>
                </div>
            </div>
            <div className='container flex flex-col md:flex-row flex-1 content-start p-2 max-w-5xl mx-auto justify-center'>
                <div className='p-2 mx-auto flex flex-col'>
                    <div className='p-2 text-center'>
                        <p className='text-lg'>
                            Cards Generated: {picturesCompleted}
                        </p>
                    </div>
                    <button
                        className='w-auto bg-purple-500 p-4 rounded-md transition-colors outline-none hover:bg-purple-800 focus:outline-none'
                        onClick={DownloadImage}
                    >
                        <p className='text-xl text-white'>
                            Generate Card
                        </p>
                    </button>
                </div>
            </div>
        </div>

        // <div className={styles.titleFormContainer}>
        //     <form>
        //         <input type="text" placeholder={firstLine} onChange={event => setFirstLine(event.target.value)}></input>
        //         <input type="text" placeholder={secondLine} onChange={event => setSecondLine(event.target.value)}></input>
        //         <input type="text" placeholder={thirdLine} onChange={event => setThirdLine(event.target.value)}></input>
        //         <input type="text" placeholder={fourthLine} onChange={event => setFourthLine(event.target.value)}></input>
        //         <input type="text" placeholder={descriptionLine} onChange={event => setDescriptionLine(event.target.value)}></input>
        //         <button type='button' onClick={DownloadImage}>
        //             Download
        //         </button>
        //         <span>
        //             Pictures Saved: {picturesCompleted}
        //         </span>
        //     </form>
        //     <section id='download-content'>
        //         <p className={styles.FirstLine}>
        //             {firstLine}
        //         </p>
        //         <p className={styles.SecondLine}>
        //             {secondLine}
        //         </p>
        //         <p className={styles.ThirdLine}>
        //             {thirdLine}
        //         </p>
        //         <p className={styles.FourthLine}>
        //             {fourthLine}
        //         </p>
        //         <p className={styles.DescriptionLine}>
        //             {descriptionLine}
        //         </p>
        //     </section>
        //     <br />
        // </div>
    )
}