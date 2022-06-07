import React, { useEffect } from 'react'
import tileStore from '../../Stores/tileStore';
import './FrontPage.scss'

const FrontPage = () => {


    useEffect(() => {
        const fetchData = async () => {
            await tileStore?.getAll();
            console.log(tileStore);
            
        }
        fetchData();
    }, []);
    
  return (
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
  )
}

export default FrontPage