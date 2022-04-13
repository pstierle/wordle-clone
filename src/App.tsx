import Guess from "./views/Guess";
import Keyboard from "./views/Keyboard";
import { useCallback, useEffect, useState } from "react";
import { IKey } from "./models/IKey";
import { useEventListener } from "./hooks/useEventListener";
import KeyboardJSON from "./assets/keyboard.json";

function App() {
  const [lastPressed, setlastPressed] = useState<IKey>();
  const [keys, setKeys] = useState<IKey[]>([]);
  const [word] = useState<string>("test");
  const [guess, setGuess] = useState<IKey[]>([]);

  const handler = useCallback(
    (event: KeyboardEvent) => {
      const key: IKey = { letter: event.key, code: event.keyCode };

      setlastPressed(key);

      if (key.letter === "Backspace") {
        setGuess(guess.filter((g, i) => i !== guess.length - 1));
        return;
      }

      if (guess.length < word.length) {
        const newGuess = [...guess, key];
        setGuess(newGuess);
      }
    },
    [setlastPressed, guess, setGuess, word]
  );

  useEventListener("keydown", handler);

  useEffect(() => {
    const keys: IKey[] = [];
    for (const key in KeyboardJSON) {
      // TODO use Key Codes...
      keys.push({
        letter: key,
        code: 0,
      });
    }
    setKeys(keys);
  }, []);

  return (
    <div className="flex flex-col justify-center w-1/2 mx-auto mt-56">
      <Guess guess={guess} />
      <Keyboard lastPressed={lastPressed} keys={keys} />
    </div>
  );
}

export default App;
