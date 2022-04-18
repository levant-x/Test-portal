import { IChildren } from '../config/types';
import NavMenu from './NavMenu';

export default function Layout(props: IChildren) {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <NavMenu />
      </div>
      
      <div className='col-sm-9'>
        { props.children }
      </div>
    </div>
  )
}
