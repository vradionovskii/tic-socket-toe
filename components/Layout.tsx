import SmartOutline from "./utils/SmartOutline";
import Header from "./Header";
import SEO from "./utils/seo";
type Props = {
  title?: string;
  children?: React.ReactNode;
  currentPage: string;
};

const Layout: React.FC<Props> = ({ children, title, currentPage }: Props) => {
  return (
    <>
      <SmartOutline />
      <Header currentPage={currentPage} />
      <SEO title={title} />
      {children}
    </>
  );
};

export default Layout;
