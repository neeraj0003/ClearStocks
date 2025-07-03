// GeneralContext.jsx
import React, { useState, createContext } from "react";
import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

const GeneralContext = createContext({
  openBuyWindow: (uid, onOrderComplete) => {},
  closeBuyWindow: () => {},
  openSellWindow: (uid, onOrderComplete) => {},
  closeSellWindow: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [onBuyComplete, setOnBuyComplete] = useState(null);
  const [onSellComplete, setOnSellComplete] = useState(null);

  const openBuyWindow = (uid, callback) => {
    setSelectedStockUID(uid);
    setIsBuyWindowOpen(true);
    setOnBuyComplete(() => callback);
  };

  const openSellWindow = (uid, callback) => {
    setSelectedStockUID(uid);
    setIsSellWindowOpen(true);
    setOnSellComplete(() => callback);
  };

  const closeBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
    if (onBuyComplete) onBuyComplete();
  };

  const closeSellWindow = () => {
    setIsSellWindowOpen(false);
    setSelectedStockUID("");
    if (onSellComplete) onSellComplete();
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow,
        closeBuyWindow,
        openSellWindow,
        closeSellWindow,
      }}
    >
      {props.children}
      {isBuyWindowOpen && (
        <BuyActionWindow uid={selectedStockUID} />
      )}
      {isSellWindowOpen && (
        <SellActionWindow uid={selectedStockUID} />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
