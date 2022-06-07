import React, { useEffect, useState } from 'react'
import tileStore from '../../Stores/tileStore';
import './FrontPage.scss'

const FrontPage = () => {

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoaded(false);
      await tileStore?.getAll();
      console.log(tileStore);
      setLoaded(true);
    }
    fetchData();
  }, []);

  return (
    <>
      {loaded ?
        <div className='FrontPage_Container'>
          <div className='FrontPage_Wrapper'>
            <ul>
              {tileStore.tiles.map(tile => (
                <li key={tile.id}>
                  <div>
                    <h3>{tile.condition}</h3>
                    <p>{tile.ofPerson.name}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        : null}
    </>
  )
}

export default FrontPage

