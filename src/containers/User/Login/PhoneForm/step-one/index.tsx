import React, { useRef, useEffect } from "react";
import { trimPhone } from "utils";

const StepOne = (props: { onChangePhone: any; onClickNext: any; phone: any; }) => {
  const { onChangePhone, onClickNext, phone } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current!.focus();
  });
  return (
    <>
      <p className="input">
        +86
        <input
          type="text"
          onChange={onChangePhone}
          value={phone}
          ref={inputRef}
        />
      </p>
      <hr />
      <span
        className={`LoginBtn 
          ${trimPhone(phone).length < 11 && "disabled"}`}
        onClick={onClickNext}
      >
        下一步
      </span>
    </>
  );
};

export default StepOne;
