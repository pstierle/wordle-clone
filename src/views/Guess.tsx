import { IGuess } from "../models/IGuess";

function Guess(props: IGuess) {
  return (
    <div className="flex gap-1  justify-center">
      {props.guess.map((key, index) => {
        return (
          <div
            key={index}
            className="h-14 w-14 bg-gray-700 rounded uppercase flex justify-center items-center font-bold"
          >
            <p>{key.letter}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Guess;
