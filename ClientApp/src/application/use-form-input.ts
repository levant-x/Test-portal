import { action, reaction } from "mobx";
import { useEffect, useState } from "react";
import { FormProps } from "reactstrap";
import { FormInputProps } from "../types/common";

type Props = {
  isDateTime?: boolean
}

export function useFormInput({
  model,
  attributeName,
  errors,
  isDateTime,
}: FormInputProps & FormProps & Props) {
  let initValue = model?.[attributeName] as string || ''
  if (isDateTime) initValue = initValue.substring(0, 10) 

  const [value, setValue] = useState(initValue)  
  const onValueChange = action((value: any) => model[attributeName] = value)

  useEffect(action(() => { if (model) model[attributeName] = value }), [])
  reaction(() => model?.[attributeName], newValue => setValue(newValue))

  const errorsData = errors?.[attributeName] || errors?.[attributeName.toLowerCase()]
  const errorLines = Array.isArray(errorsData) ? errorsData : errorsData?.split('\n')  

  return {
    value,
    errorLines,
    onValueChange,
  }
}