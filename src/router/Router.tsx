import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Spinner from "../components/UI/Spinner";
import HomePage from "../pages/HomePage";
import { AuthContext } from "../store/auth-context";

const ShopPage = React.lazy(() => import("../pages/ShopPage"));
const ContactPage = React.lazy(() => import("../pages/ContactPage"));
const LoginPage = React.lazy(() => import("../pages/LoginPage"));
const CheckoutPage = React.lazy(() => import("../pages/CheckoutPage"));
const ProductPage = React.lazy(() => import("../pages/ProductPage"));

export const routes = [
  { path: "/" },
  { path: "/shop" },
  { path: "/shop/:category" },
  { path: "/shop/:category/:itemId" },
  { path: "/contact" },
  { path: "/login" },
  { path: "/checkout" },
];

const Router: React.FC = () => {
  const authCtx = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/shop"
        element={
          <React.Suspense fallback={<Spinner />}>
            <ShopPage />
          </React.Suspense>
        }
      />
      <Route
        path="/shop/:category"
        element={
          <React.Suspense fallback={<Spinner />}>
            <ShopPage />
          </React.Suspense>
        }
      />
      <Route
        path="/shop/:category/:itemId"
        element={
          <React.Suspense fallback={<Spinner />}>
            <ProductPage />
          </React.Suspense>
        }
      />
      <Route
        path="/contact"
        element={
          <React.Suspense fallback={<Spinner />}>
            <ContactPage />
          </React.Suspense>
        }
      />
      {!authCtx.token ? (
        <>
          <Route
            path="/login"
            element={
              <React.Suspense fallback={<Spinner />}>
                <LoginPage />
              </React.Suspense>
            }
          />
        </>
      ) : (
        <>
          <Route path="/login" element={<Navigate to="/" />} />
          <Route
            path="/checkout"
            element={
              <React.Suspense fallback={<Spinner />}>
                <CheckoutPage />
              </React.Suspense>
            }
          />
        </>
      )}
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
};

export default Router;
