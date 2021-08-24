interface GameOverProps {
  onClick: () => void;
  whoWon: string;
}

export const GameOver: React.FC<GameOverProps> = ({
  onClick,
  whoWon,
}: GameOverProps) => {
  return (
    <div className="fixed z-50 p-4 text-center bg-white rounded-md shadow-2xl center-xy">
      <p className="pb-4 text-2xl font-bold">Game Over</p>
      <p className="pb-4 text-2xl font-bold">{whoWon} Won</p>
      <button onClick={() => onClick()} className="button-theme">
        Start over
      </button>
    </div>
  );
};
