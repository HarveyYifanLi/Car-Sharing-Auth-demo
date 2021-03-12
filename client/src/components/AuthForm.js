import React, {Component} from "react";

class AuthForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",
            profileImageUrl: ""
        };
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        const authType = this.props.signUp ? "signup" : "signin";
        this.props.onAuth(authType, this.state).then(() => {
            this.props.history.push("/");//redirect using history from react-router
        }).catch(() => {return;});
    }
    
    render(){
        const {email, username, password, profileImageUrl} = this.state;
        const {buttonText, signUp, errors, history, removeError} = this.props;
    // history comes from react router and will listen for any change in the route  
        history.listen(() => {
            removeError();// remove the error message on the screen if switch a route
        });
        
        return (
            <div>
                <div className="row justify-content-md-center text-center">
                    <div className="col-md-6">
                        <form onSubmit={this.handleSubmit}>
                            {errors.message && (
                                <div className="alert alert-danger">{errors.message}</div>
                            )}
                            
                            <label htmlFor="email">Email address</label>
                            <input 
                                className="form-control"
                                id="email"
                                name="email"
                                onChange={this.handleChange}
                                value={email}
                                type="email"
                                required
                            />
                            <label htmlFor="password">Password</label>
                            <input 
                                className="form-control"
                                id="password"
                                name="password"
                                minLength="8"
                                onChange={this.handleChange}
                                type="password"
                            />
                           { (signUp) && (
                                <div>
                                    <label htmlFor="username">Username</label>
                                    <input 
                                        className="form-control"
                                        id="username"
                                        name="username"
                                        onChange={this.handleChange}
                                        value={username}
                                        type="text"
                                    />
                                    <label htmlFor="image-url">Image Url</label>
                                    <input 
                                        className="form-control"
                                        id="image-url"
                                        name="profileImageUrl"
                                        onChange={this.handleChange}
                                        type="text"
                                        value={profileImageUrl}
                                    />
                                </div>
                             )
                           }
                           <hr />
                           <button type="submit" className="btn btn-primary btn-block btn-lg">
                            {buttonText}
                           </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AuthForm;
