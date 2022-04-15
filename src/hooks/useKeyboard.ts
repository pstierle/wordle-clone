import { useState } from "react";
import { IKey } from "../models/IKey";
import KeyboardJSON from "../assets/keyboard.json";

export function useKeyboard() {
  const [nestedKeys, setNestedKeys] = useState<Array<IKey[]>>([[], [], []]);
  const [lastPressed, setLastPressed] = useState<IKey>();

  const loadKeys = () => {
    let keys: Array<IKey[]> = [];
    const keyBoardJSON: any = KeyboardJSON;

    for (const row in keyBoardJSON) {
      keys[row as any] = [];
      for (const key in keyBoardJSON[row]) {
        keys[row as any].push({
          letter: key,
          code: keyBoardJSON[row][key],
          type: "inKeyBoard",
        });
      }
    }

    setNestedKeys(keys);
  };

  return {
    loadKeys,
    nestedKeys,
    lastPressed,
    setLastPressed,
  };
}
