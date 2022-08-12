import * as React from 'react';
import { useLocation } from 'react-router-dom'
import ResponsiveAppBar from './Components/AppBar';
import { styled } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import mockStores from "./mockStores.json"
import StoreCardComponent from './Components/StoreCardComponent';
import axios from 'axios';


interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


interface CustomizedState {
    groceryListState: any
}


const CalculationPage = () => {
    const location = useLocation();
    const state = location.state as CustomizedState; // Type Casting, then you can get the params passed via router
    const { groceryListState } = state;
    const [storeData, setStoreData] = React.useState<any>([])
   
    React.useEffect(() => {
        //axios call here and reassign storeData to correct data
        axios.get("/api/store", { params: { answer: groceryListState } }).then(resp => {
        setStoreData(resp.data);
        console.log(resp.data)
        console.log('hello')
        });
      }, [])

    return (<div>
        <ResponsiveAppBar/>
        {(storeData.length > 0) && <StoreCardComponent title={storeData[0].name} description={storeData[0].description} imagePath={storeData[0].picture} total={storeData[0].total} groceryList={storeData[0].groceries} storeHours={storeData[0].storeHours}/>}
    </div>) 

}

export default CalculationPage
