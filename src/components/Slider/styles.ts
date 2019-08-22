import styled from 'styled-components';
import style from '../../assets/globalStyle';


export const SliderContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  margin: auto;
  background: white;
  .slider-container{
    position: relative;
    width: 98%;
    height: 160px;
    overflow: hidden;
    margin: auto;
    border-radius: 6px;
    .slider-nav{
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
    }
    .swiper-pagination-bullet-active{
      background: ${style["theme-color"]};
    }
  }
`
