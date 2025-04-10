import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import { Button } from './components/ui/button';

const App = () => {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/hello');
        setMessage(response.data);
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData();
  }, [])
  return (
    <>
      <div className='h-screen flex flex-col items-center justify-center text-2xl font-bold text-gray-700'>
        <p>{message}</p>
        <Button variant="secondary" >Hello shadCN UI</Button>

      </div>
    </>
  )
}

export default App;