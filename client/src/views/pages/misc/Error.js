// ** React Imports
import { Link } from 'react-router-dom'

// ** Reactstrap Imports
import { Button } from 'reactstrap'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'

// ** Styles
import '@styles/base/pages/page-misc.scss'

// ** Logo
import logo from '@src/assets/images/logo/logo.png'
const Error = () => {
  // ** Hooks
  const { skin } = useSkin()

  const illustration = skin === 'dark' ? 'error-dark.svg' : 'error.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default
  return (
    <div className='misc-wrapper'>
      <a className='brand-logo' href='/'>
        <img className='fallback-logo' src={logo} alt='logo' />
        <h2 className='brand-text text-primary ms-1' style={{ fontSize: "4rem", margin: "auto" }}>HVCT</h2>
      </a>
      <div className='misc-inner p-2 p-sm-3'>
        <div className='w-100 text-center'>
          <h2 className='mb-1'>Trang không tồn tại 🕵🏻‍♀️</h2>
          <p className='mb-2'>Vui lòng quay lại trang chủ!</p>
          <Button tag={Link} to='/' color='primary' className='btn-sm-block mb-2 d-flex m-auto' style={{ width: "fit-content" }}>
            Quay lại Trang chủ
          </Button>
          <img className='img-fluid' src={source} alt='Not authorized page' />
        </div>
      </div>
    </div>
  )
}
export default Error
