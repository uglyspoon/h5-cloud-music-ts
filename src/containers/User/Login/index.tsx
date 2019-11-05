import React, { useState, useRef, useEffect } from "react";
import { Container, LogoImg, LogoContainer, LoginContainer } from "./style";
import { withRouter } from "react-router-dom";
import * as actionCreators from "./store/actionCreators";
import { RouteComponentProps } from 'react-router-dom';
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import LoginForm from "./LoginForm";
import PhoneForm from "./PhoneForm";

import { AppState } from "store";

interface IProps extends RouteComponentProps {
  LoginByVcodeDispatch: (phone: number, vcode: string) => any;
  sentVcodeDispatch: (phone: number) => any;
  changeSentStatusDispatch: () => any;
  sentStatus: boolean;
  loginStatus: boolean;
}

const Login: React.FC<IProps> = props => {
  const {
    LoginByVcodeDispatch,
    sentVcodeDispatch,
    sentStatus,
    loginStatus,
    changeSentStatusDispatch,
    history
  } = props;
  const [inPhone, setInPhone] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const checkBoxRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (loginStatus) {
      history.push("/recommend");
    }
  }, [loginStatus, history]);

  const jumpToIndex = () => {
    history.push("/recommend");
  };

  const jumpToLogin = (method: string) => {
    if (!agreed) {
      checkBoxRef.current!.classList.add("shake-horizontal");
      setTimeout(() => {
        checkBoxRef.current!.classList.remove("shake-horizontal");
      }, 500);
      return;
    }
    if (method === "phone") {
      setInPhone(true);
    }
  };

  const onPhoneBack = () => {
    setInPhone(false);
  };

  return (
    <>
      <CSSTransition in={!inPhone} timeout={500} classNames="push-out">
        <Container>
          <LogoContainer>
            <div>
              <LogoImg />
            </div>
          </LogoContainer>
          <LoginForm
            jumpToLogin={jumpToLogin}
            jumpToIndex={jumpToIndex}
            setAgreed={setAgreed}
            ref={checkBoxRef}
          />
        </Container>
      </CSSTransition>
      <CSSTransition
        in={inPhone}
        timeout={500}
        classNames="push-in"
        unmountOnExit
        onExited={() => changeSentStatusDispatch()}
      >
        <LoginContainer>
          <PhoneForm
            // loginByPhone={LoginByPhoneDispatch}
            loginByVcode={LoginByVcodeDispatch}
            onClickBack={onPhoneBack}
            sentVcode={sentVcodeDispatch}
            sentStatus={sentStatus}
          />
        </LoginContainer>
      </CSSTransition>
    </>
  );
};

// 映射Redux全局的state到组件的props上
const mapStateToProps = (state: AppState) => ({
  userInfo: state.user.userInfo,
  sentStatus: state.user.sentStatus,
  loginStatus: state.user.loginStatus
});
// 映射dispatch到props上
const mapDispatchToProps = (dispatch: any) => {
  return {
    LoginByPhoneDispatch(phone: number, password: string) {
      dispatch(actionCreators.loginByPhone(phone, password));
    },
    LoginByVcodeDispatch(phone: number, vcode: string) {
      dispatch(actionCreators.loginByVcode(phone, vcode));
    },
    sentVcodeDispatch(phone: number) {
      dispatch(actionCreators.sentVcode(phone));
    },
    changeSentStatusDispatch() {
      dispatch(actionCreators.saveSentStatus(false));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(withRouter(Login)));
