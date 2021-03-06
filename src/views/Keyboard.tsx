import Key from "../components/Key";
import { IKey } from "../models/IKey";

interface Props {
  lastPressed?: IKey;
  nestedKeys: Array<IKey[]>;
}

export default function Keyboard({ lastPressed, nestedKeys }: Props) {
  return (
    <div className="flex flex-col gap-1 mt-10">
      {nestedKeys.map((keys, index) => {
        return (
          <div key={index} className="flex gap-1 justify-center">
            {keys.map((key, i) => {
              return (
                <Key
                  key={i}
                  data={key}
                  highlight={lastPressed?.letter === key.letter}
                  className="w-10 h-10"
                ></Key>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
