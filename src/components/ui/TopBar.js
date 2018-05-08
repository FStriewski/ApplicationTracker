
import React from 'react'
import LogInPage from '../userHandling/LogInPage'
import LogOutPage from '../userHandling/LogOutPage'
import SignUpPage from '../userHandling/SignUpPage'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import Dehaze from '@material-ui/icons/Dehaze'
import FilterCenterFocus from '@material-ui/icons/FilterCenterFocus'

const styles = {
bar: {
  borderColor: "white",
  color: "white",
  borderWidth: "0.5px",
  borderStyle: "solid",
  backgroundColor: "#4D484F",
},
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title:{
    color: "white",
  },
  icon:{
    height: "15%",
  },
};

class TopBar extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
  };

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar className={classes.bar} position="static" color="inherit">
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>
              {/* <Link to={'/companys'} component={CompanyList} className="companys"> List</Link> */}
              <FilterCenterFocus className={classes.icon}/>
              <span className={classes.title}> Application Tracker </span>
            </Typography>
          
              <div>  
              <IconButton
                aria-owns={open ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <Dehaze />
              </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}><Link to={'/login'} component={LogInPage} className="login">Log In</Link></MenuItem>
                  <MenuItem onClick={this.handleClose}><Link to={'/logout'} component={LogOutPage} className="logout">Log Out</Link></MenuItem>
                  <MenuItem onClick={this.handleClose}><Link to={'/signup'} component={SignUpPage} className="signup">Sign Up</Link></MenuItem>
                </Menu>
              </div>
          
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(TopBar);