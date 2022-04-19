import { useCallback, useMemo, useState } from "react";
import { IKey } from "../models/IKey";

export function useGuess() {
  const [word, setWord] = useState<string>("kekw");

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
      const updatedGuess = [...currentGuess];
      for (let i = 0; i < updatedGuess.length; i++) {
        if (!updatedGuess[i].code) {
          updatedGuess[i] = key;
          break;
        }
      }
      let nestedGuessCopy = [...nestedGuess];
      nestedGuessCopy[activeGuessIndex] = updatedGuess;
      setNestedGuess(nestedGuessCopy);
    },
    [currentGuess, nestedGuess, activeGuessIndex, setNestedGuess]
  );

  const checkGuess = useCallback(() => {
    const newCurrentGuess = [...currentGuess];
    let nestedGuessCopy = [...nestedGuess];
    newCurrentGuess.forEach((key, guessIndex) => {
      if (word.includes(key.letter)) {
        key.type = "match";

        word.split("").forEach((char, wordIndex) => {
          if (char === key.letter && guessIndex === wordIndex) {
            key.type = "exactMatch";
          }
        });
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
    const updatedGuess = [...currentGuess];
    for (let i = updatedGuess.length - 1; i >= 0; i--) {
      if (updatedGuess[i].code) {
        updatedGuess[i] = { letter: "" };
        break;
      }
    }
    let nestedGuessCopy = [...nestedGuess];
    nestedGuessCopy[activeGuessIndex] = updatedGuess;
    setNestedGuess(nestedGuessCopy);
  }, [currentGuess, nestedGuess, activeGuessIndex, setNestedGuess]);

  return {
    nestedGuess,
    activeGuessIndex,
    currentGuess,
    addGuess,
    checkGuess,
    removeLastGuess,
    setWord,
  };
}
