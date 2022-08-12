import * as React from 'react';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StoreCardGroceryComponent from './StoreCardGroceryComponent';
import { Box } from '@mui/material';


interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }

export interface groceryListInterface {
    name: string, 
    price: string, 
    image: string
}

interface StoreCardComponentProps {
    title: string,
    description: string,
    imagePath: string,
    total: string, 
    groceryList: groceryListInterface[],
    storeHours: string
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

  const pageLevelStyling = {
    display: "flex",
    marginTop: "3rem",
    justifyContent: "center",
    alignItems: "center"
    
  }

const StoreCardComponent = ({title, description, imagePath, total, groceryList, storeHours}: StoreCardComponentProps) => {

    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
      };

    return (<Box sx={pageLevelStyling}>
        <Card sx={{ width: 345 }}>
        <CardMedia
        component="img"
        height="194"
        image={imagePath}
        alt={title}
        />
        <CardHeader
            title= {title}
            subheader={description}
        />
      <CardActions disableSpacing>
      <Typography variant='h6'>
        Store Hours: {storeHours}
      </Typography>
      <Typography variant="h6" color="text.primary">
            Total Price: {total}
        </Typography>
        <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
        >
            <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <StoreCardGroceryComponent groceryList={groceryList}/>
        </CardContent>
      </Collapse>
    </Card>
    </Box>) 
}

export default StoreCardComponent
