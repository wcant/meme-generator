import logo from "../images/troll-face.png";

export default function Header() {
  return (
    <header>
      <img src={logo} className="header--logo" alt="troll face" />
      <h1 className="header--title">Meme Generator</h1>
      <h3 className="header--subtitle">React Course - Project 3</h3>
    </header>
  );
}
