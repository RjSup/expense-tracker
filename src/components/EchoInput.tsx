// frontend/src/components/EchoInput.tsx
import { useState } from "react";
import { sendMessage } from "../api/exampleService";

export const EchoInput = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await sendMessage(input);
      setResponse(data.message);
    } catch (err: any) {
      setResponse(err.message || "Error sending message");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type something..."
        />
        <button type="submit">Send</button>
      </form>
      {response && <p>{response}</p>}
    </div>
  );
};
