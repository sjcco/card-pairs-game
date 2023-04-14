import React, { useState} from "react";
import { scores } from "../interfaces";

const useStorage = (key: string) => {
  const [storedValue, setStoredValue] = useState<scores>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.log(error);
      return [];
    }
  });
  const setValue = (value: scores | ((val: scores) => scores)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // todo handle errors
      console.log(error);
    }
  };
  return [storedValue, setValue] as const;
}
 
export default useStorage;