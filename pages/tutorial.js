import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

const images = [
  'https://images.unsplash.com/photo-1566895291281-ea63efd4bdbc?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fDklMkYxNnxlbnwwfHwwfHx8MA%3D%3D',
  'https://images.unsplash.com/photo-1604311795833-25e1d5c128c6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8OSUyRjE2fGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1499314060091-745e1ca06f22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D&w=1000&q=80',
];

export function Tutorial() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Swiper
        loop={true}
        index={index}
        onIndexChanged={(newIndex) => setIndex(newIndex)}
        autoplay={false}
        showsPagination={false}
      >
        {images.map((image, idx) => (
          <View key={idx} style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
        ))}
      </Swiper>
      <View style={styles.pagination}>
        {images.map((_, idx) => (
          <TouchableOpacity
            key={idx}
            style={[styles.dot, index === idx && styles.activeDot]}
            onPress={() => setIndex(idx)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 600,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(0,0,0,0.2)',
    margin: 5,
  },
  activeDot: {
    backgroundColor: '#000',
  },
});

