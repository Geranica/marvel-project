import { Component } from "react/cjs/react.production.min";
import PropTypes from "prop-types";

import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./charList.scss";
//import abyss from "../../resources/img/abyss.jpg";

class CharList extends Component {
  state = {
    chars: [],
    loading: true,
    error: false,
    newItemLoading: false,
    offset: 210,
    charEnded: false,
    selectedCharIndex: null,
  };

  marvelService = new MarvelService();

  handleClick(charId) {
    this.props.onCharSelected(charId);
    this.setState({ selectedCharIndex: charId });
  }

  componentDidMount() {
    this.onRequest();
  }

  onRequest = (offset) => {
    this.onCharListLoading();
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharsLoaded)
      .catch(this.onError);
  };

  onCharListLoading = () => {
    this.setState({ newItemLoading: true });
  };

  onCharsLoading = () => {
    this.setState({ loading: true });
  };
  onCharsLoaded = (newChars) => {
    let ended = false;

    if (newChars < 9) {
      ended = true;
    }

    this.setState(({ chars, offset }) => ({
      chars: [...chars, ...newChars],
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
      charEnded: ended,
    }));
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  renderItems(arr) {
    const items = arr.map((item) => {
      let imgClassName = "";
      let charCardClassName = "char__item";

      if (/image_not_available/.test(item.thumbnail)) {
        imgClassName += "char__item img dynamic-fit-unset";
      }

      if (item.id === this.state.selectedCharIndex) {
        charCardClassName += " char__item_selected";
      }

      return (
        <li
          className={charCardClassName}
          key={item.id}
          onClick={() => this.handleClick(item.id)}
        >
          <img src={item.thumbnail} alt={item.name} className={imgClassName} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });
    // А эта конструкция вынесена для центровки спиннера/ошибки
    return <ul className="char__grid">{items}</ul>;
  }

  render() {
    const { chars, loading, error, newItemLoading, offset, charEnded } =
      this.state;

    const items = this.renderItems(chars);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;

    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        <button
          style={{ display: charEnded ? "none" : "block" }}
          onClick={() => this.onRequest(offset)}
          disabled={newItemLoading}
          className="button button__main button__long"
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

CharList.propTypes = {
  onCharSelected: PropTypes.func,
};

export default CharList;
