import { useState } from "react";

export default function Form() {
  const [userName, setUserName] = useState("");
  return (
    <div>
      <h1>{userName}</h1>
      <input value={userName} onInput={(e) => setUserName(e.target.value)} />
    </div>
  );
}
