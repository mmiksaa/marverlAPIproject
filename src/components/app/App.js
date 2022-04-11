import {useState} from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundray from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

const App = () => {

  const [selectedChar, setChar] = useState(null);

  const onCharSelected = (id) => {
    setChar(id)
  };


  return (
    <div className="app">
          <AppHeader/>
          <main>
            <ErrorBoundray> 
              <RandomChar/>
            </ErrorBoundray>
              <div className="char__content">
                <ErrorBoundray>
                  <CharList onCharSelected={onCharSelected}/>
                </ErrorBoundray>
                
                  <ErrorBoundray>
                    <CharInfo charId={selectedChar}/>
                  </ErrorBoundray>
              </div>
              <img className="bg-decoration" src={decoration} alt="vision"/>
          </main>
      </div>
  )
}

export default App;