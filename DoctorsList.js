import React, { useState } from 'react';
import {View,Text,StyleSheet,FlatList,Image,TextInput,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const doctors = [
    {
        id: '1',
        name: 'Dr. Kathryn Murphy',
        rating: 4.8,
        image: {
            uri: 'https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg',
        },
        about:
            'Provides exceptional care with experience in general and family medicine. Fluent in Telugu and English.',
    },
    {
        id: '2',
        name: 'Dr. Jayanthi',
        rating: 4.6,
        image: {
            uri: 'https://static.vecteezy.com/system/resources/thumbnails/028/287/555/small/an-indian-young-female-doctor-isolated-on-green-ai-generated-photo.jpg',
        },
        about:
            'Expert in diagnostics and patient engagement. 10+ years experience in internal medicine.',
    },
    {
        id: '3',
        name: 'Dr. Rohan Patel',
        rating: 4.9,
        image: {
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8vSRSoGYohA2SWO0qLf784n1Lrq52HL7LdA&s',
        },
        about:
            'Specialist in cardiology with a calm demeanor and thorough diagnosis. 15 years experience in urban hospitals.',
    },
    {
        id: '4',
        name: 'Dr. Sneha Sharma',
        rating: 4.7,
        image: {
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzZJfr8isw7BIVfzAM_7XRIx7qddbpGcUD0A&s',
        },
        about:
            'Pediatrician known for compassionate child care. Fluent in Hindi, Telugu, and English.',
    },
    {
        id: '5',
        name: 'Dr. Anil Varma',
        rating: 4.5,
        image: {
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkVlvm_NiEyuvC06TorpxxBKXWQaHQYcS_jg&s',
        },
        about:
            'Experienced dentist focused on patient comfort. 8+ years of dental surgery practice.',
    },
];


const DoctorsList = ({ navigation }) => {
    const [search, setSearch] = useState('');

    const filteredDoctors = doctors.filter((doc) =>
        doc.name.toLowerCase().includes(search.toLowerCase())
    );

    const renderDoctor = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.row}>
                <Image source={item.image} style={styles.avatar} />
                <View style={{ flex: 1 }}>
                    <Text style={styles.name}>{item.name}</Text>
                    <View style={styles.ratingRow}>
                        <Icon name="star" size={16} color="#f5a623" />
                        <Text style={styles.rating}>{item.rating}</Text>
                    </View>
                </View>
            </View>
            <Text style={styles.about}>{item.about}</Text>
            <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('VideocallBooking',{ doctor: item })}>
                <Text style={styles.buttonText}>Book VideoCall</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="chevron-left" size={31} color="#007AFF" />
                </TouchableOpacity>
                <TextInput
                    style={styles.searchRow}
                    placeholder="Search doctors..."
                    placeholderTextColor="#999"
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            <FlatList
                data={filteredDoctors}
                keyExtractor={(item) => item.id}
                renderItem={renderDoctor}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            />

            {filteredDoctors.length === 0 && (
                <Text style={styles.noResult}>No doctors found</Text>
            )}
        </View>
    );
};

export default DoctorsList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fbff',
        padding: 16,
        paddingTop: 30,
    },
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 10,
        elevation: 2,
        width:'90%',
        
    },
    header: {
        marginTop:10,
        marginBottom: 10,
        flexDirection:'row',
    },

    backButton: {
        marginTop:5,
    },
    card: {
        backgroundColor: '#d5f3ff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 27,
        marginRight: 12,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    rating: {
        marginLeft: 4,
        fontSize: 14,
        color: '#666',
    },
    about: {
        fontSize: 14,
        color: '#555',
        marginBottom: 10,
        lineHeight: 20,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
    noResult: {
        textAlign: 'center',
        color: '#999',
        marginTop: 20,
        fontSize: 16,
    },
});
