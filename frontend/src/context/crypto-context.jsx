import { createContext, useContext, useEffect, useState } from "react";
import { fakeFecthCrypto, fecthAssets } from "../api";
import { precentDifference } from "../utils";

// Базовые начальные значения контекста
const CryptoContext = createContext({ assets: [], crypto: [], loading: false });

export function CryptoContextProvide({ children }) {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);

  function mapAssets(assets, result) {
    return assets.map((asset) => {
      // Получение монеты
      const coin = result.find((c) => c.id === asset.id);
      return {
        name: coin.name,
        // Сравнение цены
        grow: asset.price < coin.price,
        // Сравнение в %
        growPercent: precentDifference(asset.price, coin.price),
        // Актуальная цена
        totalAmount: asset.amount * coin.price,
        // Актуальная прибыл
        totalProfit: asset.amount * coin.price - asset.amount * asset.price,
        ...asset,
      };
    });
  }

  // Загрузка данных с Facke-API
  useEffect(() => {
    async function preload() {
      setLoading(true);
      const { result } = await fakeFecthCrypto();
      const assets = await fecthAssets();
      setCrypto(result);
      setAssets(mapAssets(assets, result));
      setLoading(false);
    }
    preload();
  }, []);

  function addAsset(newAsset) {
    setAssets((prev) => mapAssets([...prev, newAsset], crypto));
  }

  return (
    <CryptoContext.Provider value={{ loading, crypto, assets, addAsset }}>
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoContext;

export function useCrypto() {
  return useContext(CryptoContext);
}
