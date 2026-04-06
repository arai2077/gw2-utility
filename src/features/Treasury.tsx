import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTreasuryStore } from "./store/treasuryStore";

export const Treasury = () => {
  const apiKey = useTreasuryStore((s) => s.apiKey);
  const setApiKey = useTreasuryStore((s) => s.setApiKey);
  const [draft, setDraft] = useState("");

  const renderApiKeyInput = () => (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-lg font-semibold">Enter your API key</h2>
      <div className="flex gap-2 w-full max-w-sm">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="API Key"
          className="border border-border rounded px-4 py-2 flex-1"
        />
        <Button
          onClick={() => setApiKey(draft)}
          className="border border-border rounded px-4 py-2"
        >
          Save
        </Button>
      </div>
    </div>
  );

  const renderTreasury = () => (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-lg font-semibold">Treasury</h2>
      <p>Your API key: {apiKey}</p>
    </div>
  );

  return <>{apiKey ? renderTreasury() : renderApiKeyInput()}</>;
};
