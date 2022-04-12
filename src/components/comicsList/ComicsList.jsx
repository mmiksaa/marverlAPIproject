import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { useState, useEffect } from 'react';

const ComicsList = () => {
  const {getAllComics, loading, error} = useMarvelService();
  
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
  }

  const getMoreComics = (newComicsList) => {
    let ended = false;
    if (newComicsList.length < 8) {
      ended = true;
    }
    setComicsList([...comicsList, ...newComicsList]);
    setnewItemLoading(false);
    setOffset(offset + 8);
    setComicsEnded(ended);
  }

  const renderItems = (array) => {
    let arrayComics = array.map((item, i) => {

      return (
      <li className="comics__item" key={i}>
          <a href="#">
              <img src={item.thumbnail} alt="ultimate war" className="comics__item-img"/>
              <div className="comics__item-name">{item.title}</div>
              <div className="comics__item-price">{item.price}$</div>
          </a>
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

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;


    return (
        <div className="comics__list">
        {errorMessage}
        {spinner}
          {content}
            <button onClick={onRequest} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;