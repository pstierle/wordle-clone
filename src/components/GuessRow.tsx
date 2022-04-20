import { IKey } from "../models/IKey";
import Key from "./Key";

interface Props {
  guess: IKey[];
}

export default function GuessRow({ guess }: Props) {
  return (
    <div className="flex items-center gap-1 justify-center ">
      {guess.map((key, index) => {
        return (
          <div
            key={index}
            className={`w-14 h-14 flex justify-center items-center rounded ${
              key.type === "exactMatch"
                ? "bg-green-500"
                : key.type === "match"
                ? "bg-yellow-400"
                : "bg-gray-500"
            }`}
          >
            <Key data={key} className="w-11 h-11"></Key>
          </div>
        );
      })}
    </div>
  );
}
