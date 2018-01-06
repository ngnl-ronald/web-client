import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { userActions } from "../_actions";

import { TextField } from "material-ui/TextField";

import { withStyles } from "material-ui/styles";
import { FormControl, FormHelperText } from "material-ui/Form";
import Input, { InputLabel, InputAdornment } from "material-ui/Input";
import IconButton from "material-ui/IconButton";
import Visibility from "material-ui-icons/Visibility";
import VisibilityOff from "material-ui-icons/VisibilityOff";
import Email from "material-ui-icons/Email";
import Button from "material-ui/Button";

const styles = theme => ({
    root: {
        display: "flex",
        flexWrap: "wrap"
    },
    formControl: {
        margin: theme.spacing.unit
    },
    withoutLabel: {
        marginTop: theme.spacing.unit * 3
    },
    button: {
        margin: theme.spacing.unit,
      },
});

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            username: "admin",
            password: "masterkey",
            showPassword: false,
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }

    handleClickShowPassword() {
        this.setState({
            showPassword: !this.state.showPassword
        });
    }

    render() {
        const { loggingIn, classes } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <div>
                <h2>Login</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="amount">Username</InputLabel>
                        <Input
                            id="amount"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                            endAdornment={
                                <InputAdornment position="start">
                                    <Email />
                                </InputAdornment>
                            }
                        />
                        {submitted &&
                            !username && (
                                <div className="help-block">
                                    Username is required
                                </div>
                            )}
                    </FormControl>
                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                            id="password"
                            name="password"
                            type={this.state.showPassword ? "text" : "password"}
                            value={this.state.password}
                            onChange={this.handleChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={this.handleClickShowPasssword}
                                        onMouseDown={
                                            this.handleMouseDownPassword
                                        }
                                    >
                                        {this.state.showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        {submitted &&
                            !password && (
                                <div className="help-block">
                                    Password is required
                                </div>
                            )}
                    </FormControl>
                    
                    <div className="form-group">
                        <Button
                            type="submit"
                            raised
                            color="primary"
                            className={classes.button}
                        >
                            Login
                        </Button>
                        {loggingIn && (
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        )}
                        <Link to="/register" className="btn btn-link">
                            Register
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

// const connectedLoginPage = connect(mapStateToProps)(LoginPage);
// export { connectedLoginPage as LoginPage };

const connectedLoginPage = compose(
    withStyles(styles, { withTheme: true }),
    connect(mapStateToProps)
)(LoginPage);

export { connectedLoginPage as LoginPage };
