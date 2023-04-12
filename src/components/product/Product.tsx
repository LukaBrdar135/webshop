import React, { useContext, useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { useNavigate, useParams } from "react-router-dom";
import { FIREBASE_URL } from "../../globals/GlobalConstants";
import useHttp from "../../hooks/use-http";
import Shop from "../../types/Shop";
import ShopItem from "../../types/ShopItem";
import Spinner from "../UI/Spinner";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from "./Product.module.css";
import Button from "../UI/Button";
import { CartContext } from "../../store/cart-context";
import ToastContext from "../../store/toast-context";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";

const ProductLayout: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const toastCtx = useContext(ToastContext);
  const cartCtx = useContext(CartContext);
  const [product, setProduct] = useState<ShopItem>();
  const [quantity, setQuantity] = useState<number | null>(1);
  const { isLoading, sendRequest } = useHttp();

  useEffect(() => {
    if (params && params.itemId && params.category) {
      const getItemFromData = (data: Shop[]) => {
        let category = data.find(
          (category) => category.routeName === params.category
        );

        if (category) {
          let item = category.items.find(
            (item) => item.id === +(params?.itemId ?? -1)
          );

          if (item) {
            if (!item.details) {
              navigate("/");
            }
            setProduct(item);
          } else {
            navigate("/");
          }
        } else {
          navigate("/");
        }
      };

      sendRequest(
        {
          url: FIREBASE_URL + "shop.json",
        },
        getItemFromData
      );
    }
  }, [params, sendRequest, navigate]);

  const addToCartHandler = () => {
    if (product) {
      cartCtx.addItem(product, quantity ?? 1);
      toastCtx.setToast("success", "Added to cart");
    }
  };

  const quantityChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.value) {
      if (+event.target.value > 100) {
        setQuantity(100);
      } else if (+event.target.value < 1) {
        setQuantity(1);
      } else {
        setQuantity(+event.target.value);
      }
    } else {
      setQuantity(null);
    }
  };

  const quantityInputBlurHandler = () => {
    if (!quantity) {
      setQuantity(1);
    }
  };

  return (
    <div>
      {isLoading && <Spinner />}
      {product && (
        <>
          <Breadcrumbs
            params={{ category: params.category!, itemId: product.name }}
          />
          <div className={classes.productInfoWrapper}>
            <div className={classes.carouselWrapper}>
              <Carousel
                showArrows={true}
                showThumbs={true}
                dynamicHeight={false}
                className={classes.carouselWrapper}
                swipeable={true}
              >
                {product.details?.images.map((url, index) => (
                  <div key={index} className={classes.imageWrapper}>
                    <img src={url} alt="" />
                  </div>
                ))}
              </Carousel>
            </div>
            <div className={classes.productInfo}>
              <h1>{product.name}</h1>
              <div className={classes.priceWrapper}>
                <input
                  type="number"
                  className={classes.quantityInput}
                  value={quantity ?? ""}
                  step="1"
                  onChange={quantityChangeHandler}
                  onBlur={quantityInputBlurHandler}
                />
                <h4>${product.price}</h4>
                <div className={classes.addToCartButton}>
                  <Button design="dark" onClick={addToCartHandler}>
                    Add to cart
                  </Button>
                </div>
              </div>
              <p className={classes.productDescription}>
                {product.details?.description}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductLayout;
