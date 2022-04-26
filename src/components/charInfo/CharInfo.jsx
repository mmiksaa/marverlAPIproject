import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './charInfo.scss';

const CharInfo = (props) => {
  
  const [char, setChar] = useState(null);
  
  const {getCharacter, clearError, process, setProcess} = useMarvelService();

  useEffect(() => {
    updateChar();
  }, [props.charId]);

  const updateChar = () => {
    const { charId } = props;
    if (!charId) {
      return;
    }

    getCharacter(charId)
      .then(onCharLoaded)
      .then(() => setProcess('confirmed'))
  }

  const onCharLoaded = (char) => {
    setChar(char);
  }


  return (
    <div className="char__info">
      {setContent(process, View, char)}
    </div>
  )
}

const View = ({ data }) => {
  const { name, description, thumbnail, hompage, wiki, comics } = data;

  let imgStyle = { 'objectPosition': 'center' };
  if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
    imgStyle = { 'objectPosition': 'left' };
  }

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt="abyss" style={imgStyle} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={hompage} className="button button__main">
              <div className="inner">hompage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">
        {description}
      </div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length > 0 ? null : 'This character has no comics'}
        {
          comics.map((item, i) => {
            if (i >= 10) return;

            return (
              <li className="char__comics-item" key={i}>
                {item.name}
              </li>
            )
          })
        }
      </ul>
    </>
  )
}

export default CharInfo;