import React from 'react'
import style from './Header.module.css'
import { Button } from '../../shared/Button/Button'
import { InputAccount } from '../../shared/InputAccount/InputAccount'

export const Header = () => {
  return (
    <div className='container'>
      <div className={style.header}>
          <h1>STEAM BALL</h1>
          <Button/>
      </div>
      <div className={style.title}>
        <h1>Пополняйте баланс Steam быстро и с минимальной комиссией</h1>
      </div>
      <div className={style.input}>
        <form>
          <InputAccount/>
          <button className={style.button}>Проверить</button>
        </form>
      </div>
    </div>
  )
}
