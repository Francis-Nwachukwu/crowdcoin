import { social } from "../../data";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <ul className="social-icons">
        {social.map((link) => {
          const { id, url, icon } = link;
          return (
            <li key={id}>
              <a href={url}>{icon}</a>
            </li>
          );
        })}
      </ul>
      <p>
        &copy; <span id="date">2022</span> devFrancis. All rights reserved.
      </p>
    </footer>
  );
};
export default Footer;
