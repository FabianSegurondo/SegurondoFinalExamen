import React from "react"


import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "@rneui/base";

export const MateriaCard = (props: any) => {
    const { materia = {}, navigation } = props;
    const { nombre, docente } = materia;
    //console.log(navigation)

    const goToMateria = () => {
        navigation.navigate("MateriaScreen", { materia:materia })
    }

    return (
        <View style={{ backgroundColor: "gray" }}>
            <TouchableOpacity style={styles.cardContainer}
                onPress={goToMateria}>

                <Text style={styles.nombreMateria}>
                    {nombre}
                </Text>

                <Text style={styles.docenteMateria}>
                    {docente}
                </Text>



            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "red",
        height: 145,
        width: 310,
        flexDirection: "column",
        justifyContent: "space-around",
        marginVertical: 15,
        borderRadius: 10,
        elevation: 25,

    },

    nombreMateria: {
        color: "white",
        fontWeight: "bold",
        fontSize: 25,
        flexShrink: 1,
        marginHorizontal: 15
    },
    docenteMateria: {
        color: "#f4f4f4",
        fontWeight: "400",
        fontSize: 25,
        flexShrink: 1,
        marginHorizontal: 15
    }
})