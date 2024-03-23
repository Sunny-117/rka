import { useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("home");
  return (
    <div>
      <h1>{title}</h1>
      <button onClick={() => setTitle("首页")}>SET</button>
    </div>
  );
}
