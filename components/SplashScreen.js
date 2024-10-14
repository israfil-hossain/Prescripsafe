import React from 'react';
import { View, Image, StyleSheet, Animated, Text } from 'react-native';

const CustomeSplashScreen = () => {
  const imageScale = new Animated.Value(0.1);

  Animated.timing(imageScale, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
  }).start();

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/images/Loadergif.gif')}
        style={[styles.image, { transform: [{ scale: imageScale }] }]}
      />
      <Text className="font-bold mt-3 text-[18px] text-primary ">PrescripSafe</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: 150,
    height: 200,
  },
});

export default CustomeSplashScreen;