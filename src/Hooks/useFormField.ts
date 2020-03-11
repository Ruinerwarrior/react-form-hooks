import React, { useState, useContext, useEffect } from "react";
import { FormContext } from "../Forms";

interface IUseFieldOptions {
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

function useFormField(
  name: string,
  defaultValue?: string,
  groupName?: string,
  validationMethod?: (value: string | null) => boolean,
  options?: IUseFieldOptions,
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void,
  handleFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
) {
  const { register } = useContext(FormContext);
  const [value, setValue] = useState<string | null>(defaultValue || null);
  const [isDirty, setIsDirty] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState(false);

  // events
  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    let isDirty = false;

    setValue(value);

    if (value !== defaultValue)
      isDirty = true;

    setIsDirty(isDirty);
    setIsTouched(true);
  }

  const handleFieldBlur = () => {
    if (options?.validateOnBlur)
      setIsValid(validationMethod ? validationMethod(value) : false);

    setIsTouched(true);
  }

  const handleFieldFocus = () => {
    setIsTouched(true);
  }

  const onChange = handleChange || handleFieldChange;
  const onBlur = handleBlur || handleFieldBlur;
  const onFocus = handleFocus || handleFieldFocus;

  useEffect(() => {
    console.log("test");
    // getters
    const getValue = () => value;
    const getIsDirty = () => isDirty;
    const getIsTouched = () => isTouched;
    const getIsValid = () => isValid;

    // input actions
    const reset = () => { setValue(defaultValue || null) };
    const empty = () => { setValue(null) };
    const setValue = (value: string | null) => { setValue(value) };

    register(
      name,
      getIsValid,
      getIsDirty,
      getIsTouched,
      getValue,
      reset,
      empty,
      setValue,
      groupName,
      defaultValue
    );
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      value,
      isDirty,
      isTouched,
      isValid,
      name,
      groupName,
      defaultValue
    ]
  );

  return {
    isTouched,
    isDirty,
    inputProps: {
      name,
      value: value || defaultValue || "",
      onBlur,
      onFocus,
      onChange,
    }
  }
}

export default useFormField;