import { useRouter } from "next/router";
import Layout from "../components/Layout";

const IndexPage: React.FC = () => {
  const router = useRouter();
  return (
    <Layout currentPage={router.route} title="Home">
      <h1>Welcome!</h1>
    </Layout>
  );
};

export default IndexPage;
