import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

const IndexPage = () => {
  const router = useRouter();
  return (
    <Layout currentPage={router.route} title="Home">
      <h1>Hello Next.js 👋</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
    </Layout>
  );
};

export default IndexPage;
