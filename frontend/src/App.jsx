import { useState } from "react";
import "./App.css";

import Home from "./Home";

const KOKO = {
  nickname: "Koko",
  name: 'Koko "Kondo" Eugene Smithianan',
  photo: "/photos/koko.jpg",
  status: "owner",
};
const KOA = {
  nickname: "Koa",
  name: 'Koa "Wawa" Milton Smithianan',
  photo: "/photos/koa.jpg",
  status: "customer",
};

function App() {
  const [user] = useState(KOKO);
  return (
    <>
      <Home user={user} />
    </>
  );
}

export default App;
