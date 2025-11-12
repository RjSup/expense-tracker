// frontend/src/api/exampleService.ts
export const fetchHello = async () => {
  const res = await fetch("http://localhost:5000/api/example");
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

// frontend/src/api/echoService.ts
export const sendMessage = async (message: string) => {
  const res = await fetch("http://localhost:5000/api/echo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) throw new Error("Failed to send message");

  return res.json();
};
