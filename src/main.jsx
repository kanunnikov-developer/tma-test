import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { TrackGroups, TwaAnalyticsProvider } from "@tonsolutions/telemetree-react";

import { init, backButton, miniApp, mainButton, shareURL } from "@telegram-apps/sdk";

const initializeTelegramSDK = async () => {
  try {
    await init();

    if (backButton.mount.isAvailable()) {
      backButton.mount();
      backButton.isMounted(); // true
    }

    if (backButton.show.isAvailable()) {
      backButton.show();
      backButton.isVisible();
    }

    if (backButton.onClick.isAvailable()) {
      function listener() {
        miniApp.close();
      }
      backButton.onClick(listener);
    }
    
    // Ожидание загрузки Mini App
    if (miniApp.ready.isAvailable()) {
      await miniApp.ready();
    }

    // Установка цвета заголовка после инициализации
    if (miniApp.setHeaderColor.isAvailable()) {
      miniApp.setHeaderColor("#fcb69f");
    }

    // Монтируем главную кнопку
    if (mainButton.mount.isAvailable()) {
      mainButton.mount();
    }

    // Настраиваем параметры кнопки
    if (mainButton.setParams.isAvailable()) {
      mainButton.setParams({
        backgroundColor: "#aa1388",
        isEnabled: true,
        isVisible: true,
        text: "Поделиться очками",
        textColor: "#000000",
      });
    }

    // Добавляем слушатель кликов на кнопку
    if (mainButton.onClick.isAvailable()) {
      function listener() {
       const score = localStorage.getItem("memory-game-score") || 0;
       shareURL(`Посмотрите! У меня ${score} очков в игре!`);
      }
      mainButton.onClick(listener)
    }
  } catch (error) {
    console.error("Ошибка инициализации:", error);
  }
};

initializeTelegramSDK();

createRoot(document.getElementById("root")).render(
  <TwaAnalyticsProvider
    projectId="44adb760-1dc8-4008-8a55-f7642f3bcf0b"
    apiKey="c809d2b1-1738-4ec2-bee7-a5093d870f69"
    trackGroup={TrackGroups.MEDIUM}
  >
    <App />
  </TwaAnalyticsProvider>
);
