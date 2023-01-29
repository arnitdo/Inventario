import React, {useEffect, useState} from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {AiOutlineUser} from 'react-icons/ai'
import {RxDashboard} from 'react-icons/rx'
import {FaWarehouse} from 'react-icons/fa';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import StarBorder from '@mui/icons-material/StarBorder';
import {Grid} from "@mui/material";
import Card from "@mui/material/Card";
const drawerWidth = 360;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export type SidebarProps = {
  warehouses: string[]
}

export type OpMode = "DASHBOARD" | "WAREHOUSE" | "USERS"

export type OpProps = {
  targetWarehouse?: string
}

function DashboardView(props: OpProps){

  const [dashboardData, setDashboardData] = useState<any>(null)



  useEffect(() => {
    const makeDashReq = async () => {
      const req = await fetch(
        `http://localhost:8800/api/orgs/hackoders-corp/analytics`
      )

      const resJson = await req.json()

      const {status, ...dashData} = resJson

      if (status === "SUCCESS") {
        setDashboardData(dashData)
      }
    }

    makeDashReq()
  }, [])

  if (dashboardData == null) return dashboardData;

  return (
    <Grid
      sx={{
        display: "grid",
        gap: "8rem",
        gridTemplateColumns: "50% 50%",
        gridTemplateRows: "50% 50%"
      }}
    >
      <Card
        sx={{
          borderRadius: "10px",
          boxShadow: "5px 5px solid grey",
          padding: "2rem",
          display: "flex",
          gap: "1rem",
          flexDirection: "column"
      }}
      >
        <Typography variant={"h4"}>Most Updated Items</Typography>
        <Divider />
          <ul>
          {dashboardData.mostUpdatedItems.map((item: any) => {
            return (
              <li>{item.sku_id} x {item.sku_update_count}</li>
            )
          })}
        </ul>
      </Card>
      <Card
        sx={{
          borderRadius: "10px",
          boxShadow: "5px 5px solid grey",
          padding: "2rem",
          display: "flex",
          gap: "1rem",
          flexDirection: "column"
      }}
      >
        <Typography variant={"h4"}>Least Updated Items</Typography>
        <Divider />
        <ul>
          {dashboardData.leastUpdatedItems.map((item: any) => {
            return (
              <li>{item.sku_id} x {item.sku_update_count}</li>
            )
          })}
        </ul>
      </Card>
      <Card
        sx={{
          borderRadius: "10px",
          boxShadow: "5px 5px solid grey",
          padding: "2rem",
          display: "flex",
          gap: "1rem",
          flexDirection: "column"
      }}
      >
        <Typography variant={"h4"}>Out Of Stock</Typography>
        <Divider />
        {dashboardData.outOfStockItems.length > 0 ? (
          <ul>
            {dashboardData.outOfStockItems.map((item: any) => {
              return (
                <li>{item.sku_id}</li>
              )
            })}
          </ul>
          ) : (
           <Typography variant={"h2"}>Hooray! All items are in sufficient stock</Typography>
          )
        }
      </Card>
      <Card
        sx={{
          borderRadius: "10px",
          boxShadow: "5px 5px solid grey",
          padding: "2rem",
          display: "flex",
          gap: "1rem",
          flexDirection: "column"
      }}
      >
        <Typography variant={"h4"}>Inventory Valuation</Typography>
        <Divider />
        <Typography variant={"h2"}>
          $ {dashboardData.warehouseValue}
        </Typography>
      </Card>
    </Grid>
  )
}

function WarehouseDashboardView(props: OpProps){

  const [dashboardData, setDashboardData] = useState<any>(null)



  useEffect(() => {
    const makeDashReq = async () => {
      const req = await fetch(
        `http://localhost:8800/api/orgs/hackoders-corp/warehouses/${props.targetWarehouse!}/analytics`
      )

      const resJson = await req.json()

      const {status, ...dashData} = resJson

      if (status === "SUCCESS") {
        setDashboardData(dashData)
      }
    }

    makeDashReq()
  }, [props.targetWarehouse])

  if (dashboardData == null) return dashboardData;

  return (
    <Grid
      sx={{
        display: "grid",
        gap: "8rem",
        gridTemplateColumns: "50% 50%",
        gridTemplateRows: "50% 50%"
      }}
    >
      <Card
        sx={{
          borderRadius: "10px",
          boxShadow: "5px 5px solid grey",
          padding: "2rem",
          display: "flex",
          gap: "1rem",
          flexDirection: "column"
        }}
      >
        <Typography variant={"h4"}>Most Updated Items</Typography>
        <Divider />
        <ul>
          {dashboardData.mostUpdatedItems.map((item: any) => {
            return (
              <li>{item.sku_id} x {item.sku_update_count}</li>
            )
          })}
        </ul>
      </Card>
      <Card
        sx={{
          borderRadius: "10px",
          boxShadow: "5px 5px solid grey",
          padding: "2rem",
          display: "flex",
          gap: "1rem",
          flexDirection: "column"
        }}
      >
        <Typography variant={"h4"}>Least Updated Items</Typography>
        <Divider />
        <ul>
          {dashboardData.leastUpdatedItems.map((item: any) => {
            return (
              <li>{item.sku_id} x {item.sku_update_count}</li>
            )
          })}
        </ul>
      </Card>
      <Card
        sx={{
          borderRadius: "10px",
          boxShadow: "5px 5px solid grey",
          padding: "2rem",
          display: "flex",
          gap: "1rem",
          flexDirection: "column"
        }}
      >
        <Typography variant={"h4"}>Out Of Stock</Typography>
        <Divider />
        {dashboardData.outOfStockItems.length > 0 ? (
          <ul>
            {dashboardData.outOfStockItems.map((item: any) => {
              return (
                <li>{item.sku_id}</li>
              )
            })}
          </ul>
        ) : (
          <Typography variant={"h6"}>Hooray! All items are in sufficient stock</Typography>
        )
        }
      </Card>
      <Card
        sx={{
          borderRadius: "10px",
          boxShadow: "5px 5px solid grey",
          padding: "2rem",
          display: "flex",
          gap: "1rem",
          flexDirection: "column"
        }}
      >
        <Typography variant={"h4"}>Inventory Valuation</Typography>
        <Divider />
        <Typography variant={"h2"}>
          $ {dashboardData.warehouseValue}
        </Typography>
      </Card>
    </Grid>
  )
}


function Sidebar(props: SidebarProps) {
    const [useropen, setUserOpen] = React.useState(true);
  const [show,setShow] =React.useState(true);
  const toggle=()=>{
    setShow(!show);
  }
  const handleClick = () => {
    setUserOpen(!useropen);
  };
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setUserOpen(true);
    setShow(true);
  };

  const [operationMode, setOperationMode] = useState<OpMode>("DASHBOARD")

  const [targetWarehouse, setTargetWarehouse] = useState<string>("")

  return (
    <Box sx={{ display: 'flex', maxWidth: "75vw", maxHeight: "100vh"}}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            hackoders-corp Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
      
        <List>
       
       <ListItem disablePadding>
         <ListItemButton
          onClick={() => setOperationMode("DASHBOARD")}
         >
           <ListItemIcon>
           <RxDashboard/>
           </ListItemIcon>
           <ListItemText primary='Dashboard' />
         </ListItemButton>
       </ListItem>
 
   
        </List>
        <Divider />
        <List>
      <ListItemButton onClick={toggle}>
        <ListItemIcon>
          <FaWarehouse />
        </ListItemIcon>
        <ListItemText primary="Warehouses" />
        {show ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open && show} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {props.warehouses.map((warehouse) => {
            return (
              <ListItemButton sx={{ pl: 4 }} onClick={() => {setOperationMode("WAREHOUSE"); setTargetWarehouse(warehouse)}}>
                <ListItemIcon>
                  <FaWarehouse />
                </ListItemIcon>
                <ListItemText primary={warehouse} />
              </ListItemButton>
            )
          })}
        </List>
      </Collapse>

      </List>
      <Divider />
      <List>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <AiOutlineUser/>
        </ListItemIcon>
        <ListItemText primary="Users" />
        {useropen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open && useropen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <AiOutlineUser />
            </ListItemIcon>
            <ListItemText primary="Manage Users" />
          </ListItemButton>
        </List>
      </Collapse>

      </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {operationMode === "DASHBOARD" ?
          <DashboardView />
          : operationMode === "WAREHOUSE" ?
            <WarehouseDashboardView targetWarehouse={targetWarehouse} />
            : null
        }
      </Box>
    </Box>
  );
}

export { Sidebar }