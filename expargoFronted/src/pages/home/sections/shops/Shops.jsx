import React, { useRef, useEffect } from 'react';
import style from './Shops.module.scss';

const Shops = () => {
  const scrollRef = useRef(null);

  // Avtomatik yavaş-yavaş sağa sürüş
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += 1;
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  // Drag scroll üçün dəyişənlər
  let isDown = false;
  let startX;
  let scrollLeft;

  const handleMouseDown = (e) => {
    isDown = true;
    startX = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft = scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = 'grabbing';
  };

  const handleMouseLeaveOrUp = () => {
    isDown = false;
    scrollRef.current.style.cursor = 'grab';
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // sürüşmə sürəti
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const images = [
    { src: 'https://expargo.com/assets/img/slide/expargo-logos-01.png', link: 'https://www.flo.com.tr/' },
    { src: 'https://expargo.com/assets/img/slide/expargo-logos-02.png', link: 'https://www.trendyol.com/' },
    { src: 'https://expargo.com/assets/img/slide/expargo-logos-03.png', link: 'https://www.boyner.com.tr/' },
    { src: 'https://expargo.com/assets/img/slide/expargo-logos-04.png', link: 'https://www.hepsiburada.com/magaza/gitti-gidiyor' },
    { src: 'https://expargo.com/assets/img/slide/expargo-logos-08.png', link: 'https://shop.mango.com/tr/tr' },
    { src: 'https://expargo.com/assets/img/slide/expargo-logos-09.png', link: 'https://www.zara.com/tr/' },
    { src: 'https://expargo.com/assets/img/slide/expargo-logos-10.png', link: 'https://www.hepsiburada.com/' },
    { src: 'https://expargo.com/assets/img/slide/expargo-logos-12.png', link: 'https://www.defacto.com.tr/' },
    { src: 'https://expargo.com/assets/img/slide/expargo-logos-13.png', link: 'https://www.boyner.com.tr/?srsltid=AfmBOory33MD_krtJS0hPtYcaZoPRH4wbqznoVax5ilbCfL1YDFn1L8A' },
    { src: 'https://expargo.com/assets/img/slide/expargo-logos-15.png', link: 'https://www.lcwaikiki.it/en-US/IT' },
    { src: 'https://expargo.com/assets/img/slide/expargo-logos-17.png', link: 'https://www.mavicompany.com/en' },
    { src: 'https://expargo.com/assets/img/slide/expargo-logos-19.png', link: 'https://www.stradivarius.com/tr/' },
    { src: 'https://expargo.com/assets/img/slide/expargo-logos-24.png', link: 'https://www.e-bebek.com/' },
    { src: 'https://expargo.com/assets/img/slide/expargo-logos-26.png', link: 'https://www.gratis.com/' },
    { src: 'https://expargo.com/assets/img/slide/badge-01.png', link: 'https://www.ebay.com/' },
    { src: 'https://expargo.com/assets/img/slide/badge-02.png', link: 'https://www.amazon.com/' },
    { src: 'https://expargo.com/assets/img/slide/badge-03.png', link: 'https://www.asos.com/' },
    { src: 'https://expargo.com/assets/img/slide/badge-05.png', link: 'https://www.sephora.com/' },
    { src: 'https://expargo.com/assets/img/slide/badge-06.png', link: 'https://www.victoriassecret.com/az/' },
    { src: 'https://expargo.com/assets/img/slide/badge-07.png', link: 'https://az.iherb.com/' },
  ];

  return (
    <div className={style.shops}>
      <div className={style.container}>
        <h2>Mağazalar</h2>
        <div
          className={style.imageWrapper}
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeaveOrUp}
          onMouseUp={handleMouseLeaveOrUp}
          onMouseMove={handleMouseMove}
        >
          {images.map(({ src, link }, idx) => (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={style.imageSlide}
              key={idx}
            >
              <img src={src} alt={`Şəkil ${idx + 1}`} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shops;
