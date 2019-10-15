import * as React from 'react';
import styled from 'styled-components';
import style from 'assets/globalStyle';

const HeaderContainer = styled.div`
  position: fixed;
  padding: 5px 10px;
  padding-top: 0;
  height: 40px;
  width: 100%;
  z-index: 100;
  display: flex;
  line-height: 40px;
  color: ${style['font-color-light']};
  .back {
    margin-right: 5px;
    font-size: 20px;
    width: 20px;
  }
  > h1 {
    font-size: ${style['font-size-l']};
    font-weight: 700;
  }
`;

interface HeaderProps {
  handleClick: () => void;
  title: string;
  isMarquee: boolean;
}
// 处理函数组件拿不到ref的问题,所以用forwardRef
const Header = React.forwardRef((props: HeaderProps, ref) => {
  const { handleClick = () => {}, title = '标题', isMarquee = false } = props;
  return (
    <HeaderContainer ref={ref as any}>
      <i className='iconfont back' onClick={handleClick}>
        &#xe6e5;
      </i>
      {// eslint-disable-next-line
      isMarquee ? (
        <div className='marquee'>
          <h1>{title}</h1>
        </div>
      ) : (
        <h1>{title}</h1>
      )}
    </HeaderContainer>
  );
});

export default React.memo(Header);
