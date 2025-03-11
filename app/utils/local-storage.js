"use client";

// Safely get item from localStorage (only works client-side)
export const getFromLocalStorage = (key, defaultValue) => {
  if (typeof window === 'undefined') {
    return defaultValue;
  }
  
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
};

// Safely set item to localStorage (only works client-side)
export const setToLocalStorage = (key, value) => {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error);
  }
};

// Default settings for the application
export const defaultSettings = {
  apiKey: "YANCyuHSLM9Kjvh2ycdjMjoIoONMlMNZ",
  ocrModel: "mistral-ocr-latest",
  chatModel: "mistral-small-latest"
};

// Get settings from localStorage or use defaults
export const getSettings = () => {
  return getFromLocalStorage('mistralSettings', defaultSettings);
};

// Save settings to localStorage
export const saveSettings = (settings) => {
  setToLocalStorage('mistralSettings', settings);
};
