import React from 'react';

function Carousel({ images, caption }) {
  return (
    <div className="carousel-container">
      <div className="fixed-caption d-none d-md-block">
        <h5 className="display-1 fw-bolder text-capitalize">{caption.title}</h5>
        <p>{caption.paragraph}</p>
      </div>

      <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
        <div className="carousel-indicators">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>

        <div className="carousel-inner">
          {images.map((image, index) => (
            <div key={index} className={`carousel-item c-item ${index === 0 ? "active" : ""}`}>
              <img
                src={image.src}
                className="d-block w-100 c-img"
                alt={image.alt}
                onError={(e) => { 
                    e.target.onerror = null; e.target.src = `https://placehold.co/1000x700/FF0000/FFFFFF?text=Error+Loading+${image.alt.replace(/\s/g, '+')}`; 
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Carousel;