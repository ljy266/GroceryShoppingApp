import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { searchItemResults } from '../App';

//Should take in an object that has a title, image, description, potentially id. 

export interface cardComponentProps {
  product: searchItemResults,
  groceryListCallback: (item: searchItemResults) => void
}

//image from cardmedia still needs to work dynamically
const CardComponent = ({product, groceryListCallback}: cardComponentProps) => {
  return (
    <Card sx={{ width: 345 }} raised>
      <CardMedia  
        component="img"
        height="140"
        image={product.image}
        alt="green iguana"
      />
      <CardContent> 
        <Typography gutterBottom variant="h5" component="div">
          {product.name} 
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={(() => groceryListCallback(product) )}>Add to Cart</Button>
      </CardActions>
    </Card>
  );
}

export default CardComponent
