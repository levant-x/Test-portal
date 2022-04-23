import { NAVBAR_HEIGHT_FACTOR } from '../../config/consts';
import { IChildren } from '../../types/common';
import NavMenu from './NavMenu';
import Notifications from './Notifications';

export default function Layout(props: IChildren) {
  const h = NAVBAR_HEIGHT_FACTOR
  return (
    <div className='container-fluid'>
      <div className='row'>
        <NavMenu />
      </div>
      
      <div className={`col-12 mt-3 pt-${h}`}>
        <Notifications />
        { props.children }
      </div>
    </div>
  )
}
