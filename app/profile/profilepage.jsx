import { View, Text, Button, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useToast } from "react-native-toast-notifications";
import { Formik } from "formik";
import * as Yup from "yup";
import { Colors } from "../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useNavigation } from "expo-router";

const ProfileSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  emergencyContact: Yup.string().required("Emergency contact is required"),
  allergies: Yup.string(),
});

const Profile = () => {
  const toast = useToast();

  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    emergencyContact: "Jane Doe: +1 (555) 987-6543",
    allergies: "Penicillin",
    notifications: true,
  });

  const handleChange = (name, value) => {
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (values) => {
    console.log(profile);
    toast.show("Profile Updated", {
      type: "success",
    });
  };

  return (
    <ParallaxScrollView>
      <View className="flex flex-row  justify-start items-center p-6">
        <TouchableOpacity className="mr-4" onPress={()=> router.back()}>
          <Ionicons
            name="arrow-back-outline"
            size={26}
            color={Colors.primary}
          />
        </TouchableOpacity>
        <Text className="font-[outfit-bold] text-[20px] ">My Profile</Text>
      </View>
      <View className="px-10 ">
        <View className="mb-6  flex justify-center items-center  ">
          <Text className="p-8 rounded-full text-center text-white bg-primary">MY</Text>
        </View>

        <Formik
          initialValues={profile}
          validationSchema={ProfileSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <View className="space-y-4">
              {/* Name Input */}
              <View className="space-y-2">
                <Text className="font-[outfit-medium] text-[17px]">Name</Text>
                <TextInput
                   className="border border-secondary p-3 pl-5 rounded-xl bg-white font-[outfit] text-[16px]"
                  value={values.name}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                />
                {touched.name && errors.name && (
                  <Text className="text-red-500">{errors.name}</Text>
                )}
              </View>

              {/* Email Input */}
              <View className="space-y-2">
                <Text className="font-[outfit-medium] text-[17px]">Email</Text>
                <TextInput
                   className="border border-secondary p-3 pl-5 rounded-xl bg-white font-[outfit] text-[16px]"
                  keyboardType="email-address"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                />
                {touched.email && errors.email && (
                  <Text className="text-red-500">{errors.email}</Text>
                )}
              </View>

              {/* Phone Input */}
              <View className="space-y-2">
                <Text className="font-[outfit-medium] text-[17px]">Phone</Text>
                <TextInput
                  className="border border-secondary p-3 pl-5 rounded-xl bg-white font-[outfit] text-[16px]"
                  keyboardType="phone-pad"
                  value={values.phone}
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                />
                {touched.phone && errors.phone && (
                  <Text className="text-red-500">{errors.phone}</Text>
                )}
              </View>

              {/* Emergency Contact */}
              <View className="space-y-2 mb-10">
                <Text className="font-[outfit-medium] text-[17px]">Emergency Contact</Text>
                <TextInput
                  className="border border-secondary p-3 pl-5 rounded-xl bg-white font-[outfit] text-[16px]"
                  value={values.emergencyContact}
                  onChangeText={handleChange("emergencyContact")}
                  onBlur={handleBlur("emergencyContact")}
                />
                {touched.emergencyContact && errors.emergencyContact && (
                  <Text className="text-red-500">
                    {errors.emergencyContact}
                  </Text>
                )}
              </View>

              

              <TouchableOpacity
                className="bg-primary rounded-full p-4 mx-3 "
                onPress={handleSubmit}
              >
                <Text className="font-[outfit-bold] text-center text-white">
                  Update Profile
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </ParallaxScrollView>
  );
};

export default Profile;
