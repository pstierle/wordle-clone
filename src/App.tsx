import Guess from "./views/Guess";
import Keyboard from "./views/Keyboard";
import { useCallback, useEffect, useState, useMemo } from "react";
import { IKey } from "./models/IKey";
import { useEventListener } from "./hooks/useEventListener";
import KeyboardJSON from "./assets/keyboard.json";

function App() {
  const [lastPressed, setlastPressed] = useState<IKey>();
  const [word] = useState<string>("test");
  const [nestedGuess, setNestedGuess] = useState<Array<IKey[]>>([
    [],
    [],
    [],
    [],
    [],
  ]);
  const [nestedKeys, setNestedKeys] = useState<Array<IKey[]>>([[], [], []]);
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

  const handler = useCallback(
    (event: KeyboardEvent) => {
      if (activeGuessIndex === 5) return;

      const clickedKey: IKey = { letter: event.key, code: event.keyCode };

      setlastPressed(clickedKey);

      if (clickedKey.letter === "Backspace" && currentGuess.length > 0) {
        removeLastGuess();
        return;
      }

      if (
        clickedKey.letter === "Enter" &&
        currentGuess.length === word.length
      ) {
        checkGuess();
        return;
      }

      if (currentGuess.length < word.length) {
        let validKey = false;

        const keyBoardJSON: any = KeyboardJSON;

        for (const row in keyBoardJSON) {
          for (const key in keyBoardJSON[row]) {
            if (key === clickedKey.letter) validKey = true;
          }
        }

        if (validKey) addGuess(clickedKey);
      }
    },
    [
      currentGuess,
      word,
      addGuess,
      removeLastGuess,
      checkGuess,
      activeGuessIndex,
    ]
  );

  useEventListener("keydown", handler);

  useEffect(() => {
    const nestedKeys: Array<IKey[]> = [];
    const keyBoardJSON: any = KeyboardJSON;

    for (const row in keyBoardJSON) {
      nestedKeys[row as any] = [];
      for (const key in keyBoardJSON[row]) {
        nestedKeys[row as any].push({
          letter: key,
          code: keyBoardJSON[row][key],
          type: "inKeyBoard",
        });
      }
    }
    setNestedKeys(nestedKeys);
  }, []);

  return (
    <div className="flex flex-col justify-center w-1/2 mx-auto mt-56">
      <Guess nestedGuess={nestedGuess} />
      <Keyboard lastPressed={lastPressed} nestedKeys={nestedKeys} />
    </div>
  );
}

export default App;
