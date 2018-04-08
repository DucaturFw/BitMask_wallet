class Storage {
  constructor() {}

  get(key) {
    return new Promise(resolve => {
      chrome.storage.local.get(key, function(result) {
        console.log(result);
        resolve(result[key]);
      });
    });
  }

  set(key, value) {
    return new Promise(resolve => {
      chrome.storage.local.set({ [key]: value }, function() {
        resolve();
      });
    });
  }
}

const storage = new Storage();

export default storage;
