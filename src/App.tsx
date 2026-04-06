import { Router } from "./Router";
import { Sidebar } from "@/features/Sidebar";

const App = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Router />
    </div>
  );
};

export default App;
