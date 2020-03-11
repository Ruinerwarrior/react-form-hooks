import React, { useState } from "react";

interface IUseFieldOptions {
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

function useField(
  name: string,
  defaultValue?: string,
  validationMethod?: (value: string | null) => boolean,
  options?: IUseFieldOptions,
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void,
  handleFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
) {
  const [value, setValue] = useState<string | null>(defaultValue || null);
  const [isDirty, setIsDirty] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState(false);

  // handle events
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

  // set eventhandlers from props or default
  const onChange = handleChange || handleFieldChange;
  const onBlur = handleBlur || handleFieldBlur;
  const onFocus = handleFocus || handleFieldFocus;

  return {
    isTouched,
    isDirty,
    isValid,
    inputProps: {
      name,
      value: value || "",
      onBlur,
      onFocus,
      onChange,
    }
  }
}

export default useField;