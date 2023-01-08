import './App.css';
import { useEffect, useState } from 'react';



function App() {
  return (
    <div className="App">
      <Products />
    </div>
  );
}





function Products() {
  const [mobiles, setMobiles] = useState([])

  const mobile = () => fetch("https://tired-gold-cape.cyclic.app/", {
    method: 'GET',
  })
    .then(data => data.json())
    .then(res => setMobiles(res))
  mobile()
  return (

    <div className='phone-list-container'>
      {
        mobiles.map((mobile) => (<Mobiles mobile={mobile} />))
      }
    </div>
  )
}


function Mobiles({ mobile }) {
  return (
    <div className='phone-container'>
      <img alt={mobile.model} className='phone-picture' src={mobile.img} />
      <h2 className='phone-name'>{mobile.model}</h2>
      <h3 className='phone-company'>{mobile.company}</h3>
    </div>
  )
}
export default App;
