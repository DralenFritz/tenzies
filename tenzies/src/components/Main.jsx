import Die from "./Die";
import TimerRollCount from "./TimerRollCount";
import { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti"

export default function Main({ dieType }) {
  const [dice, setDice] = useState(() => generateAllNewDice());
  const [rolls, setRolls] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  const timerRef = useRef(null);

  const gameWon = dice.every((die) => die.value === dice[0].value) && 
      dice.every((die) => die.isHeld);

  const newGameButtonRef = useRef(null);

  // starts timer when first die is held, stops timer when game is won

  useEffect(() => {
    if (timerActive && !gameWon) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000)
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [timerActive, gameWon]);

  // when dieType changes, reset the game
  // when a user changes from numbers version to pips version and vice versa

  useEffect(() => {
    setDice(generateAllNewDice());
    setRolls(0);
    setTimer(0);
    setTimerActive(false);
  }, [dieType]);

  useEffect(() => {
    if (gameWon) {
      document.title = "Tenzies - You Win!";
      newGameButtonRef.current.focus();
    } else {
      document.title = "Tenzies";
    }
  }, [gameWon]);

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  function rollDice() {
    if (!gameWon) {
      setDice((oldDice) => oldDice.map(
        (die) => die.isHeld ? die : {
          ...die, 
          value: Math.ceil(Math.random() * 6)
        }
      ));
      setRolls((oldRolls) => oldRolls + 1);
      setTimerActive(true);
    } else {
      setDice(generateAllNewDice());
      setRolls(0);
      setTimer(0);
      setTimerActive(false);
    }
  }
  
  function hold(id) {
    setDice((oldDice) => oldDice.map(
      (die) => die.id === id ? {
        ...die,
        isHeld: !die.isHeld
      } : die
    ));
    setTimerActive(true);
  }

  const diceElements = dice.map((dieObject) => (
    <Die 
      key={dieObject.id} 
      value={dieObject.value} 
      isHeld={dieObject.isHeld} 
      hold={() => hold(dieObject.id)} 
      dieType={dieType}
    />
  ));

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
  
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <TimerRollCount 
        rolls={rolls} 
        timer={timer}
        gameWon={gameWon}
      />
      <main>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">{diceElements}</div>

        <button ref={newGameButtonRef} className="roll-dice" type="button" onClick={rollDice}>
          { gameWon ? "New Game" : "Roll"}
        </button>

        {gameWon && <Confetti
            width={windowSize.width}
            height={windowSize.height}
            style={{ position: "fixed", top: 0, left: 0 }}
          />}

          <div aria-live="polite" className="sr-only">
            {gameWon && <p>Congratulations! You've won the game!</p>}
          </div>

      </main>
    
    </>
  );
} 