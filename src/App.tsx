import Guess from "./views/Guess";
import Keyboard from "./views/Keyboard";

function App() {
  return (
    <div className="flex flex-col justify-center w-1/2 mx-auto mt-56">
      <Guess />
      <Keyboard />
    </div>
  );
}

export default App;
