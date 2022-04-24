import { CSSProperties } from "react"
import { Button, Card } from "reactstrap";
import useEntity from "../../application/use-entity";
import userProfileService from "../../services/user-profile-service";
import { IUser } from "../../types/models";
import Form from "../components/form/Form";
import FormSection from "../components/form/FormSection"

export default function Profile() {
  const { 
    isLoading, 
    entity, 
    save, 
    errors,
  } = useEntity(userProfileService)
  const user = entity as IUser

  const cardClass = 'col-sm-12 col-md-4'
  const formStyle: CSSProperties = {
    backgroundColor: '#EEEEEE',
    borderColor: '#EEEEEE',       
    flex: '0 0 auto',
  }

  return (
    <Form model={entity} isLoading={isLoading} onClick={save}>
      <div className="d-flex justify-content-between">
        <Card body className={cardClass} style={formStyle}>
          <FormSection
            model={user.profile}   
            errors={errors}
            metadata={{
              firstName: { label: 'Имя', type: 'text' },
              surname: { label: 'Фамилия', type: 'text', },
              birthDate: { label: 'Дата рождения', type: 'date', },
            }}
          />
        </Card>

        <Card body className={cardClass} style={formStyle}>
          <FormSection
            model={user}     
            errors={errors}
            metadata={{
              phone: { label: 'Номер телефона', type: 'tel', },
              email: { label: 'EMail', type: 'email' },
            }}
          >
            {<Button className="m-2">
              Будет смена пароля
            </Button>}
          </FormSection>
        </Card>
      </div>
    </Form>
  )
}