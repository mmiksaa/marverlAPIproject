import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import useMarvelService from '../../services/MarvelService';
import { useState, useEffect } from 'react';

const ComicsList = () => {
  const {getAllComics} = useMarvelService();
  const [comicsList, setComicsList] = useState([]);

  useEffect(() => {
    getAllComics()
    .then(setComicsList);
  }, []);

  const renderItems = (array) => {
    let arrayComics = array.map((item) => {

      return (
      <li className="comics__item">
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


  // marvel.getCharacter();

    return (
        <div className="comics__list">
          {content}
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;