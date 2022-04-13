import { IGlobal } from "./IGlobal";
import { IKey } from "./IKey";

export interface IKeyboard extends IGlobal {
  keys: IKey[];
}
