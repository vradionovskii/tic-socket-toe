import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { Circle } from "../components/Circle";
import { GameOver } from "../components/GameOver";
import { Cross } from "../components/Cross";
import { ShareButton } from "../components/ShareButton";

interface Props {
  data: any;
}

const IndexPage: React.FC<Props> = ({ data }: Props) => {
  const router = useRouter();
  const isPlayerX = useRef<boolean>(false);
  const initialState: null | boolean[] = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ];
  const [state, setState] = useState<null | boolean[]>([...initialState]);
  const [whoWon, setWhoWon] = useState<string>("");
  const [isMyTurn, setIsMyTurn] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  data.copy = { error: data.error, copied: data.copied, share: data.share };
  data.whoWon = {
    draw: data.draw,
    gameOver: data.gameOver,
    startOver: data.startOver,
    x: data.x,
    o: data.o,
  };

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
        setWhoWon("O");
      } else if (!isPlayerX.current && isMyTurn) {
        setWhoWon("O");
      } else {
        setWhoWon("X");
      }
      return;
    }

    if (state.findIndex((i) => i === null) === -1) {
      setIsGameOver(true);
      setWhoWon("Draw");
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
    checkWhoseTurn();
    checkIfGameIsOver();
  }, [state]);
  return (
    <Layout
      currentPage={router.asPath}
      title={`${data.title}${isPlayerX.current ? "X" : "O"}`}
    >
      <div className="flex flex-col items-center justify-center h-screen ">
        <p className="pb-4 text-xl font-bold">
          {isMyTurn ? data.yourTurn : data.opponentsTurn}
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
              } md:p-10 p-6 bg-gray-400 square`}
              onClick={() => updateBoard(i)}
              key={i}
            >
              {mark && <Cross />}
              {mark === false && <Circle />}
              {mark === null && <div className="w-10 h-10" />}
            </button>
          ))}
        </div>
        <ShareButton data={data.copy} />
        {isGameOver && (
          <GameOver
            whoWon={whoWon}
            whoWonText={data.whoWon}
            onClick={() => resetGame()}
          />
        )}
      </div>
    </Layout>
  );
};

export default IndexPage;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getServerSideProps({ locale }) {
  const data = await import(`../text/${locale}/slug.md`);

  return {
    props: {
      data: data.default.attributes,
    },
  };
}
