import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { TwaAnalyticsProvider } from '@tonsolutions/telemetree-react';

import { init, miniApp, mainButton, shareURL } from '@telegram-apps/sdk';


const initializeTelegramSDK = async () => {
  try {
    await init();


    if (miniApp.ready.isAvailable()) {
      await miniApp.ready();
      console.log('Mini App готово');
    }


  } catch (error) {
    console.error('Ошибка инициализации:', error);
  }
  miniApp.setHeaderColor('#fcb69f');
  // Монтируем главную кнопку
    if (mainButton.mount.isAvailable()) {
      mainButton.mount(); // Убедимся, что кнопка установлена
      console.log('Главная кнопка установлена');
    }


    // Настраиваем свойства главной кнопки
    if (mainButton.setParams.isAvailable()) {
      mainButton.setParams({
        backgroundColor: '#aa1388', // Цвет кнопки
        isEnabled: true, // Кнопка активна
        isVisible: true, // Кнопка видима
        text: 'Поделиться очками', // Текст на кнопке
        textColor: '#000000', // Цвет текста
      });
      console.log('Свойства главной кнопки настроены');
    }


    // Добавляем слушатель кликов на кнопку
    if (mainButton.onClick.isAvailable()) {
      mainButton.on('click', () => {
        try {
          // Получение текущих очков из localStorage
          const score = localStorage.getItem('memory-game-score') || 0;
          shareURL(`Посмотрите! У меня ${score} очков в игре!`);
          console.log('Окно выбора чата открыто для отправки сообщения.');
        } catch (error) {
          console.error('Ошибка при открытии окна выбора чата:', error);
        }
      });
    }
};


initializeTelegramSDK();
// miniApp.setHeaderColor('#fcb69f');



createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TwaAnalyticsProvider
      projectId='44adb760-1dc8-4008-8a55-f7642f3bcf0b'
      apiKey='c809d2b1-1738-4ec2-bee7-a5093d870f69'
      appName={TrackGroups.MEDIUM}
    >
      <App />
    </TwaAnalyticsProvider>
  </React.StrictMode>,
)
