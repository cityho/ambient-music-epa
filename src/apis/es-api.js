const ESClient = require("./es-client");

module.exports = class EsApi {
  constructor() {
    this.client = new ESClient();
  }

  async getMusicInfo(id) {
    let queryString = {
      query: {
        match: {
          _id: id,
        },
      },
    };
    let response = await this.client.get(queryString);
    return response.hits.hits.map(({ _source }) => _source); // 한번에 여러개의 결과인 경우
  }
  async getPlaylist(id) {
    let queryString = {
      size: 400,
      query: {
        match: {
          playlist_id: id,
        },
      },
    };
    let response = await this.client.get(queryString);
    return response.hits.hits.map(({ _source }) => _source); // 한번에 여러개의 결과인 경우
  }
  async getAllPlaylists() {
    let queryString = {
      size: 0,
      aggs: {
        playlist: {
          multi_terms: {
            terms: [
              {
                field: "playlist_id.keyword",
              },
              {
                field: "playlist_name.keyword",
              },
              {
                field: "playlist_img_hrl.keyword",
              },
            ],
          },
        },
      },
    };
    let response = await this.client.get(queryString);
    return response;
  }
};
