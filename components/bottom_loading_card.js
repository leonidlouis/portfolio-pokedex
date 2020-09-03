import React from "react";

const BottomLoadingCard = ({ isBottom }) => {
  if (!isBottom) return null;
  else
    return (
      <div className="card">
        <div className="card__item">Loading...</div>
      </div>
    );
};

export default BottomLoadingCard;
