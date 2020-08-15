import React, { Component } from "react";
import Link from 'next/link';
import firebase from "../../firebase";
import "firebase/auth";
import "firebase/database";
import Input from "../../components/UI/Input/Input";
import Spinner from "../../components/UI/Spinner/Spinner";
import Toast from "../../components/UI/Toast/Toast";
import Alert from "../../components/UI/Alert/Alert";
import Wrapper from '../../components/auth.js'
import Head from 'next/head';
import Router from 'next/router'


class Login extends Component {
    state = {
        form: {
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Email Address",
                    required: true
                },
                value: "",
                id: "email",
                label: "Email address"
            },
            password: {
                elementType: "input",
                elementConfig: {
                    required: true,
                    type: "password",
                    minLength: 6,
                    placeholder: "Your password"
                },
                value: "",
                label: "Your password",
                id: "password"
            }
        },
        errorMessage: null,
        sMessage: "Please Wait ! ! !",
        loading: false,
        userExist: null,
        shouldLogin: false,
        toast: null
    };
    inputChanged = (e, id) => {
        const updatedForm = {
            ...this.state.form
        };
        const updatedFormEl = { ...updatedForm[id] };
        updatedFormEl.value = e.target.value;
        updatedForm[id] = updatedFormEl;
        this.setState({ form: updatedForm });
    };

    googleLogin = () => {
        this.setState({ loading: true, sMessage: "Checking info" });

        var provider = new firebase.auth.GoogleAuthProvider();
        firebase
            .auth()
            .signInWithPopup(provider)
            .then(result => {
                this.setState({ errorMessage: null, loading: false });
                var user = result.user;
                if (result.additionalUserInfo.isNewUser === true) {
                    this.setState({ toast: "Finish setting up your skymail account" });
                    this.saveUser(user);
                } else {
                    this.fetchUser(user);
                }
            })
            .catch(error => {
                var errorMessage = error.message;
                this.setState({
                    errorMessage: (
                        <span>
                            <strong>Failed </strong>
                            {errorMessage}
                        </span>
                    ),
                    loading: false
                });
            });
    };

    componentDidMount() {
        this.checkUser()
        console.log(Router.query);

    }
    fetchUser = user => {
        if (user !== null) {
            this.setState({ loading: false, errorMessage: null, shouldLogin: true });
        } else {
            var errorMessage = <strong>Failed</strong>;
            this.setState({ loading: false, errorMessage: errorMessage });
        }
        if (this.state.shouldLogin) {
            var search = Router.query.route;

            if (search) {
                Router.push("/" + search);
            } else {
                Router.push("/");
            }
        }
    };
    saveUser = user => {
        var ref = firebase.database().ref("users/");
        const id = user.uid;

        this.setState({ loading: true, sMessage: "Completing Signup  !" });
        ref
            .child(id)
            .set({
                username: user.displayName.toLowerCase(),
                profilePicture: user.photoURL
            })
            .then(() => {
                this.setState({ loading: false, errorMessage: null });
                Router.push('/');
            })
            .catch(() => {
                this.setState({
                    loading: false,
                    errorMessage: "Failed to save user to database"
                });
            });
    };
    signInHandler = event => {
        event.preventDefault();
        this.setState({ loading: true });
        const formData = {};
        for (let formId in this.state.form) {
            formData[formId] = this.state.form[formId].value;
        }
        firebase
            .auth()
            .signInWithEmailAndPassword(formData.email, formData.password)
            .then(res => {
                // User is signed in.
                var user = res.user;
                this.fetchUser(user);
            })
            .catch(error => {
                // Handle Errors here.
                var errorMessage = error.message;
                this.setState({ loading: false, errorMessage: errorMessage });
                // ...
            });
    };
    checkUser = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                const userdata = {
                    username: user.displayName,
                    profilePicture: user.photoURL
                }
                this.setState({ userData: userdata })
            }
        })
    }
    render() {
        const formElementArray = [];
        for (let key in this.state.form) {
            formElementArray.push({
                id: key,
                config: this.state.form[key]
            });
        }
        return <Wrapper>
            <Head>
                <title>Login | pointofviewafrica</title>
                <meta property="og:title" content="Login | Point of view africa POVA " />
                <meta property="og:url" content="https://www.pointofviewafrica.com/login" />
                <meta property="og:description"
                    content=" Admin login pointofviewafrica.com" />
            </Head>
            {this.state.loading ? (
                <Spinner message={this.state.sMessage} />
            ) : (
                    <form className="pt-4" onSubmit={this.signInHandler}>
                        {this.state.errorMessage ? (
                            <Alert type="warning" show={true}>
                                {this.state.errorMessage}
                            </Alert>
                        ) : null}
                        {this.state.userData ? <div className=" py-4 mx-auto d-flex text-light align-items-center justify-content-center">
                            <img style={{ height: "4rem", flexShrink: 0, width: "4rem", objectFit: "cover" }} src={this.state.userData.profilePicture} className="bg-light rounded-circle " alt="" />
                            <div className="text-light px-3 ">

                                <h4 style={{ fontSize: ".8rem" }} className="text-dark h6">{this.state.userData.username} is already logged in</h4>
                                <button style={{ fontSize: ".6rem" }} onClick={()=>Router.back()} className="btn btn-outline-dark px-3 btn-sm  rounded-pill"> Continue as {this.state.userData.username}
                                </button>
                               
                            </div>
                        </div>
                            : null}
                        {this.state.toast ? <Toast>{this.state.toast}</Toast> : null}
                        <button
                            className='googleBtn btn rounded-pill btn-lg btn-block  mb-2 '
                            type="button"
                            onClick={this.googleLogin}
                        >
                            <img
                                src='/img/google.png'
                                alt=""
                                className="mr-4"
                            />
          Continue with google
        </button>
                        <p className="text-center text-primary"> Or</p>

                        {formElementArray.map(el => (
                            <Input
                                elementType={el.config.elementType}
                                elementConfig={el.config.elementConfig}
                                value={el.config.value}
                                id={el.id}
                                key={el.config.id}
                                label={el.config.label}
                                changed={e => {
                                    this.inputChanged(e, el.id);
                                }}
                            />
                        ))}

                        <button
                            className='btn-warning btn btn-lg btn-block  text-uppercase font-weight-bold mb-2'

                            type="submit"
                        >
                            Sign in
        </button>

                        <div className="text-center">
                            {/* <Link href="/">
                                <a className="small">
                                    Forgot password?
                            </a>
                            </Link> */}
                            <br />
                            <Link className="small" href="/signup">
                                <a className="small">
                                    Create new account
                            </a>
                            </Link>
                        </div>
                        <style jsx >{`
 .googleBtn {
                            background: #66f;
                            color: white;
                            position : relative;
                            overflow : hidden;
                            font-size : 1rem;
                            font-weight : bold;
                        }
.googleBtn img {
    position : absolute;
    left : 0;
    background : white;
    top : 0;
    height : 100%;
}

                        `}</style>
                    </form>
                )}</Wrapper>
    }
}

export default Login;
