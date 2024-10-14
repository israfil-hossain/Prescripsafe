import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();

  return (
    <View style={{backgroundColor: Colors.background}} className="flex flex-col justify-between items-center w-[100%]">
      <View className="bg-white w-full flex flex-row justify-center items-center shadow-lg ">
      <Image
        source={require("./../assets/images/banner.gif")}
        style={{
          width: "100%",
          height: 460,
          display:"flex", 
          flexDirection:"center", 
          justifyContent:"center", 
          
        }}
      />
      </View>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 25,
            fontFamily: "outfit-bold",
            textAlign: "center",
            padding: 5,
            marginTop: 5,
            color: Colors.PRIMARY
          }}
        >
          PrescripSafe
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontFamily: "outfit",
            fontSize: 20,
          }}
          className="text-gray-400"
        >
          "Track your prescriptions, one step ahead,
          Keep your health journey easily fed."
        </Text>
        <TouchableOpacity style={styles.button} 
        onPress={()=> router.push('auth/sign-in')}>
          <Text
            style={{
              color: Colors.WHITE,
              textAlign: "center",
              fontFamily: "outfit",
              fontSize: 20,
            }}
          >
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 20,
    height: "100%",
    padding: 25,
  },
  button: {
    padding: 10,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
    marginTop: "20%",
    margin: 20,
    display: "flex",
    justifyContent: "center",
  },
});
