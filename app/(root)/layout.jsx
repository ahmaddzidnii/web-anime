import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

const HomePageLayout = ({ children }) => {
  return (
    <div className="h-auto">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default HomePageLayout;
