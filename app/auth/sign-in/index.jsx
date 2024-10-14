import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import ParallaxScrollView from "./../../../components/ParallaxScrollView";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { Formik } from "formik";
import * as Yup from "yup";

import { signInWithEmail } from "../../../firebase-api/auth";
import useAuthStore from "../../../store/auth-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignIn() {
  const navigation = useNavigation();
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const user = await signInWithEmail(values.email, values.password);
      if (user) {
        await AsyncStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        ToastAndroid.show("Signin Successfully ", ToastAndroid.LONG);
        console.log("User signed in successfully:", user);
        // Navigate to the next screen or perform any other action
        router.replace("/(tabs)/mytrip");
      }
    } catch (error) {
      console.error("Error during sign-up:", error.message);
      // Show error message to the user
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ParallaxScrollView className="px-10">
      <View className="mt-20 px-5">
        <Text className="font-[outfit-bold] text-2xl text-primary">
          Let's Sign You In
        </Text>
        <Text className="font-[outfit] text-gray-500 text-lg mt-3">
          Welcome Back
        </Text>
        <Text className="font-[outfit] text-gray-500 text-lg mt-2">
          You've been missed!
        </Text>
      </View>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View className="mt-0 shadow-lg bg-slate-100 px-5 py-5 rounded-lg">
            <View className="mt-5">
              <Text className="font-[outfit]">Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                keyboardType="email-address"
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            <View className="mt-5">
              <Text className="font-[outfit]">Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[{ flex: 1 }]}
                  placeholder="Enter Password"
                  secureTextEntry={!passwordVisible} // Toggle password visibility
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
                <TouchableOpacity
                  onPress={() => setPasswordVisible(!passwordVisible)}
                  style={styles.toggleButton}
                >
                  <Text>{passwordVisible ? "Hide" : "Show"}</Text>
                </TouchableOpacity>
              </View>
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            {/* Sign In Button */}
            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.signInButton}
            >
              <Text className="text-white text-center font-[outfit] text-lg">
                Sign In
              </Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
             onPress={signInWithGoogle}
              style={styles.googleButton}
            >
              <Text className="text-center text-white font-[outfit] text-lg">
                Sign In with Google
              </Text>
            </TouchableOpacity> */}
            {/* <GoogleSigninButton
              size={GoogleSigninButton.Size.Standard}
              color={GoogleSigninButton.Color.Dark}
              onPress={signin}
            /> */}

            <TouchableOpacity
              className="mt-5 p-2"
              onPress={() => router.replace("auth/sign-up")}
            >
              <Text className="font-[outfit] text-[16px] text-center">
                You don't have an account? Create Account
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.GRAY,
    fontFamily: "outfit",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.GRAY,
    padding: 15,
    fontFamily: "outfit",
  },
  toggleButton: {
    marginLeft: 10,
  },
  signInButton: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    marginTop: 20,
    borderColor: Colors.PRIMARY,
    borderWidth: 1,
  },
  googleButton: {
    padding: 15,
    backgroundColor: "#4285F4",
    borderRadius: 15,
    marginTop: 25,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});
