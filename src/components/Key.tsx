import { IKey } from "../models/IKey";
import { IStyleableComponent } from "../models/IStyleableComponent";

interface Props extends IStyleableComponent {
  highlight?: boolean;
  data: IKey;
}

function Key(props: Props) {
  return (
    <div
      className={`px-2 py-1 rounded text-center uppercase flex justify-center items-center font-bold transition-all ${
        props.highlight ? "bg-red-200" : "bg-gray-600"
      } ${props.className}`}
    >
      <p>{props.data.letter}</p>
    </div>
  );
}

export default Key;
