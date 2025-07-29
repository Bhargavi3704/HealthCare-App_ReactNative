import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AmbulanceMapScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={24} color="#007AFF" />
                </TouchableOpacity>
                <Text style={styles.title}>Map & Tracking</Text>
            </View>

            <Image
                source={{
                    uri: 'https://b1898139.smushcdn.com/1898139/wp-content/uploads/sites/3/2020/11/tg_map-history-view.png?lossy=2&strip=1&webp=1',
                }}
                style={styles.mapImage}
                resizeMode="cover"
            />
            <Text style={styles.note}>Live Tracking Map</Text>
        </View>
    );
};

export default AmbulanceMapScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5fbff', padding: 16 },
    header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginTop: 25 },
    title: { fontSize: 19, fontWeight: 'bold', marginLeft: 12, color: '#007AFF' },
    mapImage: {
        width: '100%',
        height: 300,
        marginTop: 40,
    },
    note: {
        textAlign: 'center',
        marginTop: 20,
        color: '#777',
        fontStyle: 'italic',
    },
});
