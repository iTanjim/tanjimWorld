import React from 'react'
import styles from "./TextCard.module.css";

function TextCard({children}) {
  return (
     <div className={styles.texts}>
              <h2>
                {children}
              </h2>
    </div>
  )
}

export default TextCard