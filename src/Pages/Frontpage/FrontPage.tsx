import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import tileStore, { Tile } from '../../Stores/tileStore';
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

  const test = (tile: Tile) => {
    tile.isClicked = !tile.isClicked;
    console.log(tile);
    
  }

  return (
    <>
      {loaded ?
        <div className='FrontPage_Container'>
          <div className='FrontPage_Wrapper'>
            <div className='FrontPage_Grid'>
              {tileStore.tiles.map((tile, index) => {
                if (index < 24) {
                  return (
                    <div className='FrontPage_Tile' style={{border: tile.isClicked ? '1px solid green' : '1px solid black'}} key={index} onClick={() => test(tile)}>
                      {tile.condition}
                    </div>
                  )
                }
                return null;
              })}
              <div className='Gratis'>GRATIS</div>
            </div>
          </div>
        </div>
        : null}
    </>
  )
}

export default observer(FrontPage)

