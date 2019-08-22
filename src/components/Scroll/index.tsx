import React, { forwardRef, useState,useEffect, useRef, useImperativeHandle } from "react"
import BScroll from "better-scroll"
import styled from 'styled-components';
import Loading from 'components/Loading/index';
import Loading2 from 'components/Loading/v2';
// import { debounce } from '"utils/utils";'
import debounce from 'debounce';


const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const PullUpLoading = styled.div`
  position: absolute;
  left:0; right:0;
  bottom: 5px;
  width: 60px;
  height: 60px;
  margin: auto;
  z-index: 100;
`

export const PullDownLoading = styled.div`
  position: absolute;
  left:0; right:0;
  top: 0px;
  height: 30px;
  margin: auto;
  z-index: 100;
`

interface ScrollProps {
  direction?: 'vertical' | 'horizental';
  refresh?: boolean;
  onScroll?: any;
  pullUp?: any;
  pullDown?: any;
  pullUpLoading?: boolean;
  pullDownLoading?: boolean;
  bounceTop?: boolean;//是否支持向上吸顶
  bounceBottom?: boolean;//是否支持向上吸顶
  click?: any;
  children?: any;
}

const Scroll = forwardRef((props: ScrollProps, ref:any) => {
  const [bScroll, setBScroll] = useState();

  const scrollContaninerRef = useRef<any>();

  const { direction="vertical", click=true, refresh=true, pullUpLoading=false, pullDownLoading=false, bounceTop=true, bounceBottom=true } = props;

  const { pullUp=()=>{}, pullDown=() => {}, onScroll=null } = props;

  useEffect(() => {
    if(bScroll) return;
    const scroll = new BScroll(scrollContaninerRef.current, {
      scrollX: direction === "horizental",
      scrollY: direction === "vertical",
      probeType: 3,
      click,
      bounce:{
        top: bounceTop,
        bottom: bounceBottom
      }
    });
    setBScroll(scroll);
    if(pullUp) {
      scroll.on('scrollEnd', () => {
        //判断是否滑动到了底部
        if(scroll.y <= scroll.maxScrollY + 100){
          pullUp();
        }
      });
    }
    if (pullDown) {
      scroll.on('touchEnd', (pos:any) => {
        //判断用户的下拉动作
        if (pos.y > 50) {
          debounce(pullDown, 0)();
        }
      });
    }

    if(onScroll) {
      scroll.on('scroll', (scroll:any) => {
        onScroll(scroll);
      })
    }

    if(refresh) {
      scroll.refresh();
    }
    return () => {
      scroll.off('scroll');
      setBScroll(null);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh();
    }
  })

  useImperativeHandle(ref, () => ({
    refresh() {
      if(bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    }
  }));

  const PullUpdisplayStyle = pullUpLoading ? { display: "" } : { display: "none" };
  const PullDowndisplayStyle = pullDownLoading ? { display: "" } : { display: "none" };
  return (
    <ScrollContainer ref={scrollContaninerRef}>
      {props.children}
      {/* 滑到底部加载动画 */}
      <PullUpLoading style={ PullUpdisplayStyle }><Loading></Loading></PullUpLoading>
      {/* 顶部下拉刷新动画 */}
      <PullDownLoading style={ PullDowndisplayStyle }><Loading2></Loading2></PullDownLoading>
    </ScrollContainer>
  );
})

export default React.memo(Scroll);
