import { IKey } from "../models/IKey";
import GuessRow from "../components/GuessRow";

interface Props {
  nestedGuess: Array<IKey[]>;
  activeRow: number;
}

function Guess(props: Props) {
  return (
    <div className="flex flex-col gap-2 items-center">
      {props.nestedGuess
        .filter((row, i) => row.length > 0 || props.activeRow === i)
        .map((guess, index) => {
          return <GuessRow key={index} guess={guess}></GuessRow>;
        })}
    </div>
  );
}

export default Guess;
