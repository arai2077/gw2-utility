import { Router } from "./Router";
import { NavBar } from "@/features/NavBar";

const App = () => {
  return (
    <div className="flex flex-col">
      <NavBar />
      <Router />
    </div>
  );
};

export default App;
