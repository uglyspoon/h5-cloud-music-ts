/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { forwardRef } from "react";
import { Button, BeautyCheckBox, OtherLoginLink, FormContainer } from "./style";

const noEffect = (e: React.MouseEvent<HTMLElement>) => e.preventDefault();

interface IProps {
  jumpToLogin: (method: string) => void;
  setAgreed: (checked: boolean) => void;
  jumpToIndex: () => void;
}
const LoginForm = forwardRef((props: IProps, ref?: React.Ref<HTMLUListElement>) => {
  const { jumpToLogin, setAgreed, jumpToIndex } = props;
  const onChangeChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreed(e.target.checked);
  };
  const loginViaThirdApi = () => {
    alert("第三方登录待开发....");
  };
  return (
    <FormContainer>
      <Button
        background="#fff"
        onClick={e => {
          e.preventDefault();
          jumpToLogin("phone");
        }}
      >
        手机号登录
      </Button>
      <Button color="#fff" onClick={jumpToIndex}>
        立即体验
      </Button>
      <BeautyCheckBox ref={ref}>
        <li>
          <input
            type="checkbox"
            id="tiaokuan"
            hidden
            onChange={onChangeChecked}
          // onClick={onChangeChecked}
          />
          <label htmlFor="tiaokuan"></label>
          <span>
            同意<a onClick={noEffect}>{"<<服务条款>>"}</a>和
            <a onClick={noEffect}>{"<<隐私政策>>"}</a>
          </span>
        </li>
      </BeautyCheckBox>
      <OtherLoginLink>
        <img
          onClick={loginViaThirdApi}
          src={require("../../../../assets/wechat.svg")}
          alt=""
        />
        <img
          onClick={loginViaThirdApi}
          src={require("../../../../assets/sina.svg")}
          alt=""
        />
        <img
          onClick={loginViaThirdApi}
          src={require("../../../../assets/mail.svg")}
          alt=""
        />
      </OtherLoginLink>
    </FormContainer>
  );
});

export default LoginForm;
