import * as React from 'react';
import ResponsiveAppBar from './Components/AppBar';
import SearchComponent from './Components/SearchComponent'
import CardComponent from './Components/CardComponent'
import CartComponent from './Components/CartComponent';
import { Box } from '@mui/material';


export interface searchItemResults {
  name: string; 
  description: string; 
  image: string;
}


//Now my searchItems is linked to my top level App. I need to update my card components depending on what gets returned

const pageLevelStyling = {
  display: "flex",
  flexDirection: "column"
}

const splitStyling = {
  display: "flex",
  flexDirection: "horizontal"
}

const leftLevelStyling = {
  width: "75%"
}

const rightLevelStyling = {
  width: "25%",
  display: "flex"
}

const searchItemStyling = {
  display: "flex",
  flexDirection: "horizontal",
  flexWrap: "wrap",
  marginTop: "1rem",
  marginLeft: "2rem",
  gap: "5rem",
  rowGap: "2rem"
}

const groceryItemStyling = {
  flexGrow: 1
}

export const App: React.FC = () =>{

    const [searchItems, setSearchItem] = React.useState<searchItemResults[]>([]) //setSearchItems is a callback function from the searchComponent
    const [groceryList, setGroceryList] = React.useState<searchItemResults[]>([]) //groceryList is the input into the Cart Component, append-pop to change

    //There should be a useEffect on groceryList and search items so that this component rerenders to show the correct items 

    function setSearchItemCallback (items: searchItemResults[]) {
      // console.log(searchItems)
      setSearchItem(items)
    }



    function setGroceryListCallback (item: searchItemResults) {
      if(!groceryList.includes(item)) {
       setGroceryList(prevState => [...prevState, item])
      }
    }

    function setGroceryListDeleteCallback (item: searchItemResults) {
      const index = groceryList.indexOf(item);
      // console.log(index)
      if (index > -1) {
        const tempArray = setGroceryList( (prevState) => { 
        const tempArray = [...prevState]
        tempArray.splice(index,1)
        return tempArray
      })
      }
    }

    return (
      <Box className="App" sx={pageLevelStyling}>
        <ResponsiveAppBar/>
        <Box className="SplitSection" sx={splitStyling}>
        <Box className="leftSection" sx={leftLevelStyling}>
          <SearchComponent searchItemCallback={setSearchItemCallback}/>
          <Box className="searchItems" sx={searchItemStyling}>
            {searchItems.length > 0 && (searchItems.map((item) => (<CardComponent product={item} groceryListCallback={setGroceryListCallback}/>)))}
          </Box>
        </Box>
          <Box className="rightSection" sx={rightLevelStyling}>
          <CartComponent groceryList={groceryList} searchItemCallback={setGroceryListDeleteCallback}/>
        </Box>
        </Box>
      </Box>
    );



  }

export default App;
