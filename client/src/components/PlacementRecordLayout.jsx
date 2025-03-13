import Footer from "./Footer";
import Navbar from "./Navbar";

const PlacementRecordLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default PlacementRecordLayout;
