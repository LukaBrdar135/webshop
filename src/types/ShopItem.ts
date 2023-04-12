type ShopItem = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  details?: { description: string; images: string[] };
};

export default ShopItem;
