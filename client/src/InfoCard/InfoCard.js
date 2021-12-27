import React from "react";
import styles from "./infoCard.module.scss"

const InfoCard = ({title, value, image, color, width}) => {
    return (
        <div className={styles.cardContainer} style={{backgroundColor:color}}>
            <div className={styles.left}>
                <div className={styles.title}>{title}</div>
                <div className={styles.value}>{value}</div>
            </div>
            <div className={styles.right}>
                <img src={image} alt="currency" className={styles.img} style={{width: width ? "4rem" : "3rem"}}/>
            </div>
        </div>
    )
}


export default InfoCard;