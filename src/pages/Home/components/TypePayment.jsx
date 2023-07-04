import Box from '@mui/material/Box';
import { images } from '../../../utils/images';
import '../scss/TypePayment.scss'

export default function TypePayment() {
  return (
    <div> 
      <Box className="mt-5" sx={{
        paddingLeft: '24px',
        paddingRight: '24px',
      }}>
        <div style={{
          background: '#29203b',
          boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
          borderRadius: 5
        }} className='p-5 d-flex justify-content-between'>
            <div style={{
              background: 'linear-gradient(230deg, rgb(66 52 105), rgba(255,0,0,0) 90.71%)',
              width: '20%',
              border: '3px solid rgb(97 73 147)',
              borderRadius: 5
            }}>
                <div className='d-flex justify-content-center align-items-center p-3' style={{
                  height: '100%',
                  
                }}>
                  <img src={images.donate1} alt="..." width={75} height={50}/>
                  <span className='fs-5 mx-2' style={{
                    color: 'rgb(123,162,255,1)'
                  }}>
                    <b>VISA</b>
                  </span>
                </div>
            </div>
            <div style={{
              background: 'linear-gradient(230deg, rgb(66 52 105), rgba(255,0,0,0) 90.71%)',
              width: '20%',
              border: '3px solid rgb(97 73 147)',
              borderRadius: 5
            }}>
                <div className='d-flex justify-content-center align-items-center p-3' style={{
                  height: '100%',
                  
                }}>
                  <img src={images.donate2} alt="..." width={50} height={50}/>
                  <span className='fs-5 mx-2' style={{
                    color: 'rgb(123,162,255,1)'
                  }}>
                    <b>BITCOIN</b>
                  </span>
                </div>
            </div>
            <div style={{
              background: 'linear-gradient(230deg, rgb(66 52 105), rgba(255,0,0,0) 90.71%)',
              width: '20%',
              border: '3px solid rgb(97 73 147)',
              borderRadius: 5
            }}>
                <div className='d-flex justify-content-center align-items-center p-3' style={{
                  height: '100%',
                  
                }}>
                  <span className='fs-5 mx-2' style={{
                    color: 'rgb(123,162,255,1)'
                  }}>
                    <b>DOGECOIN</b>
                  </span>
                </div>
            </div>
        </div>
      </Box>
    </div>
  );
}
