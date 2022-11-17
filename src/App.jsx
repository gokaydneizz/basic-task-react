import React, { useState } from "react";
import Image from "./Components/Image";
import ProductData from "./product-data.json";

function App() {
  const { productTitle, selectableAttributes, productVariants, baremList } =
    ProductData;
  const productPrice = 20;
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const [userAmountInput, setUserAmountInput] = useState();
  let baremRange = 0;

  if (+userAmountInput >= 120 && +userAmountInput <= 599) {
    baremRange = 0;
  } else if (+userAmountInput >= 600 && +userAmountInput <= 799) {
    baremRange = 1;
  } else if (+userAmountInput >= 800 || +userAmountInput >= 2000) {
    baremRange = 2;
  }

  let price = 0;

  if (baremRange === 0) {
    price = 9.5 * +userAmountInput;
  } else if (baremRange === 1) {
    price = 8.46 * +userAmountInput;
  } else if (baremRange === 2) {
    price = 7.13 * +userAmountInput;
  }

  const selectedVariant = productVariants.filter(
    (variant) =>
      variant.attributes[0].value === selectedSize &&
      variant.attributes[1].value === selectedColor
  );

  const doesItHaveSizes = productVariants.filter((variant) =>
    variant.attributes[1].value.includes(selectedColor)
  );

  const selectColorHandler = (color) => {
    setSelectedColor(color);
    setSelectedSize(null);
  };

  const logHandler = () => {
    console.log(selectedVariant[0].id);
    console.log(baremList[baremRange]);

    const obj = {
      selectedVariantId: selectedVariant[0].id,
      selectedBarem: baremList[baremRange],
    };
  };

  const buttonDisabled = !selectedColor || !selectedSize || !userAmountInput;
  console.log(buttonDisabled);

  return (
    <main className="app-container">
      <div className="image-container">
        {selectedVariant.length > 0 ? (
          <Image img={selectedVariant[0]?.images} />
        ) : (
          <img src={productVariants[0].images[0]} alt="" />
        )}
      </div>
      <div className="content-container">
        <h1 className="product-title">{productTitle}</h1>
        <div className="product-price">
          {productPrice} TL <span>/Adet</span>
        </div>
        <div className="attributes">
          <div className="attribute">
            <div className="attribute-name">
              {selectableAttributes[0].name} :{" "}
            </div>
            {selectableAttributes[0].values.map((attr, idx) => (
              <button
                className={
                  selectedColor === attr ? "select-btn selected" : "select-btn"
                }
                onClick={() => selectColorHandler(attr)}
                key={idx}
              >
                {attr}
              </button>
            ))}
          </div>
          <div className="attribute">
            <div className="attribute-name">
              {selectableAttributes[1].name} :{" "}
            </div>
            {selectableAttributes[1].values.map((attr, idx) => (
              <button
                disabled={
                  !doesItHaveSizes.filter((a) =>
                    a.attributes[0].value.includes(attr)
                  ).length > 0
                }
                className={
                  selectedSize === attr ? "select-btn selected" : "select-btn"
                }
                onClick={() => setSelectedSize(attr)}
                key={idx}
              >
                {attr}
              </button>
            ))}
          </div>
        </div>
        <div className="wholesale-div">
          <div className="wholesale">
            <span>Toptan Fiyat (Adet) :</span>
            {baremList.map((barem, idx) => (
              <div
                className={baremRange === idx ? "barem selected" : "barem"}
                key={idx}
              >
                <span className="barem-amount">
                  {barem.minimumQuantity} -
                  {barem.maximumQuantity > 2000
                    ? "2000+"
                    : `${barem.maximumQuantity}`}
                </span>
                <span className="barem-price">{barem.price}TL</span>
              </div>
            ))}
          </div>
          <div className="amount-div">
            <span>Adet : </span>
            <input
              onChange={(e) => setUserAmountInput(e.target.value)}
              type="text"
            />
            <span>Adet</span>
          </div>
        </div>
        <div className="allPrice">
          <div className="sum">
            Toplam :{" "}
            <span>{isNaN(price.toFixed(2)) ? 20 : price.toFixed(2)}</span>
          </div>
        </div>
        <div className="complete">
          <div className="shipmentPrice">
            Kargo Ücreti : <span>Alıcı Öder</span>
          </div>
          <div className="last-div">
            <button
              disabled={buttonDisabled}
              onClick={() => logHandler()}
              className="add-cart-btn"
            >
              Sepete Ekle
            </button>
            <span className="payment-methods">Ödeme Seçenekleri</span>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
