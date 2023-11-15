import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="login_footer">
      <div className="login_footer_wrap">
        <Link to={"/"}>English(Uk) </Link>

        <Link to={"/"}>Francias(FR) </Link>

        <Link to={"/"}>English(Uk) </Link>

        <Link to={"/"}>English(Uk) </Link>

        <Link to={"/"}>English(Uk) </Link>

        <Link to={"/"}>English(Uk) </Link>

        <Link to={"/"}>English(Uk) </Link>

        <Link to={"/"}>English(Uk) </Link>

        <Link to={"/"}>English(Uk) </Link>

        <Link to={"/"}>English(Uk) </Link>

        <Link to={"/"} className="footer_square">
          <i className="plus_icon"></i>
        </Link>
      </div>
      <div className="footer_splitter"></div>
      <div className="login_footer_wrap">
        Est incididunt labore id velit est culpa dolore ullamco eu quis et id
        esse. Exercitation Lorem aliqua laborum pariatur culpa non Lorem
        reprehenderit amet ex labore laboris. Minim dolore cupidatat ex culpa
        est eu excepteur magna ex anim irure. Pariatur esse cupidatat amet
        exercitation commodo non esse. Occaecat ea officia non Lorem aute
        adipisicing ad consequat. Nisi sint sint adipisicing sit sunt consequat
        minim. Deserunt labore commodo et sint sint proident officia et amet
        esse ea elit.
        <br />
        <Link to={"/"}>
          AdChoices
          <i className="adChoices_icon"></i>
        </Link>
      </div>
      <div className="login_footer_wrap">
        <Link to={"/"} style={{ fontSize: "12px", marginTop: "10px" }}>
          {" "}
          Meta @ 2022
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
