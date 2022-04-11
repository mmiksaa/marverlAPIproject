import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

const CharInfo = (props) => {

  const [char, setChar] = useState(null);

  const {loading, error, getCharacter, clearError} = useMarvelService();

  useEffect(() => {
    updateChar();
  }, [props.charId]);

  const updateChar = () => {
    clearError();

    const { charId } = props;
    if (!charId) {
      return;
    }

    getCharacter(charId)
      .then(onCharLoaded)
  }

  const onCharLoaded = (char) => {
    setChar(char);
  }

  const skeleton = char || loading || error ? null : <Skeleton />
  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const content = !(loading || error || !char) ? <View char={char} /> : null;


  return (
    <div className="char__info">
      {skeleton}
      {spinner}
      {errorMessage}
      {content}
    </div>
  )
}

const View = ({ char }) => {
  const { name, description, thumbnail, hompage, wiki, comics } = char;

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