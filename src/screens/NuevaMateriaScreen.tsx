import { Button, Input } from '@rneui/themed';
import { useFormik } from 'formik';
import React, { type PropsWithChildren } from 'react';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore/lite';
import { db } from "../services/firebase"
import { v4 as uuidv4 } from 'uuid';
import { Image, StyleSheet, Text, View } from "react-native"
import * as YUP from "yup"
export const NuevaMateriaScreen = (props: any) => {
    const { navigation } = props;

    const initialValues = {
        nombre: "",
        docente: "",
        horario: "",
        modalidad: "",
        creditos: 0
    }

    const registrarMateria = async (nombre: string, docente: string, horario: string, modalidad: string, creditos: number) => {
        try{
            console.log("Agregando a la base de datos: ",db);
            const id = uuidv4();
            console.log(id);
            await setDoc(doc(db,'/materias',id), {
                nombre:nombre,
                docente:docente,
                horario:horario,
                modalidad:modalidad,
                creditos:creditos,
                id,
            });
        } catch (e) {
            console.log("Error adding document: ",e)
        }
        navigation.goBack();
    }
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema:
            YUP.object({
                nombre: YUP.string()
                    .required("Ingrese el nombre porfavor"),
                docente: YUP.string()
                    .required("Ingrese el docente porfavor"),
                horario: YUP.string()
                    .required("Ingrese el horario porfavor"),
                modalidad: YUP.string()
                    .required("Ingrese la modalidad porfavor"),
                creditos: YUP.number()
                    .required("Ingrese lod creditos porfavor")
            })
        ,
        validateOnChange: false,
        onSubmit: (formValue) => {

            registrarMateria(formValue.nombre,formValue.docente,formValue.horario,formValue.modalidad,formValue.creditos);

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
                    placeholder='Nombre de la materia'
                    onChangeText={(text) => formik.setFieldValue("nombre", text)}
                    errorMessage={formik.errors.nombre}
                />
            </View>

            <View style={styles.campos}>
                <Input
                    placeholder='Nombre del Docente'
                    onChangeText={(text) => formik.setFieldValue("docente", text)}
                    errorMessage={formik.errors.docente}
                />
            </View>

            <View style={styles.campos}>
                <Input
                    placeholder='Horario de clases'
                    onChangeText={(text) => formik.setFieldValue("horario", text)}
                    errorMessage={formik.errors.horario}
                />
                           </View>

<View style={styles.campos}>
    <Input
        placeholder="Modalidad"
        onChangeText={(text) => formik.setFieldValue("modalidad", text)}
        errorMessage={formik.errors.modalidad}

    />
</View>

<View style={styles.campos}>
    <Input
        placeholder="Creditos"
        onChangeText={(text) => formik.setFieldValue("creditos", text)}
        errorMessage={formik.errors.creditos}

    />
</View>


<Button
    title="Registrar"
    buttonStyle={{
        backgroundColor: 'red',
        borderWidth: 4,
        borderColor: 'gray',
        borderRadius: 45,
    }}
    containerStyle={{
        width: 230,
        marginHorizontal: 40,
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
        marginVertical: 70
    },
    campos: {
        height: 55,
        width: 310,
        marginVertical: 20,
        fontWeight: "bold",
        backgroundColor: "gray",
        opacity: 0.45
    }

});