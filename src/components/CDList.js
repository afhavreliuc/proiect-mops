import React from "react";

const CDList = ({ addToCart }) => {
  const cds = [
    { id: 1, title: "Album 1", price: 50 },
    { id: 2, title: "Album 2", price: 60 },
    { id: 3, title: "Album 3", price: 70 },
  ];

  return (
    <div>
      <h2>Lista CD-uri</h2>
      <ul>
        {cds.map((cd) => (
          <li key={cd.id} style={{ marginBottom: "10px" }}>
            <strong>{cd.title}</strong> - {cd.price} RON
            <button
              onClick={() => addToCart(cd)}
              style={{ marginLeft: "10px" }}
            >
              Adaugă în coș
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CDList;
