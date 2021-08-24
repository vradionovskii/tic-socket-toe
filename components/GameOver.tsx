interface GameOverProps {
  onClick: () => void;
  whoWon: string;
  whoWonText: any;
}

export const GameOver: React.FC<GameOverProps> = ({
  onClick,
  whoWon,
  whoWonText,
}: GameOverProps) => {
  const winner = {
    X: whoWonText.x,
    O: whoWonText.o,
    Draw: whoWonText.draw,
  };

  return (
    <div className="fixed z-50 p-4 text-center bg-white rounded-md shadow-2xl center-xy">
      <p className="pb-4 text-2xl font-bold">{whoWonText.gameOver}</p>
      <p className="pb-4 text-2xl font-bold">{winner[whoWon]}</p>
      <button onClick={() => onClick()} className="button-theme">
        {whoWonText.startOver}
      </button>
    </div>
  );
};
