import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import classNames from "classnames";
import Drawer from "material-ui/Drawer";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import List from "material-ui/List";
import Typography from "material-ui/Typography";
import Divider from "material-ui/Divider";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";
import ChevronLeftIcon from "material-ui-icons/ChevronLeft";
import AccountCircle from "material-ui-icons/AccountCircle";
import { styles } from "./styles";
import { mailFolderListItems, otherMailFolderListItems } from "./tileData";
import { Manager, Target, Popper } from 'react-popper';
import ClickAwayListener from 'material-ui/utils/ClickAwayListener';
import { MenuItem, MenuList } from 'material-ui/Menu';
import Grow from 'material-ui/transitions/Grow'
import Paper from 'material-ui/Paper';

import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { history } from "../_helpers";
import { alertActions } from "../_actions";
import { PrivateRoute } from "../_components";
import { HomePage } from "../HomePage";
import { LoginPage } from "../LoginPage";
import { RegisterPage } from "../RegisterPage";


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            auth: true,
            openMenuAccount: false
        };

        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleClickAccount = this.handleClickAccount.bind(this);
        this.handleCloseAccount = this.handleCloseAccount.bind(this);
        this.handleLogout = this.handleLogout.bind(this);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    handleLogout(){
        history.push('/login');
        this.setState({ openMenuAccount: false })
    }

    handleCloseAccount(){
        this.setState({ openMenuAccount: false })
    }

    handleClickAccount() {
        this.setState({ openMenuAccount: true });
    }

    handleDrawerOpen() {
        this.setState({ open: true });
    }

    handleDrawerClose() {
        this.setState({ open: false });
    }

    render() {
        const { classes } = this.props;
        const { alert, theme, loggedIn } = this.props;
        const { auth } = this.state;
        const { openMenuAccount } = this.state;
        const drawer = (
            <Drawer
                type="permanent"
                classes={{
                    paper: classNames(
                        classes.drawerPaper,
                        !this.state.open && classes.drawerPaperClose
                    )
                }}
                open={this.state.open}
            >
                <div className={classes.drawerInner}>
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List className={classes.list}>{mailFolderListItems}</List>
                    <Divider />
                    <List className={classes.list}>
                        {otherMailFolderListItems}
                    </List>
                </div>
            </Drawer>
        );
        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    {loggedIn && (
                        <div>
                            <AppBar
                                className={classNames(
                                    classes.appBar,
                                    this.state.open && classes.appBarShift
                                )}
                            >
                                <Toolbar disableGutters={!this.state.open}>
                                    <IconButton
                                        color="contrast"
                                        aria-label="open drawer"
                                        onClick={this.handleDrawerOpen}
                                        className={classNames(
                                            classes.menuButton,
                                            this.state.open && classes.hide
                                        )}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                    <Typography
                                        type="title"
                                        color="inherit"
                                        noWrap
                                        className={classes.flex}
                                    >
                                        Phrost
                                    </Typography>
                                    <Manager>
                                        <Target>
                                            <IconButton
                                                aria-owns={openMenuAccount ? "menu-appbar" : null}
                                                aria-haspopup="true"
                                                onClick={this.handleClickAccount}
                                                color="contrast"
                                            >
                                                <AccountCircle />
                                            </IconButton>

                                        </Target>
                                        <Popper
                                            placement="bottom-start"
                                            eventsEnabled={openMenuAccount}
                                            className={classNames({ [classes.popperClose]: !openMenuAccount })}
                                        >
                                            <ClickAwayListener onClickAway={() => this.setState({ openMenuAccount: false })}>
                                            <Grow in={openMenuAccount} id="menu-list" style={{ transformOrigin: '0 0 0' }}>
                                                <Paper>
                                                <MenuList role="menu">
                                                    <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                                                </MenuList>
                                                </Paper>
                                            </Grow>
                                            </ClickAwayListener>
                                        </Popper>
                                    </Manager>

                                </Toolbar>
                            </AppBar>
                            { drawer }
                        </div>
                    )}
                    <main className={classes.content}>
                        {alert.message && (
                            <div className={`alert ${alert.type}`}>
                                {alert.message}
                            </div>
                        )}
                        <Router history={history}>
                            <div>
                                <PrivateRoute
                                    exact
                                    path="/"
                                    component={HomePage}
                                />
                                <Route path="/login" component={LoginPage} />
                                <Route
                                    path="/register"
                                    component={RegisterPage}
                                />
                            </div>
                        </Router>
                    </main>
                    
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    const { loggedIn } = state.authentication;
    return {
        alert,
        loggedIn
    };
}

// const connectedApp = connect(mapStateToProps)(App);
// export { connectedApp as App };

const connectedApp = compose(
    withStyles(styles, { withTheme: true }),
    connect(mapStateToProps)
)(App);

export { connectedApp as App };
