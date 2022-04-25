import { 
  FormProps, 
  IChildren, 
  IClickable, 
  IExplainer, 
  ILoading 
} from "../../../types/common"
import SubmitButton from "./SubmitButton"

type Props = FormProps & IExplainer & ILoading & IClickable & IChildren & {
  containerClass?: string
  buttonClass?: string
}

export default function FormFrame({
  errors,
  isLoading,
  onClick,
  children,
  containerClass,
  buttonClass,
}: Props) {
  return (
    <div className={containerClass ?? 'mt-2 container-fluid'}>
      {children}
      
      <div className="d-flex justify-content-end align-items-center">
        {errors && Object.keys(errors).length ? 
          <i className="bi bi-exclamation-triangle-fill icon-warning me-3"></i> :
          <i className="bi bi-check-lg icon-success me-3"></i>
        }

        <SubmitButton 
          className={buttonClass ?? 'my-3'}
          isLoading={isLoading} 
          onClick={onClick} />
      </div>
    </div>
  )
}