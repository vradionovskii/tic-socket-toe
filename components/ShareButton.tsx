import { useState } from "react";
import { useCopyToClipboard } from "react-use";

export const ShareButton: React.FC = () => {
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
      {!hasCopied ? (
        "Share Link"
      ) : state.error ? (
        <p>Unable to copy</p>
      ) : (
        state.value && <p>Copied!</p>
      )}
    </button>
  );
};
