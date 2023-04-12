import { useParams } from "react-router-dom";
import ShopLayout from "../components/shop/ShopLayout";

const ShopPage: React.FC = () => {
  const params = useParams();

  return <ShopLayout category={params.category} />;
};

export default ShopPage;
