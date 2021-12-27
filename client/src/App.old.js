import Square from './Square';
import styles from './app.module.css'
import { useState } from 'react';
import Population from './population/population'; 

const hexGen = () => {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
  return color;
}

function App() {

  const initalSquares = Array(40)
    .fill()
    .map((e, i) => <Square color={hexGen()} key={i} />);
  const [squares, setSquares] = useState(initalSquares);
  
  const generate =  () => {
    setSquares(Array(40).fill().map((e, i) => <Square color = {hexGen()} key = {i}/>))
  }

  return (
    <>
      <button onClick={generate}>Generate</button>
      <div className={styles.container}>{squares}</div>
      <Population/>
    </>
  );
}

export default App;
