import React, { useState, useEffect, useRef } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import './charList.scss';
import { useMemo } from 'react';

const setContent = (process, Component, newItemLoading) => {
  switch (process) {
    case 'waiting':
      return <Spinner />
      break;
    case 'loading':
      return newItemLoading ? <Component /> : <Spinner /> 
      break;
    case 'confirmed':
      return <Component />
      break;
    case 'error':
      return <ErrorMessage />
      break;
    default:
      throw new Error('unexpected process state');
  }
}

const CharList = (props) => {

  const [charList, setCharList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);

  const {getAllCharacters, process, setProcess} = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, [])

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    
    getAllCharacters(offset)
      .then(onCharListLoaded)
      .then(() => setProcess('confirmed'));
  }

  const onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }

    setCharList(charList => [...charList, ...newCharList]);
    setNewItemLoading(newItemLoading => false);
    setOffset(offset => offset + 9);
    setCharEnded(charEnded => ended);
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
        key={i}
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

  const elements = useMemo(() => {
    return setContent(process, () => renderItems(charList), newItemLoading)
  }, [process]);

  return (
    <div className="char__list">
      {elements}
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