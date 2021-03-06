import { IKey } from "../models/IKey";
import { IStyleableComponent } from "../models/IStyleableComponent";

interface Props extends IStyleableComponent {
  highlight?: boolean;
  data: IKey;
}

export default function Key({ highlight, data, className }: Props) {
  return (
    <div
      className={`px-2 py-1 rounded text-center uppercase flex justify-center items-center font-bold transition-all ${
        highlight ? "bg-red-200" : "bg-gray-600"
      } ${className}`}
    >
      <p>{data.letter}</p>
    </div>
  );
}
