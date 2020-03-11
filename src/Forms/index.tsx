import React, { useState } from 'react';

export interface IFormProps {
  children: React.ReactNode | React.ReactNodeArray;
  handleSubmit?: (values: IInputValue) => void;
}

export interface IFormContext {
  register: (
    name: string,
    getIsValid: () => boolean,
    getIsDirty: () => boolean,
    getIsTouched: () => boolean,
    getValue: () => any,
    reset: () => void,
    empty: () => void,
    groupName?: string,
    defaultValue?: any
  ) => void;
  unRegister:(name: string) => void;
  getValue: (name: string) => any;
  getIsDirty: (name: string) => boolean;
  getIsTouched: (name: string) => boolean;
  getIsValid: (name: string) => boolean;
  getFormValues: () => { [key: string]: any };
  getGroupValues: (name: string) => { [key: string]: any };
  onSubmit: () => void;
}

export interface IInputValue {
  [key: string]: any
}

export interface IInputs {
  [key: string]: {
    getIsValid: () => boolean,
    getIsTouched: () => boolean;
    getIsDirty: () => boolean;
    getValue: () => any;
    reset: () => void;
    empty: () => void;
    groupName?: string,
    defaultValue?: string
  };
}

export const FormContext = React.createContext<IFormContext>({} as IFormContext);

const Form: React.FC<IFormProps> = ({ children, handleSubmit }) => {
  const [inputs, setInputs] = useState<IInputs>({});

  // register input
  const register = (
    name: string,
    getIsValid: () => boolean,
    getIsDirty: () => boolean,
    getIsTouched: () => boolean,
    getValue: () => any,
    reset: () => void,
    empty: () => void,
    groupName?: string,
    defaultValue?: any,
  ) => {
    const currentInputs = inputs;
    currentInputs[name] = {
      getValue,
      getIsTouched,
      getIsValid,
      getIsDirty,
      groupName,
      defaultValue,
      reset,
      empty
    };
    setInputs(currentInputs);
  }

  const unRegister = (name: string) => {
    let currentInputs = inputs;
    delete currentInputs[name];
    setInputs(currentInputs);
  }

  const getValue = (name: string) => { console.log(inputs[name] ? inputs[name].getValue() : null); return inputs[name] ? inputs[name].getValue() : null };
  const getIsDirty = (name: string) => inputs[name] ? inputs[name].getIsDirty() : false;
  const getIsTouched = (name: string) => inputs[name] ? inputs[name].getIsTouched() : false;
  const getIsValid = (name: string) => inputs[name] ? inputs[name].getIsValid() : false;

  const getFormValues = () => {
    let values: { [key: string]: any } = {};
    for (let [key, value] of Object.entries(inputs)) {
      values[key] = value.getValue();
    }
    return values;
  }

  const getGroupValues = (name: string) => {
    let values: { [key: string]: any } = {};
    for (let key of Object.keys(inputs)) {
      if (inputs[key].groupName === name)
        values[key] = inputs[key].getValue();
    }
    return values;
  }

  const onSubmit = () => {
    const values = getFormValues();
    if (handleSubmit)
      handleSubmit(values);
  }

  return (
    <FormContext.Provider
      value={{
        register,
        unRegister,
        getValue,
        getIsDirty,
        getIsTouched,
        getIsValid,
        getFormValues,
        getGroupValues,
        onSubmit
      }}
    >
      {children}
    </FormContext.Provider>
  )
}

export default Form;