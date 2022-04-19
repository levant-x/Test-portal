import { IChildren } from '../../types/common';
import NavMenu from './NavMenu';

export default function Layout(props: IChildren) {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <NavMenu />
      </div>
      
      <div className='col-12 mt-5 pt-3'>
        { props.children }
      </div>
    </div>
  )
}
