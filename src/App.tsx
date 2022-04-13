import Guess from "./views/Guess";
import Keyboard from "./views/Keyboard";
import { useCallback, useEffect, useState } from "react";
import { IKey } from "./models/IKey";
import { useEventListener } from "./hooks/useEventListener";
import KeyboardJSON from "./assets/keyboard.json";

function App() {
  const [lastPressed, setlastPressed] = useState<IKey>();
  const [keys, setKeys] = useState<IKey[]>([]);

  const handler = useCallback(
    (event: KeyboardEvent) => {
      setlastPressed({ letter: event.key, code: event.keyCode });
      console.log(lastPressed);
    },
    [setlastPressed, lastPressed]
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
      <Guess />
      <Keyboard lastPressed={lastPressed} keys={keys} />
    </div>
  );
}

export default App;
