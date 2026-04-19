import { Router } from "./Router";
import { NavBar } from "@/features/NavBar";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <NavBar />
      <main className="flex-1">
        <Router />
      </main>
    </div>
  );
};

export default App;
