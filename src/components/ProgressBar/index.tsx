import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import style from 'assets/globalStyle';
import { prefixStyle } from 'utils';

const ProgressBarWrapper = styled.div`
  height: 30px;
  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);
    .progress {
      position: absolute;
      height: 100%;
      background: ${style['theme-color']};
    }
    .progress-btn-wrapper {
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;
      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid ${style['border-color']};
        border-radius: 50%;
        background: ${style['theme-color']};
      }
    }
  }
`;

function ProgressBar(props: any) {
  const progressBar = useRef<HTMLDivElement>();
  const progress = useRef<HTMLDivElement>();
  const progressBtn = useRef<HTMLButtonElement>();
  const [touch, setTouch] = useState<any>({});

  const { percent } = props;

  const transform: any = prefixStyle('transform');

  const progressBtnWidth = 16;

  useEffect(() => {
    if (percent >= 0 && percent <= 1 && !touch.initiated) {
      const barWidth = progressBar.current!.clientWidth - progressBtnWidth;
      const offsetWidth = percent * barWidth;
      progress.current!.style.width = `${offsetWidth}px`;
      progressBtn.current!.style[
        transform
      ] = `translate3d(${offsetWidth}px, 0, 0)`;
    }
    // eslint-disable-next-line
  }, [percent]);

  const _offset = (offsetWidth: number) => {
    progress.current!.style.width = `${offsetWidth}px`;
    progressBtn.current!.style.transform = `translate3d(${offsetWidth}px, 0, 0)`;
  };

  const _changePercent = () => {
    const barWidth = progressBar.current!.clientWidth - progressBtnWidth;
    const curPercent = progress.current!.clientWidth / barWidth;
    props.percentChange(curPercent);
  };

  const progressClick = (e: any) => {
    const rect = progressBar.current!.getBoundingClientRect();
    const offsetWidth = e.pageX - rect.left;
    _offset(offsetWidth);
    _changePercent();
  };

  const progressTouchStart = (e: any) => {
    const startTouch: any = {};
    startTouch.initiated = true;
    startTouch.startX = e.touches[0].pageX;
    startTouch.left = progress.current!.clientWidth;
    setTouch(startTouch);
  };

  const progressTouchMove = (e: any) => {
    if (!touch.initiated) return;
    const deltaX = e.touches[0].pageX - touch.startX;
    const barWidth = progressBar.current!.clientWidth - progressBtnWidth;
    const offsetWidth = Math.min(Math.max(0, touch.left + deltaX), barWidth);
    _offset(offsetWidth);
  };

  const progressTouchEnd = (e: any) => {
    const endTouch = JSON.parse(JSON.stringify(touch));
    endTouch.initiated = false;
    setTouch(endTouch);
    _changePercent();
  };

  return (
    <ProgressBarWrapper>
      <div
        className='bar-inner'
        ref={progressBar as any}
        onClick={progressClick}
      >
        <div className='progress' ref={progress as any}></div>
        <div
          className='progress-btn-wrapper'
          ref={progressBtn as any}
          onTouchStart={progressTouchStart}
          onTouchMove={progressTouchMove}
          onTouchEnd={progressTouchEnd}
        >
          <div className='progress-btn'></div>
        </div>
      </div>
    </ProgressBarWrapper>
  );
}

export default React.memo(ProgressBar);
