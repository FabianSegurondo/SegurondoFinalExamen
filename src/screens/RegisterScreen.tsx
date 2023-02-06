import { Button, Input } from '@rneui/themed';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useFormik } from 'formik';
import React, { type PropsWithChildren } from 'react';
import { Image, StyleSheet, Text, View } from "react-native"
import * as YUP from "yup"
import { auth } from '../services/firebase';


export const RegisterScreen = (props: any) => {
    const { navigation } = props;

    const initialValues = {
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        verifyPassword: "",
    }

    const register = (email: string, password: string) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("Estudiante registrado correctamente")
                console.log(user);
                // ...
                navigation.navigate("LoginScreen");
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
                nombre: YUP.string()
                    .required("Ingrese el nombre"),
                apellido: YUP.string()
                    .required("Ingrese los apellidos"),
                email: YUP.string()
                    .required("Ingrese el mail")
                    .email("No es un email válido"),
                password: YUP.string()
                    .required("Ingrese el password"),
                verifyPassword: YUP.string()
                    .required("Ingrese el password nuevamente")
                    .oneOf([YUP.ref("password")], "Los passwords no coinciden"),
            })
        ,
        validateOnChange: false,
        onSubmit: (formValue) => {
            //TODO: Login
            console.log("Registro exitoso", formValue);
            register(formValue.email, formValue.password);

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
                    placeholder='Nombre del estudiante'
                    onChangeText={(text) => formik.setFieldValue("nombre", text)}
                    errorMessage={formik.errors.nombre}
                />
            </View>

            <View style={styles.campos}>
                <Input
                    placeholder='Apellidos del estudiante'
                    onChangeText={(text) => formik.setFieldValue("apellido", text)}
                    errorMessage={formik.errors.apellido}
                />
            </View>

            <View style={styles.campos}>
                <Input
                    placeholder='Email del estudiante'
                    onChangeText={(text) => formik.setFieldValue("email", text)}
                    errorMessage={formik.errors.email}
                />
            </View>

            <View style={styles.campos}>
                <Input
                    placeholder='Passworddel estudiante' secureTextEntry
                    onChangeText={(text) => formik.setFieldValue("password", text)}
                    errorMessage={formik.errors.password}

                />
            </View>

            <View style={styles.campos}>
                <Input
                    placeholder="Repetir Password" secureTextEntry
                    onChangeText={(text) => formik.setFieldValue("verifyPassword", text)}
                    errorMessage={formik.errors.verifyPassword}

                />
            </View>


            <Button
                title="REGISTRAR"
                buttonStyle={{
                    backgroundColor: 'red',
                    borderWidth: 4,
                    borderColor: 'gray',
                    borderRadius: 40,
                }}
                containerStyle={{
                    width: 200,
                    marginHorizontal: 50,
                    marginVertical: 10,
                }}
                titleStyle={{ fontWeight: 'bold' }}

                onPress={formik.handleSubmit}

            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "red",
        alignItems: "center"
    },
    logo: {
        height: 150,
        width: 150,
        marginVertical: 80
    },
    campos: {
        height: 50,
        width: 300,
        marginVertical: 20,
        backgroundColor: "gray",
        opacity: 0.4
    }

});