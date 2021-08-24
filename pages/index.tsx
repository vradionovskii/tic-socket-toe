import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { io } from "socket.io-client";
import { useEffect, useRef } from "react";

const IndexPage: React.FC = () => {
  const router = useRouter();
  const startButton = useRef();

  const socket = io("https://asidefd.herokuapp.com", {
    transports: ["websocket"],
  });

  const id = useRef();
  useEffect(() => {
    socket.on("message", (message) => {
      id.current = message;
    });
  }, []);

  function handleClick() {
    if (id.current) {
      router.push(`/${id.current}`);
    }
  }

  return (
    <Layout currentPage={router.asPath} title="Home">
      <div className="flex items-center justify-center h-screen">
        <button
          ref={startButton}
          className="button-theme"
          onClick={handleClick}
        >
          Start Game
        </button>
      </div>
    </Layout>
  );
};

export default IndexPage;
