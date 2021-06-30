import './App.css';
import { Alert, Dropdown, DropdownButton } from 'react-bootstrap'
import {useEffect, useState} from 'react'
import axios from 'axios'

import CenteredContainer from './components/CenteredContainer';
import TimeComponent from './components/TimeComponent';

function App() {

  const [zones, setZoneData] = useState([])
  const [error, setError] = useState("")
  
  const [country, setCountry] = useState("")
  const [loading, setLoading] = useState(false);
    
  useEffect(()=>{
    setLoading(true)
    axios.get('http://api.timezonedb.com/v2.1/list-time-zone?key=R5PNBQZBP0U9&format=json&zone=Europe/*').then( res => {
      setZoneData(res.data.zones)
      setError("")
      
    }).catch(
    )
    setLoading(false)
    
  }, []);
  const onZoneSelection = async(e)=>{
    setCountry("")
    console.log(e)
    
    setCountry(e)
  }

  return (


    <CenteredContainer>
      <h2 className="text-center mb-4">Euro Time Zones</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? <p>Loading...</p> : 
        <div className="text-center mb-4">

        
        <DropdownButton id="dropdown-item-button" onSelect={onZoneSelection} title={country ? country : "Select time zone"} >
          <div style={{ maxHeight: "200px", overflowY: "scroll"}}>
          {zones.map(zone => <Dropdown.Item eventKey={zone.zoneName}>{zone.zoneName}</Dropdown.Item>)}
          </div>
          
          
        </DropdownButton>

        {country && 
        <div>
          <h4 className="text-center m-4">Current time in {country.split("Europe/")}</h4>
          <TimeComponent country={country}/>
        </div>}
        
        </div>
      }
      


      
      
    </CenteredContainer>
  );
}

export default App;
