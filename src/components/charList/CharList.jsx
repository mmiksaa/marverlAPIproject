import React, { useState, useEffect, useRef } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import './charList.scss';

const CharList = (props) => {

  const [charList, setCharList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);

  const marvelService = new MarvelService();

  useEffect(() => {
    onRequest();
  }, [])

  const onRequest = (offset) => {
    onCharListLoading();
    marvelService.getAllCharacters(offset)
      .then(onCharListLoaded)
      .catch(onError)
  }

  const onCharListLoading = () => {
    setNewItemLoading(true)
  }

  const onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }

    setCharList(charList => [...charList, ...newCharList]);
    setLoading(loading => false);
    setNewItemLoading(newItemLoading => false);
    setOffset(offset => offset + 9);
    setCharEnded(charEnded => ended);
  }

  const onError = () => {
    setError(true);
    setLoading(false);
  }

  const itemRefs = useRef([]);

  const onActive = (id) => {
    itemRefs.current.forEach(item => item.classList.remove('char__item_selected'))
    itemRefs.current[id].classList.add('char__item_selected');
    itemRefs.current[id].focus();
  }


  function renderItems(arr) {
    const items = arr.map((item, i) => {
      let imgStyle = { 'objectPosition': 'center' };
      if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { 'objectPosition': 'left' };
      }

      return (
        <li
          ref={el => itemRefs.current[i] = el}
          tabIndex={0}
          key={item.id}
          className="char__item"
          onClick={() => {
            props.onCharSelected(item.id);
            onActive(i);
          }}>
          <img src={item.thumbnail} alt={item.name} style={imgStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      )
    });

    return (
      <ul className="char__grid">
        {items}
      </ul>
    )
  }

  const items = renderItems(charList);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? items : null;

  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {content}
      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        style={{ 'display': charEnded ? 'none' : 'block' }}
        onClick={() => onRequest(offset)}>
        <div className="inner">load more</div>
      </button>
    </div>
  )
}

export default CharList;