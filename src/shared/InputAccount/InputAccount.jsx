import React from 'react'
import styles from './InputAccount.module.css'

export const InputAccount = () => {
  return (
    <input type="text" className={styles.input} placeholder='Ваш аккаунт Steam'/>
  )
}
