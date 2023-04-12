import ShopItem from "./ShopItem";

type Shop = {
  id: number;
  items: ShopItem[];
  routeName: string;
  title: string;
};

export default Shop;
