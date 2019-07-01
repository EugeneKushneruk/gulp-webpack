import React, { Component } from "react";


const GalleryItem = ({ item }) => {
  return (
    <div className="gallery__item">
      <img
        src={item.thumbnailUrl}
        alt={item.title}
        className="gallery__item-ic"
      />

      <p className="gallery__item-descr">{item.title}</p>

      <a href={item.url} target="_blank" className="gallery__item-link">Get full image</a>
    </div>
  )
};

const Gallery = ({ data }) => {
  return (
    <div className="gallery">
      <div className="gallery__container">
        {data.map((item) => <GalleryItem key={item.id} item={item} />)}
      </div>
    </div>
  )
};


export default Gallery;
