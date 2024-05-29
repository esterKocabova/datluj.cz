import React, { useState, useEffect, useCallback } from 'react';
import './style.css';
interface IWordboxProp {
  word: string;
}
const Wordbox: React.FC<IWordboxProp> = ({ word }) => {
  const [lettersLeft, setLettersLeft] = useState<string>(word);
  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    setLettersLeft((prevLettersLeft) => {
      if (prevLettersLeft.length === 0) {
        return prevLettersLeft;
      }
      if (event.key === prevLettersLeft[0]) {
        return prevLettersLeft.slice(1);
      }
      return prevLettersLeft;
    });
  }, []);
  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyUp]);
  return (
    <div className="wordbox">{lettersLeft}</div>
  );
};
export default Wordbox;