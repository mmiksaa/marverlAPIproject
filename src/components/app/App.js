import { Component } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundray from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

class App extends Component {

  state = {
    selectedChar: null
  }

  onCharSelected = (id) => {
    this.setState({selectedChar: id})
  };


  render() {
    return (
      <div className="app">
            <AppHeader/>
            <main>
              <ErrorBoundray> 
                <RandomChar/>
              </ErrorBoundray>
                <div className="char__content">
                  <ErrorBoundray>
                    <CharList onCharSelected={this.onCharSelected}/>
                  </ErrorBoundray>
                  
                    <ErrorBoundray>
                      <CharInfo charId={this.state.selectedChar}/>
                    </ErrorBoundray>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
  }
}

export default App;