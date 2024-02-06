class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  _apiKey = "apikey=b0c1b3281849b1d2a376390c9d88873a";

  getResource = async (url) => {
    const res = await fetch(url);

    if (!res || !res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json(); // вернется промис
  };

  getAllCharacters = () => {
    return this.getResource(
      `${this._apiBase}characters?limit=9&offset=200&${this._apiKey}`
    );
  };

  getCharacter = async (id) => {
    const result = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
    return this._transformCharacter(result);
  };

  _transformCharacter = (result) => {
    return {
      name: result.data.results[0].name,
      description: result.data.results[0].description,
      thumbnail:
        result.data.results[0].thumbnail.path +
        "." +
        result.data.results[0].thumbnail.extension,
      homepage: result.data.results[0].urls[0].url,
      wiki: result.data.results[0].urls[1].url,
    };
  };
}

export default MarvelService;
