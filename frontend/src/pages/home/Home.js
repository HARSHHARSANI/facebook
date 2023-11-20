import React, { useRef, useState } from "react";
import Header from "../../components/header/Header";
import "./style.css";
import useClickOutside from "../../components/helpers/clickOutside";

const Home = () => {
  const [visible, setvisible] = useState(true);

  const el = useRef(null);

  useClickOutside(el, () => {
    setvisible(false);
    console.log("clicked Outside");
  });

  return (
    <div>
      <Header />
      {visible && <div className="card" ref={el}></div>}
    </div>
  );
};

export default Home;
