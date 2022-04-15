import { useCallback, useMemo, useState } from "react";
import { IKey } from "../models/IKey";

export function useGuess() {
  const [word] = useState<string>("test");
  const [nestedGuess, setNestedGuess] = useState<Array<IKey[]>>([
    [],
    [],
    [],
    [],
    [],
  ]);

  const [activeGuessIndex, setActiveGuessIndex] = useState<number>(0);

  const currentGuess = useMemo<IKey[]>(() => {
    return nestedGuess[activeGuessIndex];
  }, [nestedGuess, activeGuessIndex]);

  const addGuess = useCallback(
    (key: IKey) => {
      const newCurrentGuess = [...currentGuess, key];
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
        console.log(key.letter, word[i]);
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
    newCurrentGuess.pop();
    let nestedGuessCopy = [...nestedGuess];
    nestedGuessCopy[activeGuessIndex] = newCurrentGuess;
    setNestedGuess(nestedGuessCopy);
  }, [currentGuess, nestedGuess, activeGuessIndex, setNestedGuess]);

  return {
    word,
    nestedGuess,
    activeGuessIndex,
    currentGuess,
    addGuess,
    checkGuess,
    removeLastGuess,
  };
}
