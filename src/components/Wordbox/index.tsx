import React, { useState, useEffect } from 'react';
import './style.css';
interface IWordboxProp {
  word: string;
  active: boolean;
  onFinish: () => void;
}
const Wordbox : React.FC<IWordboxProp> = ({ word, onFinish, active }) => {
  const [lettersLeft, setLettersLeft] = useState<string>(word);  
  const [mistake, setMistake] = useState<boolean>(false);
  useEffect(() => {
    if (!active) return;
    const handleKeyUp = (event: KeyboardEvent) => {
      setLettersLeft((prevLettersLeft) => {
        if (prevLettersLeft.length === 0) {
          return prevLettersLeft;
        }
        if (event.key === prevLettersLeft[0]) {
          setMistake(false);
          const newLettersLeft = prevLettersLeft.slice(1);
          if (newLettersLeft.length === 0) {
            onFinish();
          }
          return newLettersLeft;
        } else {
          setMistake(true);
        }
        return prevLettersLeft;
      });
    };
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [active, onFinish]);
  return (
    <div className={`wordbox ${mistake ? 'wordbox--mistake' : ''}`}>{lettersLeft}</div>
  );
};
export default Wordbox;