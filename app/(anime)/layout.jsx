import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

const HomePageLayout = ({ children }) => {
  return (
    <div className="relative h-auto">
      <Navbar />
      <main className="container-custom mt-10 min-h-screen">{children}</main>
      <Footer />
    </div>
  );
};

export default HomePageLayout;
