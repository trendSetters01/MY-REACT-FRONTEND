import React from "react";

const Card = ({ title, children, className }) => {
  return (
    <section
      className={
        className
          ? `${className}card col-span-12 overflow-hidden bg-base-100 shadow-sm xl:col-span-6`
          : `card col-span-12 overflow-hidden bg-base-100 shadow-sm xl:col-span-6`
      }
    >
      <div className="card-body grow-0">
        <h2 className="card-title">{title}</h2>
      </div>
      {children}
    </section>
  );
};

export default Card;
