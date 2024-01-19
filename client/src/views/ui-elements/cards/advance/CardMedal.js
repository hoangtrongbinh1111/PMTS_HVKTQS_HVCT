// ** Reactstrap Imports
import { Card, CardBody, CardText, Button } from 'reactstrap'

// ** Images
import medal from '@src/assets/images/illustration/badge.svg'
import { useEffect } from 'react'

const CardMedal = () => {
  const userData = JSON.parse(localStorage.getItem('userData'))
  useEffect(() => {

  }, [userData])
  return (
    <Card className='card-congratulations-medal'>
      <CardBody>
        <h5>Xin chào {userData?.hoTen}</h5>
        {/* <CardText className='font-small-3'>You have won gold medal</CardText>
        <h3 className='mb-75 mt-2 pt-50'>
          <a href='/' onClick={e => e.preventDefault()}>
            $48.9k
          </a>
        </h3>
        <Button color='primary'>View Sales</Button> */}
        <img className='congratulation-medal' src={medal} alt='Medal Pic' />
      </CardBody>
    </Card>
  )
}

export default CardMedal