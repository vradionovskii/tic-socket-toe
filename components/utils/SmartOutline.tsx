import React, { useEffect } from "react";

const SmartOutline: React.FC = () => {
  useEffect(() => {
    function handleFirstTab(e) {
      if (e.keyCode === 9) {
        // the "I am a keyboard user" key
        document.body.classList.add("user-is-tabbing");
        window.removeEventListener("keydown", handleFirstTab);
      }
    }

    window.addEventListener("keydown", handleFirstTab);
    return () => {
      window.removeEventListener("keydown", handleFirstTab);
    };
  }, []);
  return (
    <>
      <style>{`
        body:not(.user-is-tabbing) button:focus,
        body:not(.user-is-tabbing) input:focus,
        body:not(.user-is-tabbing) select:focus,
        body:not(.user-is-tabbing) textarea:focus {
          outline: none;
        }
      `}</style>
    </>
  );
};

export default SmartOutline;
