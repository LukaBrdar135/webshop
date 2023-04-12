import Logo from "../../assets/logo";
import classes from "./Footer.module.css";
import uiClasses from "../UI/UI.module.css";
import FooterAnimation from "./FooterAnimation";
import { Link } from "react-router-dom";
import LoginButton from "../navigation/login/LoginButton";
import NewsLetterForm from "./NewsLetterForm";
import FacebookIcon from "../../assets/icons8-facebook.svg";
import WhatsAppIcon from "../../assets/icons8-whatsapp-32.svg";
import TwitterIcon from "../../assets/icons8-twitter.svg";
import PinterestIcon from "../../assets/icons8-pinterest.svg";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.footerLayout}>
        <div className={`${classes.footerItem} ${classes.footerHome}`}>
          <Logo />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
            aut, recusandae facere perspiciatis rem distinctio corporis ea quis.
            Repudiandae nihil minima libero praesentium delectus ipsam dolor
            possimus deleniti, dolores iusto.
          </p>
        </div>
        <div className={`${classes.footerItem} ${classes.office}`}>
          <div className={classes.footerHeading}>
            <h4>Office</h4>
            <FooterAnimation />
          </div>
          <address>
            Bulevar Milutina Milankovica 9z, Beograd 11000, <br /> Srbija
          </address>
          <p>luka.brdar135@gmail.com</p>
          <h5>+381 - 607260072</h5>
        </div>
        <div className={classes.footerItem}>
          <div className={classes.footerHeading}>
            <h4>Links</h4>
            <FooterAnimation />
          </div>
          <div className={classes.footerLinkList}>
            <Link to="/shop" className={classes.linkListItem}>
              shop
            </Link>
            <Link to="/contact" className={classes.linkListItem}>
              contact
            </Link>
            <LoginButton className={classes.linkListItem} />
          </div>
        </div>
        <div className={classes.footerItem}>
          <div className={classes.footerHeading}>
            <h4>NewsLetter</h4>
            <FooterAnimation />
          </div>
          <NewsLetterForm />
          <div className={classes.socialMediaLinks}>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={FacebookIcon}
                alt=""
                className={classes.socialMediaLink}
              />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noreferrer">
              <img
                src={TwitterIcon}
                alt=""
                className={classes.socialMediaLink}
              />
            </a>
            <a
              href="https://www.whatsapp.com/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={WhatsAppIcon}
                alt=""
                className={classes.socialMediaLink}
              />
            </a>
            <a
              href="https://www.pinterest.com/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={PinterestIcon}
                alt=""
                className={classes.socialMediaLink}
              />
            </a>
          </div>
        </div>
      </div>
      <div className={`${classes.footerCopyRight} ${uiClasses.textCenter}`}>
        <p>WebShop &copy; {new Date().getFullYear()} - All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
