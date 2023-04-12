import Footer from "./components/footer/Footer";
import Navbar from "./components/navigation/Navbar";
import ToastsLayout from "./components/UI/Toasts/ToastsLayout";
import uiClasses from "./components/UI/UI.module.css";
import Router from "./router/Router";
import AuthProvider from "./store/AuthProvider";
import CartContextProvider from "./store/CartProvider";
import ToastContextProvider from "./store/ToastProvider";

function App() {
  return (
    <AuthProvider>
      <CartContextProvider>
        <ToastContextProvider>
          <Navbar />
          <div className={uiClasses.pageWrapper}>
            <div className={uiClasses.container}>
              <ToastsLayout />
              <Router />
            </div>
          </div>
          <Footer />
        </ToastContextProvider>
      </CartContextProvider>
    </AuthProvider>
  );
}

export default App;
