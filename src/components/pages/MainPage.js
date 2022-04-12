import { useState } from 'react';
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundray from "../errorBoundary/ErrorBoundary";
import decoration from '../../resources/img/vision.png';

const MainPage = () => {

  const [selectedChar, setChar] = useState(null);

  const onCharSelected = (id) => {
    setChar(id)
  };

  return(
    <>
      <ErrorBoundray>
        <RandomChar />
      </ErrorBoundray>
      <div className="char__content">
        <ErrorBoundray>
          <CharList onCharSelected={onCharSelected} />
        </ErrorBoundray>

        <ErrorBoundray>
          <CharInfo charId={selectedChar} />
        </ErrorBoundray>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  )
}

export default MainPage;