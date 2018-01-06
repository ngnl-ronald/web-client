import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { userActions } from '../_actions';
import Input, { InputLabel } from 'material-ui/Input';
import { lookupService } from '../_services';

import { withStyles } from 'material-ui/styles';
import { FormControl, FormHelperText } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu'
const styles = theme => ({
    container:{
        display: 'flex',
        flexWrap: 'flex'
    },
    formControl: {
        margin: theme.spacing.unit,
    }
})

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: '',
                password: '',
                securityuserlevelid: '',
            },
            submitted: false,
            age: '',
            categories: [{
                lookup_id: '',
                lookup_name: ''
            }]
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }
    componentDidMount(){
        lookupService.authUserRoles().then((data) => {
            this.setState(
                {
                    categories: data
                }
            );
        })
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            },
        });

    }
    handleSelectChange(event) {
        
 
        
        this.setState({
            'age': event.target.value
        })

      };
    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.username && user.password) {
            dispatch(userActions.register(user));
        }
    }

    render() {
        const { registering, classes  } = this.props;
        const { user, submitted, categories } = this.state;
        return (
            <div>
            <h2>Register</h2>
            <div className={classes.container}>
                
                <form name="form" onSubmit={this.handleSubmit}>
                    <FormControl
                        className={classes.formControl}
                        error={(submitted && !user.username ? true : false)}
                    >
                    <InputLabel htmlFor="username-error">Username</InputLabel>
                    <Input label="Username" htmlFor="username-error" name="username" value={this.state.username} onChange={this.handleChange}  />
                    {submitted && !user.username &&<FormHelperText id="name-error-text">Username is required</FormHelperText>}
                </FormControl>

                    <FormControl
                        className={classes.formControl}
                        error={(submitted && !user.password ? true : false)}
                    >
                        <InputLabel htmlFor="password-error">Password</InputLabel>
                        <Input label="Password" htmlFor="password-error" name="password" value={this.state.password} onChange={this.handleChange} type="password" />
                        {submitted && !user.password &&<FormHelperText id="name-error-text">Password is required</FormHelperText>}
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-native-simple">Age</InputLabel>
                        <Select
                            native
                            value={this.state.age}
                            onChange={this.handleSelectChange}
                            input={<Input id="age-native-simple" />}
                        >
                        <option key='' value=""/>
                        {
                            categories.map(function(category, index){
                                return <option key={index} value={category.lookup_id}>{category.lookup_name}</option>
                            })
                        }

                        </Select>
                        </FormControl>
                    <div>
                        <br/>
                    <Button raised color="primary" onClick={this.handleSubmit}>Register</Button>
                    {registering && 
                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    }
                    </div>
                </form>
            </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedRegisterPage = compose(
    withStyles(styles, { withTheme: true }),
    connect(mapStateToProps)
    )(RegisterPage);

export { connectedRegisterPage as RegisterPage };