import { useState, useEffect } from "react";

const PREFIX = "chat-";

export const useLocalStorage = (key, initialValue) => {
  const prefixedKey = PREFIX + key;

  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    if (jsonValue !== null) return jsonValue.toString();
    if (typeof initialValue === "function") {
      return initialValue();
    } else return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, value);
  }, [prefixedKey, value]);

  return [value, setValue];
};
