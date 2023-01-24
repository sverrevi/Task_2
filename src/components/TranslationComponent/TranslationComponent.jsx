import styles from "./TranslationComponent.module.css"
import { useState } from "react"
import images from "../../assets/index"
import { useDispatch} from "react-redux"
import { updateTranslations } from "../../redux-parts/userSLice"

function TranslationComponent() {
    const [inputContent, setInputContent] = useState('')
    const [displayedText, setDisplayedText] = useState([])
    const updateInputContent = (event) => {setInputContent(event.target.value)}
    const handleArrowClick = () => {dispatch(updateTranslations(inputContent)); setDisplayedText(inputContent.split(""))}
    const alphabet = "abcdefghijklmnopqrstuvwxyz ".split("")
    const dispatch = useDispatch();

    return(
        <div className={styles.container}>
            <div className={styles.inputFieldContainer}>
                <input maxLength={40} placeholder= {"Type in text..."} className={styles.inputField} type="text" onChange={updateInputContent}></input>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
                <div className={styles.translateButton}>
                    <i onClick={handleArrowClick} className="material-icons">arrow_forward</i>
                </div>
            </div>
            <div className={styles.translationContainer}>
                {displayedText.map(element => {
                    return alphabet.includes(element) && <img className={styles.sign} alt={"Sign"}src = {images[element]}></img>})}
            </div>
        </div>
    )
}
export default TranslationComponent