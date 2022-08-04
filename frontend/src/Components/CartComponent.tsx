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

//grocery cart component is a component that takes in a list of items, displays these items in vertical format with a trash icon next to it.  At the end of the list there should be a calculate button 

export interface cartComponentProps {
  groceryList: searchItemResults[],
  searchItemCallback: (item: searchItemResults) => void
}
  
const Demo = styled('div')(({ theme }) => ({
backgroundColor: theme.palette.background.paper,
}));

const cartComponentStyling = {
  maxWidth: 752, 
  width: 300,
  position: "sticky", 
  top: 0, 
  height: "fit-content"
}

const CartComponent = ({groceryList, searchItemCallback}: cartComponentProps) => {
  

    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);

    const backendCalculation = () => {
      console.log('hello')
    }


    return ( 
    <Box sx={cartComponentStyling}>
        <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
         Current Grocery List
        </Typography>
        <Demo>
          <List dense={dense}>
            {groceryList.map((item) => 
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => searchItemCallback(item)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  secondary={secondary ? 'Secondary text' : null}
                />
              </ListItem>
            )}
          </List>
          {groceryList.length > 0 && <Link to="/calculate" state={{groceryListState: groceryList}} style={{textDecoration: "none", marginTop: "1rem"}}><Button variant="contained">Calculate</Button></Link>} 
        </Demo>
        </Grid>
    </Box>) 
}

export default CartComponent
