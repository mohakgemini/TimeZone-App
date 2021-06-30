import axios from 'axios'
import {useState, useEffect} from 'react'

export default function TimeComponent({ country }) {

    const [Time, setTime] = useState("")

    useEffect(() => {

        function getTime(){
            const url = "http://api.timezonedb.com/v2/get-time-zone?key=XWSLLPX5RMIZ&format=json&by=zone&zone=" + country
            axios.get(url).then(res=> setTime(res.data.formatted.split(" ").pop()))
        }
        const intervalId = setInterval(getTime, 5000)
        return () => {
            clearInterval(intervalId);
            setTime("")
        }
    }, [country])

    return (
        <div>
            <h3>{Time ? Time : "Loading..."}</h3>
        </div>
    )
}
