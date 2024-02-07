import { Component } from "react/cjs/react.production.min";
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
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.marvelService
      .getAllCharacters()
      .then(this.onCharsLoaded)
      .catch(this.onError);
  }

  onCharsLoading = () => {
    this.setState({ loading: true });
  };
  onCharsLoaded = (chars) => {
    this.setState({ chars, loading: false });
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  renderItems(arr) {
    const items = arr.map((item) => {
      let imgClassName = "";

      if (/image_not_available/.test(item.thumbnail)) {
        imgClassName += "char__item img dynamic-fit-unset";
      }

      return (
        <li className="char__item" key={item.id}>
          <img src={item.thumbnail} alt={item.name} className={imgClassName} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });
    // А эта конструкция вынесена для центровки спиннера/ошибки
    return <ul className="char__grid">{items}</ul>;
  }

  render() {
    const { chars, loading, error } = this.state;

    const items = this.renderItems(chars);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;

    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
