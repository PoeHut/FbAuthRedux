import React, {useState, useEffect}  from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { connect } from 'react-redux'
import {updateUser}  from '../reducers/Auth'
import Spinner from '../common/Spinner';

const LoginScreen = props => {
    
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [emailError, setEmailError] = useState(null)
    const [passwordError, setPasswordError] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    //check authuser or not
    try{
        AsyncStorage.getItem('Auth').then(value => {
            if (value) {
                console.log(value)
                props.navigation.navigate('TabNav')
            }    
        });
    } catch (e) {
        console.log('Failed to fetch the data from storage')
    }    

    const createLogin = () => {

        setLoading(true);

        auth().signInWithEmailAndPassword(email, password)
        .then((result) => {
            onLoginSuccess()
            props.onUpdateUser(result)
            AsyncStorage.setItem('Auth', result.user.email)
            props.navigation.navigate('TabNav')
        })
       .catch(() => {
            auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                onLoginSuccess()
                props.onUpdateUser(result)
                props.navigation.navigate('TabNav')
            })
            .catch((e) => {
                console.log(e);
                onLoginFail()                
            })
       })
    }

    const onLoginSuccess = () => {
        setEmail(null)
        setPassword(null)
        setError(null)
        setLoading(false)
    }

    const onLoginFail = () => {
        setLoading(false)
        setError("Authentication fail. Please try again.")
    }

    const FormValidtaion = () => {
        if(!email) {
            setEmailError("Please fill your email.")
        } else {
             setEmailError(null)
         }
 
         if(!password) {
             setPasswordError("Please fill your password.")
         } else {
             setPasswordError(null)
         }

         if(!email || !password) return;  else createLogin();
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Email"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText = {text => setEmail(text)}
                    value={email}
                />
                {
                    emailError
                    ? <Text style={{color: '#F00'}}>{emailError}</Text>
                    : null
                }
                
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    onChangeText = {text => setPassword(text)}
                    value={password}
                />
                {
                    passwordError
                    ? <Text style={{color: '#F00'}}>{passwordError}</Text>
                    : null
                }

                {
                    error
                    ? <Text style={{color: '#F00'}}>{error}</Text>
                    : null
                }
    
                {
                    loading ?
                    <View style={styles.buttonStyle}>
                        <Spinner size="small" />
                    </View>
                    :
                        <TouchableOpacity style={styles.buttonStyle} onPress={() => FormValidtaion()}>
                            <Text style={styles.txtStyle}>Login</Text>
                        </TouchableOpacity>
                }
            </View>

            {/* <View>
                <TouchableOpacity>
                    <Text style={styles.forgetPwdText}>Forget Password?</Text>
                </TouchableOpacity>
            </View>    */}
        </View>
    )
}

const stateToProps = state => (
    { authUser: state.auth }
)

const dispatchToProps = (dispatch) => (
    {
        onUpdateUser: (user) => {
            dispatch(updateUser(user));
        }
    }
)

export default connect(stateToProps, dispatchToProps) (LoginScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },

    card: {
        margin: 20,
    },

    inputStyle: {
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 5,
        marginVertical: 10,
        fontSize: 20,
        paddingHorizontal: 10
    },

    buttonStyle: {
        backgroundColor: '#3B3131',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10
    },

    txtStyle: {
        color: '#fff',
        fontSize: 22
    },

    forgetPwdText: {
        textAlign: 'right',
        marginEnd: 20,
        fontSize: 15,
        color: '#009'
    }
})
