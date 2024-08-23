import React, { createContext, useState, useContext, useEffect } from "react";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";

// Define your translations
const translations = {
  en: {
    welcome: "Welcome",
    settings: "Settings",
    language: "Language",
    changePassword: "Change Password",
    updateEmail: "Update Email",
    appointments: "Appointments",
    productLaunches: "Product Launches",
    promotions: "Promotions",
    selectLanguage: "Select Language",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    accountSettings: "Account Settings",
    notificationPreferences: "Notification Preferences",
    legal: "Legal",
    chooseLanguage: "Choose your preferred language",
  },
  hi: {
    welcome: "स्वागत है",
    settings: "सेटिंग्स",
    language: "भाषा",
    changePassword: "पासवर्ड बदलें",
    updateEmail: "ईमेल अपडेट करें",
    appointments: "अपॉइंटमेंट",
    productLaunches: "उत्पाद लॉन्च",
    promotions: "प्रोमोशन",
    selectLanguage: "भाषा चुनें",
    privacyPolicy: "गोपनीयता नीति",
    termsOfService: "सेवा की शर्तें",
    accountSettings: "खाता सेटिंग्स",
    notificationPreferences: "अधिसूचना प्राथमिकताएँ",
    legal: "कानूनी",
    chooseLanguage: "अपनी पसंदीदा भाषा चुनें",
  },
};

const i18n = new I18n(translations);

type LanguageContextType = {
  t: (key: string) => string;
  setLanguage: (lang: string) => void;
  language: string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState(Localization.locale.split("-")[0]);

  useEffect(() => {
    i18n.locale = language;
  }, [language]);

  const t = (key: string) => i18n.t(key);

  return <LanguageContext.Provider value={{ t, setLanguage, language }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
