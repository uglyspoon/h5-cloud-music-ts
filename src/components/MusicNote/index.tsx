import React, {
  useEffect,
  useImperativeHandle,
  useRef,
  forwardRef,
} from 'react';
import styled from 'styled-components';
import { prefixStyle } from 'utils';
import style from 'assets/globalStyle';

interface IPos {
  x: number;
  y: number;
}

const Container = styled.div`
  .icon_wrapper {
    position: fixed;
    z-index: 1000;
    margin-top: -10px;
    margin-left: -10px;
    color: ${style['theme-color']};
    font-size: 14px;
    display: none;
    transition: transform 1s cubic-bezier(0.62, -0.1, 0.86, 0.57);
    transform: translate3d(0, 0, 0);
    > div {
      transition: transform 1s;
    }
  }
`;

export interface IMusicNote {
  startAnimation: (e: IPos) => void;
}

const MusicNote = forwardRef<IMusicNote>((props, ref) => {
  const iconsRef = useRef<HTMLDivElement>();

  const ICON_NUMBER = 1;

  const transform: any = prefixStyle('transform');

  const createNode = (txt: string) => {
    const template = `<div class='icon_wrapper'>${txt}</div>`;
    let tempNode = document.createElement('div');
    tempNode.innerHTML = template;
    return tempNode.firstChild;
  };

  useEffect(() => {
    const nodeRef = iconsRef.current!;
    for (let i = 0; i < ICON_NUMBER; i++) {
      let node = createNode(`<div class="iconfont">&#xe62d;</div>`)!;
      nodeRef.appendChild(node);
    }
    let domArray = [].slice.call(nodeRef.children);
    domArray.forEach((item: HTMLDivElement) => {
      item.setAttribute('running', 'false');
      item.addEventListener(
        'transitionend',
        function () {
          this.style.display = 'none';
          this.style[transform] = `translate3d(0, 0, 0)`;
          this.setAttribute('running', 'false');
          let icon = this.querySelector('div')!;
          icon.style[transform] = `translate3d(0, 0, 0)`;
        },
        false
      );
    });
    // eslint-disable-next-line
  }, []);

  const startAnimation = ({ x, y }: any) => {
    const nodeRef = iconsRef.current!;
    for (let i = 0; i < ICON_NUMBER; i++) {
      let domArray = [].slice.call(nodeRef.children);
      let item: HTMLDivElement = domArray[i];
      // 选择一个空闲的元素来开始动画
      if (item.getAttribute('running') === 'false') {
        item.style.left = x + 'px';
        item.style.top = y + 'px';
        item.style.display = 'inline-block';
        setTimeout(() => {
          item.setAttribute('running', 'true');
          item.style[transform] = `translate3d(-40px, 750px, 0)`;
          let icon = item.querySelector('div')!;
          icon.style[transform] = `translate3d(-40px, 0, 0)`;
        }, 20);
        break;
      }
    }
  };

  useImperativeHandle(ref, () => ({
    startAnimation,
  }));

  return <Container ref={iconsRef as any} />;
});

export default React.memo(MusicNote);
