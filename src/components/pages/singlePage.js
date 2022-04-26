import './singlePage.scss';

import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {Helmet} from 'react-helmet';

import useMarvelService from '../../services/MarvelService';
import AppBanner from '../appBanner/AppBanner';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const SinglePage = ({type}) => {
  
  const {id} = useParams();
  const [data, setData] = useState(null);
  const [page, setPage] = useState(null);
  const {loading, error, getComic, getCharacter, clearError} = useMarvelService();

  useEffect(() => {
    updateData();
  }, [id]);

  const updateData = () => {
    clearError();

    switch (type) {
      case 'comic':
        getComic(id)
          .then(onDataLoaded)
        break;
      case 'char':
        getCharacter(id)
          .then(onDataLoaded)
    }
  }

  const onDataLoaded = (data) => {
    setData(data);
    
    switch (type) {
      case 'comic':
        setPage(<Comic data={data}/>)
        break;
      case 'char':
        setPage(<Character data={data}/>)
    }
  }

  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const content = !(loading || error || !data) ? page : null;

  return (
    <>
      <AppBanner/>
      {spinner}
      {errorMessage}
      {content}
    </>
  )
}

const Comic = ({data}) => {
  const {title, description, pageCount, thumbnail, language, price} = data;

  return (
    <>
    <Helmet>
      <meta name="description" content={`${title} comic book`}  />
      <title>{title}</title>
    </Helmet>

    <div className="single-comic">
      <img src={thumbnail} alt={title} className="single-comic__img"/>
      <div className="single-comic__info">
          <h2 className="single-comic__name">{title}</h2>
          <p className="single-comic__descr">{description}</p>
          <p className="single-comic__descr">{pageCount}</p>
          <p className="single-comic__descr">Language: {language}</p>
          <div className="single-comic__price">{price}</div>
      </div>
      <Link to="/comics" className="single-comic__back">Back to all</Link>
    </div>
    </>
  )
}

const Character = ({data}) => {
  const {name, description, thumbnail} = data;

  return (
    <>
    <Helmet>
      <meta name="description" content={`${name} character info`}  />
      <title>{name}</title>
    </Helmet>

    <div className="single-comic">
      <img src={thumbnail} alt={name} className="single-comic__img"/>
      <div className="single-comic__info">
          <h2 className="single-comic__name">{name}</h2>
          <p className="single-comic__descr">{description}</p>
      </div>
    </div>
    </>
  )
}


export default SinglePage;