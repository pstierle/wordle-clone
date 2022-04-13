import { IKey } from "../models/IKey";

function Key(props: IKey) {
  return (
    <div>
      <p>{props.letter}</p>
    </div>
  );
}

export default Key;
