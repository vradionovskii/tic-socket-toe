import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";

const IndexPage: React.FC = () => {
  const symbol = useRef(null);
  const initialState = [null, null, null, null, null, null, null, null, null];
  const [state, setstate] = useState([...initialState]);

  function getHashArray() {
    return window.location.hash.slice(1).split("&");
  }

  const socket = io("http://localhost:3001", { transports: ["websocket"] });

  socket.on("updateState", (message) => {
    if (state !== message) {
      setstate([...message]);
    }
  });

  useEffect(() => {
    if (
      window.location.hash === "" &&
      JSON.stringify(state) === JSON.stringify(initialState)
    ) {
      console.log("!");
      socket.on("message", (message) => {
        window.location.hash = message + "&x";
        socket.emit("joinRoom", {
          id: message,
          data: state,
        });
      });
    } else {
      socket.emit("joinRoom", {
        id: getHashArray()[0],
        data: initialState,
      });
      if (window.location.hash.indexOf("&") === -1) {
        window.location.hash += "&o";
      }
    }
    symbol.current = getHashArray()[1];
  }, []);

  function updateBoard(i) {
    const temp = state;
    temp[i] = symbol.current === "x" ? true : false;
    setstate([...temp]);
    socket.emit("updateState", {
      id: getHashArray()[0],
      data: state,
    });
  }

  const router = useRouter();

  return (
    <Layout currentPage={router.route} title="home">
      <div className={`grid max-w-sm grid-cols-3 gap-8 mx-auto`}>
        {state.map((mark, i) => (
          <button
            className={`${mark ? "pointer-events-none" : ""} p-4 bg-gray-400`}
            onClick={() => updateBoard(i)}
            key={i}
          >
            {mark && "x"}
            {mark === false && "o"}
          </button>
        ))}
      </div>
    </Layout>
  );
};

export default IndexPage;
