import React, { type PropsWithChildren } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native"
export const MateriaScreen = (props: any) => {
    const { navigation, route } = props;
    const { params = {} } = route;
    const { materia = {}} = params;
    const { nombre, docente, horario, modalidad, creditos } = materia

    return <View style={{ flex: 1, alignItems: "center", backgroundColor: "white" }}>
        <Image
                source={require("../assets/logo.png")}
                style={styles.logo} />
                
        <Text style= {styles.title}>
            {nombre}
        </Text>

        <Text style= {styles.info}>
            Docente: {docente}
        </Text>
       
        <Text style= {styles.info}>
            Horario: {horario}
        </Text>

        <Text style= {styles.info}>
            Modalidad: {modalidad}
        </Text>

        <Text style= {styles.info}>
            Creditos: {creditos}
        </Text>

    </View>
}

const styles = StyleSheet.create({
    logo: {
        height: 90,
        width: 80,
        marginVertical: 40
    },
    title: {
        color: "red",
        fontWeight: "bold",
        fontSize: 55,
        marginVertical:20,
        marginHorizontal:10
    },
    info: {
        color: "white",
        fontWeight: "400",
        fontSize: 25,
        marginVertical:20
    }


});