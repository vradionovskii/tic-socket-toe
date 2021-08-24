import { useState } from "react";
import { useCopyToClipboard } from "react-use";

interface Props {
  data: Record<string, unknown>;
}

export const ShareButton: React.FC<Props> = ({ data }: Props) => {
  const [state, copyToClipboard] = useCopyToClipboard();
  const [hasCopied, setHasCopied] = useState(false);
  const getLink = () => {
    return window.location.origin + window.location.pathname + "#o";
  };

  function handleClick() {
    if (navigator.share) {
      navigator
        .share({
          title: "Tic Socket Toe",
          url: getLink(),
        })
        .catch(console.error);
    } else {
      // fallback
      copyToClipboard(getLink());
      setHasCopied(true);
      setTimeout(() => {
        setHasCopied(false);
      }, 1000);
    }
  }

  return (
    <button
      onClick={() => handleClick()}
      className="px-4 py-1 mt-4 border-2 border-black rounded-md"
    >
      {!hasCopied ? data.share : state.error ? data.error : data.copied}
    </button>
  );
};
