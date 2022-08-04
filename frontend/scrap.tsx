// import * as React from 'react';
// import { useLocation } from 'react-router-dom'
// import ResponsiveAppBar from './Components/AppBar';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';


// interface CustomizedState {
//     groceryListState: any
// }

// interface TabPanelProps {
//     children?: React.ReactNode;
//     index: number;
//     value: number;
// }

// function TabPanel(props: TabPanelProps) {
//     const { children, value, index, ...other } = props;
//     return (
//         <div
//           role="tabpanel"
//           hidden={value !== index}
//           id={`simple-tabpanel-${index}`}
//           aria-labelledby={`simple-tab-${index}`}
//           {...other}
//         >
//           {value === index && (
//             <Box sx={{ p: 3 }}>
//               <Typography>{children}</Typography>
//             </Box>
//           )}
//         </div>
//       );
//     }
    

// function a11yProps(index: number) {
//     return {
//         id: `simple-tab-${index}`,
//         'aria-controls': `simple-tabpanel-${index}`,
//     };
// }

// const CalculationPage = () => {
//     const location = useLocation();
//     const state = location.state as CustomizedState; // Type Casting, then you can get the params passed via router
//     const { groceryListState } = state;

//     const [value, setValue] = React.useState(0);
//     const handleChange = (event: React.SyntheticEvent, newValue: number) => {
//       setValue(newValue);
//     };
  

//     React.useEffect(() => {
//         console.log('inUseEffect')
//         console.log(groceryListState)
//     }, [])

//     return (<div>
//         <ResponsiveAppBar/>
//         <Box sx={{ width: '100%' }}>
//         <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//           <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
//             <Tab label="Single Trip" {...a11yProps(0)} />
//             <Tab label="Multi Trip" {...a11yProps(1)} />
//           </Tabs>
//         </Box>
//         <TabPanel value={value} index={0}>
//           Single Trip
//         </TabPanel>
//         <TabPanel value={value} index={1}>
//           Multi Trip
//         </TabPanel>
//       </Box>
//     </div>) 

// }

// export default CalculationPage
