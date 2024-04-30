// Эмулирование API

import { cryptoAssets, cryptoData } from "./data";

export function fakeFecthCrypto() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoData);
    }, 1);
  });
}

export function fecthAssets() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoAssets);
    }, 1);
  });
}
