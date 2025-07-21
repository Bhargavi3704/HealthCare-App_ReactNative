import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const categories = [
    { name: 'General', icon: 'doctor', color: '#eae6f8' },
    { name: 'Dentist', icon: 'tooth-outline', color: '#fde7dd' },
    { name: 'Pediatric', icon: 'baby-face-outline', color: '#e2f7e1' },
    { name: 'Cardiology', icon: 'heart-pulse', color: '#dff3ff' },
];

const DoctorCategoriesScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" size={26} color="#007AFF" />
                </TouchableOpacity>
                <Text style={styles.title}>Categories</Text>
            </View>

            <FlatList
                data={categories}
                numColumns={2}
                keyExtractor={(item) => item.name}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.card, { backgroundColor: item.color }]}
                        onPress={() => navigation.navigate('DoctorsList', { category: item.name })}
                    >
                        <Icon name={item.icon} size={36} color="#333" />
                        <Text style={styles.label}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default DoctorCategoriesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 24,
        backgroundColor: '#f5fbff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom:50,
        margin:5,
    },
    backButton: {
        marginRight: 8,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#222',
    },
    card: {
        flex: 1,
        borderRadius: 12,
        paddingVertical: 30,
        marginBottom:25,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 8,
    },
    label: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: '500',
        color: '#222',
    },
});
