import React, { type PropsWithChildren } from 'react';
import Icon from "react-native-vector-icons/Ionicons"
import { FAB } from '@rneui/themed';
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native"
import { MateriaCard } from '../components/MateriaCard';
import { MateriasContext } from '../context/materiaContext';
export const HomeScreen = (props: any) => {
    const { navigation } = props;

    const materiasList = React.useContext(MateriasContext);



    const goToNuevaMateria = () => {
        navigation.navigate("NuevaMateriaScreen");
    }

    return <View style={{ flex: 1, alignItems: "center", backgroundColor: "white" }}>

        <FlatList
            data={materiasList}
            keyExtractor={(exercise, index) => exercise.nombre + index}
            showsVerticalScrollIndicator={false}

            renderItem={({ item }) => <MateriaCard materia={item} navigation={navigation} />}
        />

        <FAB

            icon={
                <Icon name="add-outline" color="black" size={28} />
            }
            color='red'
            size='large'
            style={styles.add}
            onPress = {goToNuevaMateria}
        />

    </View>
}

const styles = StyleSheet.create({
    titleContainer: {
        width: 230,
        height: 58,
        backgroundColor: "#DC4A00",
        marginTop: 33,
        marginBottom: 10,
        borderRadius: 22,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        color: "gray",
        fontWeight: "bold",
        fontSize: 30,

    },
    add: {
        position:"absolute",
        right:50,
        bottom:50
    }


});
