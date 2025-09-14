"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");

  async function loadMessages() {
    const res = await fetch("/api/messages");
    setMessages(await res.json());
  }

  async function addMessage() {
    await fetch("/api/messages", {
      method: "POST",
      body: JSON.stringify({ text }),
      headers: { "Content-Type": "application/json" },
    });
    setText("");
    loadMessages();
  }

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Hello World with Postgres 🚀</h1>
      <div className="mt-4 flex gap-2">
        <input
          className="border p-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Say hello..."
        />
        <button className="bg-blue-500 text-white px-4" onClick={addMessage}>
          Send
        </button>
      </div>
      <ul className="mt-4">
        {messages.map((m) => (
          <li key={m.id}>{m.text}</li>
        ))}
      </ul>
    </main>
  );
}
