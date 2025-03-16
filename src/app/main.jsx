import { createRoot } from "react-dom/client";
import "./index.css";


import { TrackGroups, TwaAnalyticsProvider } from "@tonsolutions/telemetree-react";

 import { init, backButton, miniApp, mainButton, shareURL } from "@telegram-apps/sdk";
import { Home } from "../pages/Home/Home";

const initializeTelegramSDK = () => {
  try {
    init();

    //Монтируем кнопку "Назад"
    if (backButton.mount.isAvailable()) {
      backButton.mount();
      backButton.isMounted(); // true
    }

    //Показываем кнопку "Назад"
    if (backButton.show.isAvailable()) {
      backButton.show();
      backButton.isVisible();
    }

    //Обрабатываем клик кнопки "Назад"
    if (backButton.onClick.isAvailable()) {
      function listener() {
        miniApp.close();
      }
      backButton.onClick(listener);
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
     <Home/>
  </TwaAnalyticsProvider>
);
