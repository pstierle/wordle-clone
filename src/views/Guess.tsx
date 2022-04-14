import { IKey } from "../models/IKey";
import GuessRow from "../components/GuessRow";

interface Props {
  nestedGuess: Array<IKey[]>;
}

function Guess(props: Props) {
  return (
    <div className="p-2 flex flex-col gap-2">
      {props.nestedGuess.map((guess, index) => {
        return <GuessRow key={index} guess={guess}></GuessRow>;
      })}
    </div>
  );
}

export default Guess;
