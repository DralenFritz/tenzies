const PIP_LAYOUTS = {
  1: [7],           // centre (standalone)
  2: [1, 6],        // top-left, bot-right
  3: [1, 7, 6],     // top-left, centre, bot-right
  4: [1, 2, 5, 6],  // all four corners
  5: [1, 2, 7, 5, 6], // four corners + centre
  6: [1, 2, 3, 4, 5, 6], // all six slots
};

export default function Die({ value, isHeld, hold, dieType }) {

  const pips = PIP_LAYOUTS[value]

  const styles = {
    backgroundColor: isHeld ? "#59E391" : "white"
  }

  return (
    <div className="die">
      <button 
        type="button" 
        style={styles} 
        className={dieType === "pips" ? `die-face ${isHeld ? "held" : ""}` : ""}
        onClick={hold}
        aria-pressed={isHeld}
        aria-label={`Die with value ${value}, ${isHeld ? "held" : "not held"}`}
      > 
        {dieType === "pips" ? (
          [1, 2, 3, 4, 5, 6, 7].map((slot) => (
            <span
              key={slot}
              className={`pip slot-${slot} ${pips.includes(slot) ? "visible" : ""}`}
            />
          ))
        ) 
        : 
        (
          <span className="die-number">{value}</span>
        )}
        
      </button>
    </div>
  )
}