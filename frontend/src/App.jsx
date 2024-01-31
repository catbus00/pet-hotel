import { useState } from "react";
import "./App.css";

import Home from "./Home";

const KOKO = {
  nickname: "Koko",
  name: 'Koko "Kondo" Eugene Smithianan',
  photo: "/photos/koko.jpg",
  status: "owner",
  likes: ["entrepreneurship", "following Mom", "gin khao"],
  dislikes: [
    "uncleanliness",
    "lack of food",
    "not being allowed outside",
    "lack of attention",
  ],
  species: "cat",
  gender: "male",
};
const KOA = {
  nickname: "Koa",
  name: 'Koa "Wawa" Milton Smithianan',
  photo: "/photos/koa.jpg",
  status: "customer",
  likes: ["belly rubbing", "sunshine", "string toys"],
  dislikes: ["no playing", "farting", "sneezing"],
  species: "cat",
  gender: "male",
};

function App() {
  const [user] = useState(KOKO);
  return (
    <>
      <Home /* user={user} */ />
    </>
  );
}

export default App;
