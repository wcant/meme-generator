import { useState, useEffect } from "react";
import Canvas from "./Canvas";

export default function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    image: "https://i.imgflip.com/gtj5t.jpg",
    height: 0,
    width: 0,
  });
  const [allMemes, setAllMemes] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  // surprised pikachu - https://i.imgflip.com/2kbn1e.jpg

  console.log(meme);

  function drawImage(context) {
    const image = new Image();
    image.onLoad = () => {
      context.drawImage(image, 0, 0);
    };
    image.src = meme.url;

    // context.fillStyle = "rgb(200, 0, 0)";
    // context.fillRect(10, 10, 50, 50);

    // context.fillStyle = "rgba(0, 0, 200, 0.5)";
    // context.fillRect(30, 30, 50, 50);
  }

  function getMemeImage() {
    const randomNum = Math.floor(Math.random() * 100);
    const url = allMemes[randomNum].url;
    const height = allMemes[randomNum].height;
    const width = allMemes[randomNum].width;
    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        image: url,
        height,
        width,
      };
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        [name]: value,
      };
    });
  }

  return (
    <main>
      <div className="form">
        <input
          type="text"
          placeholder="top text"
          name="topText"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="bottom text"
          name="bottomText"
          onChange={handleChange}
        />
        <button onClick={getMemeImage}>Get new meme image</button>
      </div>
      <Canvas draw={drawImage} height={meme.height} width={meme.width} />
      {/* <div className="meme">
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
        <img src={meme.image} alt="" />
      </div> */}
    </main>
  );
}
