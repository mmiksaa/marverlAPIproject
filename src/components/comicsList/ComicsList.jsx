import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

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

const ComicsList = () => {
  const {getAllComics, loading, error, process, setProcess} = useMarvelService();
  
  const [offset, setOffset] = useState(0);
  const [newItemLoading, setnewItemLoading] = useState(false);
  const [comicsEnded, setComicsEnded] = useState(false);
  const [comicsList, setComicsList] = useState([]);

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setnewItemLoading(false) : setnewItemLoading(true);
    getAllComics(offset)
      .then(getMoreComics)
      .then(() => setProcess('confirmed'))
  }

  const getMoreComics = (newComicsList) => {
    let ended = false;
    if (newComicsList.length < 8) {
      ended = true;
    }
    setnewItemLoading(false);
    setOffset(offset => offset + 8);
    setComicsList([...comicsList, ...newComicsList]);
    setComicsEnded(ended);
  }

  const renderItems = (array) => {
    let arrayComics = array.map((item, i) => {

      return (
      <li className="comics__item" key={i}>
          <Link to={`/comics/${item.id}`}>
              <img src={item.thumbnail} alt="ultimate war" className="comics__item-img"/>
              <div className="comics__item-name">{item.title}</div>
              <div className="comics__item-price">{item.price}</div>
          </Link>
      </li>
      )
    })

    return (
      <ul className="comics__grid">
        {arrayComics}
      </ul>
    )
  }

  const content = renderItems(comicsList);


    return (
        <div className="comics__list">
        {setContent(process, () => renderItems(comicsList), newItemLoading)}
            <button onClick={() => onRequest(offset)} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;