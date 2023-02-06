import { Button, Input } from '@rneui/themed';
import React, { type PropsWithChildren } from 'react';
import { Image, StyleSheet, Text, View } from "react-native"
import { useFormik } from 'formik';
import * as YUP from "yup"
import { useSelector, useDispatch } from 'react-redux';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { isLogin } from '../store/actions/userAuthAction';
import { auth } from '../services/firebase';


export const LoginScreen = (props: any) => {
    const { navigation } = props;
    
    const dispatch = useDispatch();
    const authUser = useSelector(store => store.userAuth);
    const {user} = authUser;
   


    const initialValues = {
        email: "",
        password: ""
    }

    const goToRegister = () => {
        navigation.navigate("RegisterScreen");
    }

    const login = (email: string, password: string) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                dispatch(isLogin());
                console.log("Estudiante no guardado correcrtamente: ",user);
                navigation.navigate("StackMaterias");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema:
            YUP.object({
                email: YUP.string()
                    .required("ingrese mail o cree una cuenta")
                    .email("email sin validacion"),
                password: YUP.string().required("password requerido")
            })
        ,
        validateOnChange: false,
        onSubmit: (formValue) => {
            console.log("En orden", formValue);
            login(formValue.email, formValue.password);
        }
    }
    )

    return (
        <View style={{ flex: 1, alignItems: "center" }}>
            <Image
                source={require("../assets/logo.png")}
                style={styles.logo} />

            <View style={styles.campos}>
                <Input
                    placeholder='Email'
                    onChangeText={(text) => formik.setFieldValue("email", text)}
                    errorMessage={formik.errors.email}
                />
            </View>
            <View style={styles.campos}>
                <Input
                    placeholder="Password" secureTextEntry={true}
                    onChangeText={(text) => formik.setFieldValue("password", text)}
                    errorMessage={formik.errors.password}

                />

            </View>

            <Button
                title="LOG IN"
                buttonStyle={{
                    backgroundColor: 'red',
                    borderWidth: 2,
                    borderColor: 'white',
                    borderRadius: 30,
                }}
                containerStyle={{
                    width: 220,
                    marginHorizontal: 55,
                    marginVertical: 12,
                }}
                titleStyle={{ fontWeight: 'bold', color: "black" }}

                onPress={formik.handleSubmit}
            />

            <Button
                title="REGISTER"
                buttonStyle={{
                    backgroundColor: 'gray',
                    borderWidth: 4,
                    borderColor: 'white',
                    borderRadius: 34,
                }}
                containerStyle={{
                    width: 220,
                    marginHorizontal: 55,
                    marginVertical: 12,
                }}
                titleStyle={{ fontWeight: 'bold' }}
                onPress={goToRegister}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center"
    },
    logo: {
        height: 190,
        width: 180,
        marginVertical: 70
    },
    campos: {
        height: 50,
        width: 300,
        marginVertical: 40,

    }

});