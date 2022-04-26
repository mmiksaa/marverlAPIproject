import { useState } from 'react';
import {Helmet} from 'react-helmet';

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharSearchForm from '../charSearchForm/CharSearchForm';
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
      <Helmet>
        <meta name="description" content="Marvel information portal"/>
        <title>Marvel information portal</title>
      </Helmet>


      <ErrorBoundray>
        <RandomChar />
      </ErrorBoundray>
      <div className="char__content">
        <ErrorBoundray>
          <CharList onCharSelected={onCharSelected} />
        </ErrorBoundray>

      <div>
        <ErrorBoundray>
          <CharInfo charId={selectedChar} />
        <CharSearchForm/>
        </ErrorBoundray>
      </div>

      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  )
}

export default MainPage;