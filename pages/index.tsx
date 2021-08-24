import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { io } from "socket.io-client";
import { useEffect, useRef } from "react";

interface Props {
  data: Record<string, unknown>;
}

const IndexPage: React.FC<Props> = ({ data }: Props) => {
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
    <Layout currentPage={router.asPath} title={`${data.title}`}>
      <div className="flex items-center justify-center h-screen">
        <button
          ref={startButton}
          className="button-theme"
          onClick={handleClick}
        >
          {data.buttonText}
        </button>
      </div>
    </Layout>
  );
};

export default IndexPage;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getStaticProps({ locale }) {
  const data = await import(`../text/${locale}/homepage.md`);

  return {
    props: {
      data: data.default.attributes,
    },
  };
}
