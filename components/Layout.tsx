import SmartOutline from "./utils/SmartOutline";
import SEO from "./utils/seo";
import Header from "./Header";
type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({
  children,
  currentPage,
  title = "This is the default title",
}: Props) => (
  <>
    <SmartOutline />
    <Header currentPage={currentPage} />
    <SEO title={title} />
    {children}
  </>
);

export default Layout;
