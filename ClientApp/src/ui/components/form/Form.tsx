import { FormGroup } from "reactstrap"
import { FormInputProps, IEntityStore } from "../../../types/common"
import FormInput from "./FormInput"

type MetaInput = Omit<FormInputProps, 'attributeName'>

type Props<T, M extends keyof T> = {
  model: T
  metadata: Record<M, MetaInput>
  children?: JSX.Element | JSX.Element[]
} & Pick<IEntityStore<any>, 'errors'>

export default function Form<T, M extends keyof T>({
  metadata,
  children,
  ...rest
}: Props<T, M>) {
  return (
    <>
      {(Object.entries<FormInputProps>(metadata as Record<string, any>)
        .map(([attrName, field]) => 
          <FormInput 
            key={attrName}
            attributeName={attrName}
            {...field}
            {...rest}
          />)
      )}

      {Array.isArray(children) ? children.map(child => 
        <FormGroup className="p-2 mb-0">
          {child}
        </FormGroup>
      ) : children}
    </>
  )
}