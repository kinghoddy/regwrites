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

class SignUp extends Component {
    state = {
        form: {
            username: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Username",
                    required: true
                },
                value: "",
                id: "usernme",
                label: "Username"
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Email",
                    required: true
                },
                value: "",
                id: "email",
                label: "Email"
            },
            password: {
                elementType: "input",
                elementConfig: {
                    required: true,
                    type: "password",
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
        photo: '',
        name: '',
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
        this.setState({ loading: true, sMessage: "Checking info  !" });
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase
            .auth()
            .signInWithPopup(provider)
            .then(result => {
                var user = result.user;
                this.saveUser(user);
            })
            .catch(error => {
                var errorMessage = error.message;
                this.setState({ errorMessage: errorMessage, loading: false });
            });
    };

    componentDidMount() {

    }


    saveUser = user => {
        var ref = firebase.database().ref("users/");
        ref.once("value", s => {
            const id = user.uid;
            if (s.val()) {

                if (s.val()[id]) {
                    this.setState({
                        loading: false,
                        userExist: true,
                        photo: s.val()[id].profilePicture,
                        name: s.val()[id].username
                    });
                }

            } else {
                this.setState({ loading: true, sMessage: "Completing Signup  !" });
                ref
                    .child(id)
                    .set({
                        username: user.displayName.toLowerCase(),
                        profilePicture: user.photoURL
                    })
                    .then(() => {
                        this.setState({ loading: false, errorMessage: null });
                        var search = Router.query.route;
                        if (search) {
                            Router.push("/" + search);
                        } else {
                            Router.push("/");
                        }
                    })
                    .catch(() => {
                        this.setState({
                            loading: false,
                            errorMessage: "Failed to save user to database"
                        });
                    });
            }
        });
    };
    signUpHandler = event => {
        event.preventDefault();
        this.setState({ loading: true, sMessage: "Checking info" });
        const formData = {};
        for (let formId in this.state.form) {
            formData[formId] = this.state.form[formId].value;
        }
        var ref = firebase.database().ref("users");
        ref.once("value", s => {
            var usernameExist = false;
            for (let keys in s.val()) {
                if (
                    formData.username.toLowerCase() ===
                    s.val()[keys].username.toLowerCase()
                ) {
                    usernameExist = true;
                    console.log(s.val()[keys].username);
                }
            }
            if (usernameExist) {
                this.setState({
                    errorMessage: (
                        <span>
                            Username <strong>{formData.username}</strong> Exists. Please{" "}
                            <strong>Pick another username</strong>
                        </span>
                    ),
                    loading: false
                });
            } else {
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(formData.email, formData.password)
                    .then(res => {
                        var user = firebase.auth().currentUser;
                        this.setState({ sMessage: "Please wait" });
                        user
                            .updateProfile({
                                displayName: formData.username.toLowerCase(),
                                photoURL: '/avatar-red.png'
                            })
                            .then(() => {
                                this.saveUser(user);
                            })
                            .catch(error => {
                                // An error happened.
                                const errorMessage = "Failed Authenticate";
                                this.setState({ loading: false, errorMessage: errorMessage });
                            });
                    })
                    .catch(error => {
                        // Handle Errors here.
                        var errorMessage = error.message;
                        this.setState({ loading: false, errorMessage: errorMessage });
                        // ...
                    });
            }
        });
    };

    render() {
        const formElementArray = [];
        for (let key in this.state.form) {
            formElementArray.push({
                id: key,
                config: this.state.form[key]
            });
        }
        return <Wrapper route="signup">
            <Head>
                <title>Sign up | GPPCR</title>
                <meta property="og:title" content="Sign up | GPPCR " />
                <meta property="og:description"
                    content=" create your gppcr account today" />
            </Head>
            {this.state.loading ? (
                <Spinner message={this.state.sMessage} fontSize="5px" />
            ) : this.state.userExist ? (
                <div className="d-flex flex-column justify-content-center">
                    <img
                        src={this.state.photo}
                        alt=""
                        className="rounded-circle mx-auto my-2"
                        style={{ height: "5rem" }}
                    />
                    <p>
                        An account was found for {this.state.name}. If this is you,
                            <Link href="login"><a> Proceed to login </a></Link> else
                        <Link href="signup" >
                            <a onClick={() => {
                                this.setState({ userExist: false });
                            }}>
                                Try again with another email
                                    </a>
                        </Link>
                    </p>
                </div>
            ) :
                    (
                        <form className="pt-4" onSubmit={this.signUpHandler}>
                            {this.state.errorMessage ? (
                                <Alert type="warning" show={true}>
                                    {this.state.errorMessage}
                                </Alert>
                            ) : null}

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
                                className='btn-success btn btn-lg btn-block  text-uppercase font-weight-bold mb-2'
                                type="submit"
                            >
                                Sign up
        </button>

                            <div className="text-center">

                                <br />
                                <Link href="/login">
                                    <a className="small">
                                        Already have an account ? Go to login
                            </a>
                                </Link>
                            </div>
                            <style jsx >{`
                        .googleBtn {
                            background: #66f;
                            color: white;
                            position : relative;
                            overflow : hidden;
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

export default SignUp;
