"use client";

import { useEffect } from "react";

export default function ChatBox() {
  console.log("ChatBox render start");

  useEffect(() => {
    console.log("Rendered the ChatBox (useEffect)");
  }, []);

  return <div>ChatBox Loaded</div>;
}
