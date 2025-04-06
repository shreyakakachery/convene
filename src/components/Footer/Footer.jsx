import "./Footer.scss";

function Footer() {
  return (
    <div className="footer">
      <div className="footer__left">
        <h4 className="footer__flair">🚌 ࿐ ࿔*:･ﾟ</h4>
        <h4 className="footer__copyright">&copy; Shreya Kakachery 2025</h4>
      </div>
      <div className="footer__right">
        <a className="footer__feedback-link" href="/feedback">
          {" "}
          Give Feedback
        </a>
      </div>
    </div>
  );
}

export default Footer;
