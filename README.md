# react-form-hooks

### Description
A simple, stylless form package using the power of hooks.

### Main features
- hooks and contexts providing form and field logic
- customizable, create your own event handlers and style
- using HTML5 standards regarding forms and inputs
- provide your custom validation to inputs
- divide your form in groups that can be independantly validated

### How to start
run `npm i @ricknijhuis/react-form-hooks` to install the package

#### For creating a formless input use the `useField` Hook
```typescript
import React from "react";
import { useField } from "../Hooks";

interface IInputProps {
  name: string;
  defaultValue?: string;
}

const Input: React.FC<IInputProps> = ({ name, defaultValue }) => {
  const { inputProps } = useField(name, defaultValue);
  return (
    <input {...inputProps}/>
  )
}

export default Input;
```

#### For creating a form use the `Form` component and the `useFormField` Hook
`Input.tsx`
```typescript
import React from "react";
import { useFormField } from "../Hooks";

interface IInputProps {
  name: string;
  defaultValue?: string;
}

const Input: React.FC<IInputProps> = ({ name, defaultValue }) => {
  const { inputProps } = useFormField(name, defaultValue);
  return (
    <input {...inputProps}/>
  )
}

export default Input;
```
A very simple example of an input, the hook provides default the basic needs of the attributes for an input element. 


`Button.tsx`
```typescript
import React, { useContext } from "react";
import { FormContext } from "./Form";

const Button: React.FC = () => {
  const { getFormValues } = useContext(FormContext);
  return<button onClick={() => console.log(getFormValues())}>click me</button>
}

export default Button;
```
A component inside the Form context can access all kinds of information of the state of the inputs and forms and can also access some actions


`App.tsx`
```typescript
import React from 'react';
import Form from './Form';
import Input from './Input';
import Button from './Button';

function App() {
  return (
    <Form>
      <Input name="email"/>
      <Input name="password"/>
      <Button/>
    </Form>
  );
}

export default App;
```
Here comes everything together.

### This is a very simplistic overview, for more complete examples and overview of all the features see the Wiki!
