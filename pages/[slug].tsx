import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { Circle } from "../components/Circle";
import { GameOver } from "../components/GameOver";
import { Cross } from "../components/Cross";
import { ShareButton } from "../components/ShareButton";

const IndexPage: React.FC = () => {
  const router = useRouter();
  const isPlayerX = useRef(false);
  const initialState = [null, null, null, null, null, null, null, null, null];
  const [state, setState] = useState([...initialState]);
  const [whoWon, setWhoWon] = useState("");
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const socket = io("https://asidefd.herokuapp.com", {
    transports: ["websocket"],
  });

  socket.on("updateState", (message) => {
    setState([...message]);
  });

  function updateBoard(i) {
    const temp = [...state];
    temp[i] = isPlayerX.current;
    socket.emit("updateState", {
      id: window.location.pathname.split("/").pop(),
      data: temp,
    });
  }

  function checkIfGameIsOver() {
    if (state.findIndex((i) => i === null) === -1) {
      setIsGameOver(true);
      setWhoWon("Draw");
    }
    if (
      (state[0] !== null && state[0] === state[1] && state[1] === state[2]) ||
      (state[3] !== null && state[3] === state[4] && state[4] === state[5]) ||
      (state[6] !== null && state[6] === state[7] && state[7] === state[8]) ||
      (state[0] !== null && state[0] === state[3] && state[3] === state[6]) ||
      (state[1] !== null && state[1] === state[4] && state[4] === state[7]) ||
      (state[2] !== null && state[2] === state[5] && state[5] === state[8]) ||
      (state[0] !== null && state[0] === state[4] && state[4] === state[8]) ||
      (state[2] !== null && state[2] === state[4] && state[4] === state[6])
    ) {
      setIsGameOver(true);
      if (isPlayerX.current && !isMyTurn) {
        setWhoWon("X");
      } else if (!isPlayerX.current && isMyTurn) {
        setWhoWon("X");
      } else {
        setWhoWon("O");
      }
    } else {
      setIsGameOver(false);
    }
  }

  function resetGame() {
    socket.emit("updateState", {
      id: window.location.pathname.split("/").pop(),
      data: [...initialState],
    });
  }

  function checkWhoseTurn() {
    if (isPlayerX.current) {
      setIsMyTurn(state.filter((i) => i !== null).length % 2 === 0);
    } else {
      setIsMyTurn(state.filter((i) => i !== null).length % 2 === 1);
    }
  }

  useEffect(() => {
    socket.emit("joinRoom", {
      id: window.location.pathname.split("/").pop(),
      data: [...initialState],
    });
    if (window.location.hash.indexOf("o") === -1) {
      isPlayerX.current = true;
      setIsMyTurn(true);
    }
  }, []);

  useEffect(() => {
    checkIfGameIsOver();
    checkWhoseTurn();
  }, [state]);

  return (
    <Layout currentPage={router.asPath} title="home">
      <div className="flex flex-col items-center justify-center h-screen ">
        <p className="pb-4 text-xl font-bold">
          {isMyTurn ? "Your Turn" : "Opponents Turn"}
        </p>
        <div
          id="board"
          className={`${
            isGameOver || !isMyTurn ? "pointer-events-none" : ""
          } grid grid-cols-3 grid-flow-row mx-auto bg-gray-200 p-6 rounded-lg content-center`}
        >
          {state.map((mark, i) => (
            <button
              className={`${
                mark !== null ? "pointer-events-none" : ""
              } p-10 bg-gray-400 square`}
              onClick={() => updateBoard(i)}
              key={i}
            >
              {mark && <Cross />}
              {mark === false && <Circle />}
              {mark === null && <div className="w-10 h-10" />}
            </button>
          ))}
        </div>
        <ShareButton />
        {isGameOver && <GameOver whoWon={whoWon} onClick={() => resetGame()} />}
      </div>
    </Layout>
  );
};

export default IndexPage;
