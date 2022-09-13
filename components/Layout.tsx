import Footer from "./Footer";
import Navbar from "./Navbar";

type ComponentWithChildProps = React.PropsWithChildren<{ example?: string }>;

const Layout = ({ children }: ComponentWithChildProps) => {
  return (
    <>
      <Navbar />
      {children}
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
