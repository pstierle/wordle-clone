import Guess from "./views/Guess";
import Keyboard from "./views/Keyboard";
import { useCallback, useEffect } from "react";
import { IKey } from "./models/IKey";
import { useEventListener } from "./hooks/useEventListener";
import KeyboardJSON from "./assets/keyboard.json";
import { useKeyboard } from "./hooks/useKeyboard";
import { useGuess } from "./hooks/useGuess";

function App() {
  const { nestedKeys, loadKeys, lastPressed, setLastPressed } = useKeyboard();
  const {
    word,
    nestedGuess,
    activeGuessIndex,
    currentGuess,
    addGuess,
    checkGuess,
    removeLastGuess,
  } = useGuess();

  const handler = useCallback(
    (event: KeyboardEvent) => {
      if (activeGuessIndex === 5) return;

      const clickedKey: IKey = { letter: event.key, code: event.keyCode };

      setLastPressed(clickedKey);

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
      setLastPressed,
    ]
  );

  useEventListener("keydown", handler);

  useEffect(() => {
    loadKeys();
  }, [loadKeys]);

  return (
    <div className="flex flex-col justify-center w-1/2 mx-auto mt-56">
      <Guess activeRow={activeGuessIndex} nestedGuess={nestedGuess} />
      <Keyboard lastPressed={lastPressed} nestedKeys={nestedKeys} />
    </div>
  );
}

export default App;
