import { FormFeedback, FormGroup, Input } from "reactstrap"
import { useFormInput } from "../../../infrastructure/use-form-input";
import { FormInputProps } from "../../../types/common"

export default function FormInput(props: FormInputProps) {
  const isDateTime = ['date', 'time']
    .some(typeKey => props.type.includes(typeKey))
  const { value, onValueChange, errorLines } = useFormInput({
    isDateTime,
    ...props,
  })

  return (
    <FormGroup className="p-2 mb-0">
      <Input 
        type={props.type} 
        invalid={errorLines ? true : false} 
        placeholder={props.label} 
        value={value} 
        onChange={({target}) => onValueChange(target.value)}
      />

      {errorLines?.map((line) => (
        <FormFeedback className="ps-2">
          {line}
        </FormFeedback>)
      )}
    </FormGroup>
  )
}