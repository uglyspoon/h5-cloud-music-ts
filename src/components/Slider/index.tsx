import React, { useEffect, useState } from 'react';
import { SliderContainer } from './styles';
import 'swiper/swiper-bundle.css';
import Swiper from 'swiper';

export type bannerType = {
  imageUrl: string;
  url: string;
};

type SliderPorps = {
  bannerList: bannerType[];
};

const Slider: React.FC<SliderPorps> = ({ bannerList = [] }) => {
  const [sliderSwiper, setSliderSwiper] = useState<Swiper>();

  useEffect(() => {
    if (bannerList.length && !sliderSwiper) {
      let sliderSwiper = new Swiper('.slider-container', {
        loop: true,
        autoplay: true,
        pagination: { el: '.swiper-pagination' },
      });
      setSliderSwiper(sliderSwiper);
    }
  }, [bannerList.length, sliderSwiper]);

  return (
    <SliderContainer>
      <div className='slider-container'>
        <div className='swiper-wrapper'>
          {bannerList.map((slider) => {
            return (
              <div className='swiper-slide' key={slider.imageUrl}>
                <div className='slider-nav'>
                  <img
                    src={slider.imageUrl}
                    width='100%'
                    height='100%'
                    alt='推荐'
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className='swiper-pagination'></div>
      </div>
    </SliderContainer>
  );
};

export default Slider;
