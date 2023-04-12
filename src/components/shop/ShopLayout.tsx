import React, { useCallback, useEffect, useState } from "react";
import { FIREBASE_URL } from "../../globals/GlobalConstants";
import useHttp from "../../hooks/use-http";
import Shop from "../../types/Shop";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import Spinner from "../UI/Spinner";
import LayoutItem from "./LayoutItem";

const ShopLayout: React.FC<{ category: string | undefined }> = ({
  category,
}) => {
  const { isLoading, sendRequest } = useHttp();
  const [shopItems, setShopItems] = useState<Shop[]>([]);

  const populateShopHandler = useCallback(
    (data: Shop[]) => {
      if (category) {
        setShopItems(data.filter((item) => item.routeName === category));
      } else {
        setShopItems(
          data.map((data) => {
            let updatedItems = data.items.slice(0, 4);
            data.items = updatedItems;
            return data;
          })
        );
      }
    },
    [category]
  );

  useEffect(() => {
    sendRequest(
      {
        url: FIREBASE_URL + "shop.json",
      },
      populateShopHandler
    );
  }, [sendRequest, populateShopHandler]);

  let params = {};
  if (category) {
    params = { category };
  }

  return (
    <div>
      <Breadcrumbs params={{ ...params }} />
      {isLoading && <Spinner />}
      {shopItems.map((categoryItem: Shop) => (
        <LayoutItem key={categoryItem.id} {...categoryItem} />
      ))}
    </div>
  );
};

export default ShopLayout;
