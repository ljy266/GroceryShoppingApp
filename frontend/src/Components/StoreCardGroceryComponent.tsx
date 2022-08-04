import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { searchItemResults } from '../App';
import { Link } from 'react-router-dom';
import { groceryListInterface } from './StoreCardComponent';

//grocery cart component is a component that takes in a list of items, displays these items in vertical format with a trash icon next to it.  At the end of the list there should be a calculate button 

export interface storeCardGroceryComponentProps {
  groceryList: groceryListInterface[]
}
  
const Demo = styled('div')(({ theme }) => ({
backgroundColor: theme.palette.background.paper,
}));

const StoreCardGroceryComponent = ({groceryList}: storeCardGroceryComponentProps) => {
  
    console.log(groceryList)
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);

    return ( 
    <Box sx={{maxWidth: 752}}>
        <Grid item xs={12} md={6}>
        <Demo>
          <List dense={dense}>
            {groceryList.map((item) => 
              <ListItem>
                <ListItemAvatar>
                  <Avatar src={item.image}>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  secondary={item.price}
                />
              </ListItem>
            )}
          </List>
        </Demo>
        </Grid>
    </Box>) 
}

export default StoreCardGroceryComponent
