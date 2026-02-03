import Router from "./router";

function App() {
  return (
    <div className="min-h-screen font-sans bg-surface dark:bg-surface text-text-primary dark:text-text-primary overflow-x-hidden selection:bg-brand-accent selection:text-text-inverse relative">
      <div
        className="fixed inset-0 z-0 opacity-[0.4] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgb(var(--neutral-200)) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      ></div>
      <div className="relative z-10">
        <Router />
      </div>
    </div>
  );
}

export default App;
