import { IKey } from "../models/IKey";
import GuessRow from "../components/GuessRow";

interface Props {
  nestedGuess: Array<IKey[]>;
  activeRow: number;
}

export default function Guess({ nestedGuess, activeRow }: Props) {
  return (
    <div className="flex flex-col gap-2 items-center">
      {nestedGuess
        .filter((row, i) => row.length > 0 || activeRow === i)
        .map((guess, index) => {
          return <GuessRow key={index} guess={guess}></GuessRow>;
        })}
    </div>
  );
}
