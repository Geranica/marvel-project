import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./charList.scss";
//import abyss from "../../resources/img/abyss.jpg";

const CharList = (props) => {
  const [chars, setChars] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);
  const [selectedCharIndex, setSelectedCharIndex] = useState(null);

  const { loading, error, getAllCharacters } = useMarvelService();

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllCharacters(offset).then(onCharsLoaded);
  };

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onCharsLoaded = (newChars) => {
    let ended = false;

    if (newChars < 9) {
      ended = true;
    }
    setChars((chars) => [...chars, ...newChars]);
    setNewItemLoading((newItemLoading) => false);
    setOffset((offset) => offset + 9);
    setCharEnded((charEnded) => ended);
  };

  /* const focusInItem = (id) => {
    itemRefs.current.forEach(item => {
      item.classList.remove('char__item_selected')
    });
    itemRefs.current[id].classList.add('char__item_selected')
    itemRefs.current[id].focus()
  }

  const itemRefs = useRef([]);
    */

  const handleClick = (charId) => {
    props.onCharSelected(charId);
    setSelectedCharIndex(charId);
  };

  /* const onCharsLoading = () => {
    setLoading(true);
  }; */

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      let imgClassName = "";
      let charCardClassName = "char__item";

      if (/image_not_available/.test(item.thumbnail)) {
        imgClassName += "char__item img dynamic-fit-unset";
      }

      if (item.id === selectedCharIndex) {
        charCardClassName += " char__item_selected";
      }

      return (
        <li
          /*  ref={el => itemRefs.current[i] = el} */
          className={charCardClassName}
          key={item.id}
          onClick={() => handleClick(item.id)}
        >
          <img src={item.thumbnail} alt={item.name} className={imgClassName} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });
    // А эта конструкция вынесена для центровки спиннера/ошибки
    return <ul className="char__grid">{items}</ul>;
  }

  const items = renderItems(chars);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newItemLoading ? <Spinner /> : null;
  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {items}
      <button
        style={{ display: charEnded ? "none" : "block" }}
        onClick={() => onRequest(offset)}
        disabled={newItemLoading}
        className="button button__main button__long"
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  onCharSelected: PropTypes.func,
};

export default CharList;
