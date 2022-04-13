import { IKey } from "../models/IKey";

function Key(props: IKey) {
  return (
    <div
      className={`px-2 py-1  rounded w-10 h-10 text-center uppercase flex justify-center items-center font-bold transition-all ${
        props.lastPressed?.letter === props.letter
          ? "bg-red-200"
          : "bg-gray-600"
      }`}
    >
      <p>{props.letter}</p>
    </div>
  );
}

export default Key;
