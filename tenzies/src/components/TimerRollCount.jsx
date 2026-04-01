export default function TimerRollCount({rolls, timer, gameWon}) {

  const suffix = timer === 1 ? "" : "s";

  const timerClass = gameWon ? "timer timer--win" : "timer";
  const rollCountClass = gameWon ? "roll-count roll-count--win" : "roll-count";

  return (
    <div className="timer-roll-count">
      <p className={timerClass}>Time: {timer} second{suffix}</p>
      <p className={rollCountClass}>Rolls: {rolls}</p>
    </div>
  )
}