import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
});

const setData = async (key: string, value: any) => {
  return storage.save({
    key: key,
    data: value,
    expires: null,
  });
};

const getData = async (key: string, defaultValue: any) => {
  return new Promise(resolve => {
    storage.load({
      key: key,
      autoSync: true,
      syncInBackground: false,
    }).then((data: any) => {
      resolve(data);
    }).catch((err: any) => {
      resolve(defaultValue);
    });
  });
};

export {
  storage,
  getData,
  setData,
};
