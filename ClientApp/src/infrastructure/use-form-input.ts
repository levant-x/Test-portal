import { useState } from "react";
import { FormProps } from "reactstrap";
import { FormInputProps } from "../types/common";

export function useFormInput({
  model,
  attributeName,
  errors,
}: FormInputProps & FormProps) {
  const [value, setValue] = useState(model[attributeName] || '')
  const errorLines = (errors?.[attributeName] || errors?.[attributeName
    .toLowerCase()])?.split('\n')

  const onValueChange = (value: any) => {
    setValue(value)
    model[attributeName] = value
  }

  return {
    value,
    onValueChange,
    errorLines,
  }
}