import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import personStore, { Person } from '../../Stores/personStore';
import personThemeStore from '../../Stores/personThemeStore';
import tileStore, { Tile } from '../../Stores/tileStore';
import './FrontPage.scss'
import Logo from '../../Assets/EmilseBilseLogo.svg'

const FrontPage = () => {

  const [loaded, setLoaded] = useState(false);
  const [started, setStarted] = useState(false);
  const [selectedUsers] = useState<Person[]>([]);
  const [selectedTiles] = useState<Tile[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      setLoaded(false);
      await personStore?.getAll();
      setLoaded(true);
    }
    fetchData();
  }, []);

  const test = (tile: Tile) => {
    tile.isClicked = !tile.isClicked;
    console.log(tile);

  }

  const selectPerson = (person: Person) => {
    person.isClicked = !person.isClicked;
    if (!selectedUsers.includes(person)) {
      selectedUsers.push(person);
    } else {
      selectedUsers.splice(selectedUsers.indexOf(person), 1);
    }
    console.log(selectedUsers);
  }

  const startGame = async () => {
    for (let i = 0; i < selectedUsers.length; i++) {
      await tileStore.getTilesOfPerson(selectedUsers[i].id);
    }
    console.log(tileStore.tiles);

    //select 24 random tiles from the list of tiles and store them in another array
    const tempTiles = tileStore.tiles;
    for (let i = 0; i < 24; i++) {
      const randomIndex = Math.floor(Math.random() * tileStore.tiles.length);
      selectedTiles.push(tempTiles[randomIndex]);
      tempTiles.splice(randomIndex, 1);
    }
    console.log(selectedTiles);

    setStarted(true);
  }

  const getBackgroundColor = (person: Person) => {


    switch (person.id) {
      case 1:
        return '#D4F0F0';
      case 2:
        return '#8FCACA';
      case 3:
        return '#CCE2CB';
      case 4:
        return '#B6CFB6';
      case 5:
        return '#97C1A9';
      case 6:
        return '#FF968A';
      case 7:
        return '#F6A6FF';
      case 8:
        return '#FFC5BF';
      case 9:
        return '#FFD8BE';
      case 10:
        return '#FFC8A2';
      case 11:
        return '#E7FFAC';
      case 12:
        return '#FEE1E8';
      case 13:
        return '#FED7C3';
      case 14:
        return '#F6EAC2';
      case 15:
        return '#ECD5E3';
      default:
        return '#ffffff';
    }
  }

  return (
    <>
      {loaded ?
        <div className='FrontPage_Container'>
          < div className='FrontPage_Wrapper'>
            <div className='FrontPage_Logo'><img src={Logo} alt="Logo" /></div>
            {started ?
              <>
                <div className='FrontPage_GridContainer'>
                  <div className='FrontPage_Grid'>
                    {selectedTiles.map((tile, index) => {
                      if (index < 24) {
                        return (
                          <div className='FrontPage_Tile' style={{ boxShadow: tile.isClicked ? 'inset 0 0 0 2px green' : 'inset 0 0 0 1px black', backgroundColor: getBackgroundColor(tile.ofPerson), color: tile.isClicked ? getBackgroundColor(tile.ofPerson) : 'black' }} key={index} onClick={() => test(tile)}>
                            {tile.condition}
                          </div>
                        )
                      }
                      return null;
                    })}
                    <div className='Gratis'>GRATIS</div>
                  </div>
                </div>
                <div className='FrontPage_UsersContainer'>
                  {selectedUsers.map((user, index) => {

                    return (
                      <div className='FrontPage_UserWrapper' key={index}>
                        <div className='FrontPage_UserColor' style={{ border: '1px solid black', backgroundColor: getBackgroundColor(user) }}>
                        </div>
                        <div className='FrontPage_UserName'>{user.name}</div>
                      </div>
                    )

                  })}
                </div>
              </>
              : <>
                <div className='FrontPage_StartContainer'>
                  <div className='FrontPage_Start' onClick={() => startGame()}>START</div>
                </div>
                <div className='FrontPage_PersonGrid'>
                  {personStore.allPersons.map((person, index) => {
                    return (
                      <div className='FrontPage_Tile' style={{ boxShadow: person.isClicked ? 'inset 0 0 0 2px green' : 'inset 0 0 0 1px black', backgroundColor: getBackgroundColor(person) }} key={index} onClick={() => selectPerson(person)}>
                        {person.name}
                      </div>
                    )
                  })}
                </div>
              </>
            }

          </div>
        </div > : null
      }
    </>
  )
}

export default observer(FrontPage)

