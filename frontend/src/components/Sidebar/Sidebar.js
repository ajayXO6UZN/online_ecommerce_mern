import React, { useEffect } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Avatar from '@material-ui/core/Avatar';
import aj from "../../assets/img/download.png";
import Link from '@material-ui/core/Link';
import { NavLink } from 'react-router-dom';
import useStyles from './style';
import { useDispatch, useSelector } from 'react-redux';



const Sidebar = ({ open, handleDrawerOpen }) => {
    const classes = useStyles(open);
    const listItemData = [
        { label: 'Dashboard', link: '/', icon: <MailIcon /> },
        { label: 'Categories', link: '/test', icon: <InboxIcon /> },
        { label: 'Produts', link: '/product', icon: <MailIcon /> },
        { label: 'Users', link: '/user', icon: <InboxIcon /> },
        { label: 'Page', link: '/page', icon: <MailIcon /> },
        { label: 'Orders', link: '/orders', icon: <InboxIcon /> },
        { label: 'Profile', link: '/profile', icon: <InboxIcon /> },
    ];

    const { user } = useSelector((state) => state.user);

    const userRole = () => {
        console.log(user.role)
        if(user && user.role != 'admin'){
            listItemData.splice(3,1);
        }
        
    }
  
    return (

        <>  {userRole()}
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}

                anchor="left"
            >
                <div className={classes.toolbar}>
                    <Link href='#' className={classes.itemCenter}>
                        <Avatar alt="Travis Howard" className={classes.imgWidth} src={aj} />
                        <div className={classes.ecom}> E-COMMERCE  </div>
                    </Link>
                </div>

                <Divider variant="middle" className={classes.divider} />
                <List className={classes.listBox}>
                    {listItemData.map((text, index) => (
                        <ListItem component={NavLink}
                            className={classes.listItem}
                            activeClassName={classes.active}
                            to={text.link} button key={text}
                        >

                            <ListItemIcon className={classes.listIcon}>{text.icon}</ListItemIcon>
                            <ListItemText primary={text.label} />

                        </ListItem>
                    ))}
                </List>

            </Drawer>

        </>
    );
}


export default Sidebar;





