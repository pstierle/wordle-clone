import { useCallback, useMemo, useState } from "react";
import { IKey } from "../models/IKey";

export function useGuess() {
  const [word] = useState<string>("kekw");

  const [nestedGuess, setNestedGuess] = useState<Array<IKey[]>>([
    Array(word.length).fill({ letter: "" }),
    Array(word.length).fill({ letter: "" }),
    Array(word.length).fill({ letter: "" }),
    Array(word.length).fill({ letter: "" }),
    Array(word.length).fill({ letter: "" }),
  ]);

  const [activeGuessIndex, setActiveGuessIndex] = useState<number>(0);

  const currentGuess = useMemo<IKey[]>(() => {
    return nestedGuess[activeGuessIndex];
  }, [nestedGuess, activeGuessIndex]);

  const addGuess = useCallback(
    (key: IKey) => {
      const newCurrentGuess = [...currentGuess];
      for (let i = 0; i < newCurrentGuess.length; i++) {
        if (!newCurrentGuess[i].code) {
          newCurrentGuess[i] = key;
          break;
        }
      }
      let nestedGuessCopy = [...nestedGuess];
      nestedGuessCopy[activeGuessIndex] = newCurrentGuess;
      setNestedGuess(nestedGuessCopy);
    },
    [currentGuess, nestedGuess, activeGuessIndex, setNestedGuess]
  );

  const checkGuess = useCallback(() => {
    const newCurrentGuess = [...currentGuess];
    let nestedGuessCopy = [...nestedGuess];
    newCurrentGuess.forEach((key, i) => {
      if (word.includes(key.letter)) {
        if (i === word.indexOf(key.letter)) {
          key.type = "exactMatch";
        } else {
          key.type = "match";
        }
      }
    });
    nestedGuessCopy[activeGuessIndex] = newCurrentGuess;
    setNestedGuess(nestedGuessCopy);
    if (activeGuessIndex <= 4) {
      setActiveGuessIndex(activeGuessIndex + 1);
    } else {
      console.log("guess over");
    }
  }, [
    activeGuessIndex,
    setActiveGuessIndex,
    currentGuess,
    setNestedGuess,
    nestedGuess,
    word,
  ]);

  const removeLastGuess = useCallback(() => {
    const newCurrentGuess = [...currentGuess];
    for (let i = newCurrentGuess.length - 1; i >= 0; i--) {
      if (newCurrentGuess[i].code) {
        newCurrentGuess[i] = { letter: "" };
        break;
      }
    }
    let nestedGuessCopy = [...nestedGuess];
    nestedGuessCopy[activeGuessIndex] = newCurrentGuess;
    setNestedGuess(nestedGuessCopy);
  }, [currentGuess, nestedGuess, activeGuessIndex, setNestedGuess]);

  return {
    nestedGuess,
    activeGuessIndex,
    currentGuess,
    addGuess,
    checkGuess,
    removeLastGuess,
  };
}
