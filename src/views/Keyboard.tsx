import Key from "../components/Key";
import { IKeyboard } from "../models/IKeyboard";

function Keyboard(props: IKeyboard) {
  return (
    <div className="flex gap-2 justify-evenly mt-10">
      {props.keys.map((key, index) => {
        return (
          <Key
            key={index}
            code={key.code}
            letter={key.letter}
            lastPressed={props.lastPressed}
          ></Key>
        );
      })}
    </div>
  );
}

export default Keyboard;
