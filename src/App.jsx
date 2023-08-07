import { Fragment, useEffect, useState } from 'react'
import Loading from './components/Loading';
import Tours from './components/Tours';

const url = 'https://course-api.com/react-tours-project';
function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [isTours, setIsTours] = useState([]);

  const removeToursHandler = (id) => {
    const newTours = isTours.filter((tour) => tour.id !== id);
    setIsTours(newTours);
  }

  
    const fetchData = async() => {

      setIsLoading(true);
      try {
        const response = await fetch(url);
        const tours = await response.json();
        setIsLoading(false);
        setIsTours(tours);
        
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }

    useEffect(() => {
      fetchData()
    }, [])

  if(isLoading){
    return(
      <main>
        <Loading />
      </main>
    )
  }

  if(isTours.length === 0){
    return(
      <main>
        <div className='title'>
        <h2>no tours left</h2>
        <button className='btn' onClick={fetchData}>refresh</button>
        </div>
      </main>
    )
  }

  return (
    <Fragment>
    <main>
      <Tours tours={isTours} removeTour={removeToursHandler}/>
    </main>
    </Fragment>
  );
};

export default App
