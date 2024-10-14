import {
  StyleSheet,
  Platform,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { Colors } from "./../../constants/Colors";
import useAuthStore from "../../store/auth-store";
import { auth, db } from "../../configs/FirebaseConfig";
import { collection, query, getDocs, where } from "@firebase/firestore";
import { useRouter } from "expo-router";
import { Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { slider_data } from "../../constants/sliderData";
import { LinearGradient } from "expo-linear-gradient";
import { capsul, notification, tablet } from "../../assets/icons";

export default function Mytrip() {
  const router = useRouter();
  const [userTrips, setUserTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthStore();
  const width = Dimensions.get("window").width;

  // const getUserTrips = async () => {
  //   try {
  //     setIsLoading(true);
  //     setUserTrips([]);
  //     const q = query(
  //       collection(db, "UserTrips"),
  //       where("userEmail", "==", user?.email)
  //     );
  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.forEach((doc) => {
  //       setUserTrips((prev) => [...prev, doc.data()]);
  //     });
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   user && getUserTrips();
  // }, [user]);

  // console.log(userTrips);
  return (
    <View
      style={{
        paddingTop: 50,
        backgroundColor: Colors.background,
        height: "100%",
      }}
    >
      <View className="flex flex-row justify-between items-center mb-5 px-5">
        <View>
          <ThemedText className="font-[outfit-bold] text-2xl text-dark">
            Hey, Israfil !
          </ThemedText>
          <Text className="text-grey font-[outfit] text-[16px]">
            What do you want to do today ?
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push("create-trip/search-place")}
        >
          <Ionicons name="add-circle" size={32} color={Colors.PRIMARY} />
        </TouchableOpacity>
      </View>
      <View className="flex flex-row justify-center items-center w-[100%] ">
        <Carousel
          loop
          width={width}
          height={width / 2}
          autoPlay={true}
          data={slider_data}
          scrollAnimationDuration={3500}
          renderItem={({ index, item }) => (
            <View
              key={index}
              className="shadow-xs shadow-gray-400 border border-gray-200 bg-indigo-50 relative"
              style={{
                flex: 1,
                borderWidth: 0,
                shadowOffset: "gray",
                justifyContent: "center",
                marginLeft: 6,
                marginRight: 6,
                borderRadius: 20,
                shadowRadius: 10,
              }}
            >
              <Image
                source={item.image}
                style={{
                  width: "100%",
                  resizeMode: "fill",
                  height: "100%",
                  borderRadius: 20,
                }}
              />

              <LinearGradient
                colors={["rgba(98,79,233,0.2) 5%", "#000000"]}
                className="h-20 items-center py-3 flex-col justify-center absolute bottom-0  rounded-b-xl w-[100%]"
              >
                <Text className="font-[outfit-bold] pl-5 text-white text-[16px]">
                  {item?.title}
                </Text>
                <Text className="font-[outfit-medium] pl-5 text-gray-100 text-[14px]">
                  {item?.description}
                </Text>
              </LinearGradient>
            </View>
          )}
        />
      </View>

      <View className="mt-2 p-4 flex-row justify-between ">
        <LinearGradient
          colors={[
            "#6857E8",
            "rgba(154,141,250,1) 69%",
          ]}
          className="h-20 items-center flex-col justify-center rounded-xl px-8 py-3 shadow-xs shadow-primary"
        >
          <Image source={capsul} className="w-9 h-9" />
          <Text className="font-[outfit-bold] text-[16px] pt-1 text-white">
            Add Prescription
          </Text>
        </LinearGradient>
        <LinearGradient
          // Button Linear Gradient
          colors={[
            "#6857E8",
            "rgba(154,141,250,1) 69%",
          ]}
          className="h-20 items-center flex-col justify-center rounded-xl px-8 py-3"
        >
          <Image source={notification} className="w-9 h-9 rounded-full " />
          <Text className="font-[outfit-bold] text-[16px] pt-1 text-white">
            Set Reminder
          </Text>
        </LinearGradient>
      </View>

      <View className="px-5">
        <View className="border border-secondary rounded-lg px-4 py-4">
          <Text className="font-[outfit-bold] text-[16px] text-gray-800 border-b border-secondary mb-1 pb-2">
            Today's Schedule
          </Text>
          <ScrollView className="h-[90px] mt-2">
            <View className="flex flex-row justify-between mb-2">
              <Text className="font-[outfit-medium] text-[16px] text-gray-800">Aspirin</Text>
              <Text className="bg-primary rounded-full px-4 py-1 font-[outfit] text-[12px] text-white">8:00 AM</Text>
            </View>
            <View className="flex flex-row justify-between mb-2">
              <Text className="font-[outfit-medium] text-[16px] text-gray-800">Vitamin D</Text>
              <Text className="bg-primary rounded-full px-4 py-1 font-[outfit] text-[12px] text-white">12:00 PM</Text>
            </View>
            <View className="flex flex-row justify-between mb-2">
              <Text className="font-[outfit-medium] text-[16px] text-gray-800">Ibuprofen</Text>
              <Text className="bg-primary rounded-full px-4 py-1 font-[outfit] text-[12px] text-white">2:00 AM</Text>
            </View>
            <View className="flex flex-row justify-between mb-2">
              <Text className="font-[outfit-medium] text-[16px] text-gray-800">Aspirin</Text>
              <Text className="bg-primary rounded-full px-4 py-1 font-[outfit] text-[12px] text-white">6:00 AM</Text>
            </View>
            <View className="flex flex-row justify-between mb-2">
              <Text className="font-[outfit-medium] text-[16px] text-gray-800">Ibuprofen</Text>
              <Text className="bg-primary rounded-full px-4 py-1 font-[outfit] text-[12px] text-white">10:00 AM</Text>
            </View>
          </ScrollView>
        </View>
      </View>
      
      
      {isLoading ? (
        <View className="flex flex-col justify-center h-full">
          <ActivityIndicator size={"large"} color={Colors.PRIMARY} />
        </View>
      ) : (
        <>
          {/* {userTrips?.length === 0 ? (
            <StartNewTripCard />
          ) : (
            <UserTripList userTrips={userTrips} />
          )} */}
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
  },
  text: {
    backgroundColor: "transparent",
    fontSize: 15,
    color: "#fff",
  },
});
