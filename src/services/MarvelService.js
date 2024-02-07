class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  _apiKey = "apikey=b0c1b3281849b1d2a376390c9d88873a";

  getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json(); // вернется промис
  };

  getAllCharacters = async () => {
    const result =  await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
    return result.data.results.map((char) => this._transformCharacter(char));
  };

  getCharacter = async (id) => {
    const result = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
    return this._transformCharacter(result.data.results[0]);
  };

  _transformCharacter = (char) => {
    return {
      id:char.id,
      name: char.name,
      description: char.description,
      thumbnail:
        char.thumbnail.path +
        "." +
        char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
    };
  };
}

export default MarvelService;

