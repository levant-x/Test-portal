import { CSSProperties } from "react"
import { Button, Card } from "reactstrap";
import useEntity from "../../application/use-entity";
import userProfileService from "../../services/user-profile-service";
import { IUser } from "../../types/models";
import Form from "../components/form/Form"
import SubmitButton from "../components/form/SubmitButton";

export default function Profile() {
  const { 
    isLoading, 
    entity, 
    save, 
    errors 
  } = useEntity(userProfileService)
  
  const user = entity as IUser
  isLoading ? console.log('loading') : console.warn('loading FALSE');

  const cardClass = 'col-sm-12 col-md-4'
  const formStyle: CSSProperties = {
    backgroundColor: '#EEEEEE',
    borderColor: '#EEEEEE',       
    flex: '0 0 auto',
  }

  return (
    <div className="mt-2 container-fluid">
      <div className="d-flex justify-content-between">
        <Card body className={cardClass} style={formStyle}>
          <Form
            model={user.profile}   
            errors={errors}
            metadata={{
              firstname: { label: 'Имя', type: 'text' },
              surname: { label: 'Фамилия', type: 'text', },
              birthdate: { label: 'Дата рождения', type: 'date', },
            }}
          />
        </Card>

        <Card body className={cardClass} style={formStyle}>
          <Form
            model={user}     
            errors={errors}
            metadata={{
              phone: { label: 'Номер телефона', type: 'tel', },
              email: { label: 'EMail', type: 'email' },
            }}
          >
            {<Button className="mx-2">
              Будет смена пароля
            </Button>}
          </Form>
        </Card>
      </div>
      
      <div className="d-flex justify-content-end align-items-center">
        {Object.keys(errors).length ? 
          <i className="bi bi-exclamation-triangle-fill icon-warning me-3"></i> :
          <i className="bi bi-check-lg icon-success me-3"></i>
        }

        <SubmitButton 
          className="my-3 " 
          isLoading={isLoading} 
          onClick={save} 
        />
      </div>
    </div>
  )
}