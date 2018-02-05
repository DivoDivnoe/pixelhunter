var abstractModel = (function () {
'use strict';

class AbstractAdapter {
  toServer() {
    throw Error(`Abstract method. Define toServer method`);
  }
}

const defaultAdapter = new class extends AbstractAdapter {
  toServer(data) {
    return JSON.stringify(data);
  }
}();

class AbstractModel {
  get urlRead() {
    throw new Error(`You have to define urlRead`);
  }

  get urlWrite() {
    throw new Error(`You have to define urlWrite`);
  }

  get initialState() {
    throw new Error(`You have to define initialState`);
  }

  load() {
    return fetch(this.urlRead)
        .then((response) => response.json())
        .catch((error) => console.error(error));
  }

  save(data, adapter = defaultAdapter) {
    return fetch(this.urlWrite, {
      method: `POST`,
      body: adapter.toServer(data),
      headers: {
        'Content-Type': `application/json`
      }
    });
  }
}

return AbstractModel;

}());

//# sourceMappingURL=abstractModel.js.map
