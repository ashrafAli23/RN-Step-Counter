import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions } from "react-native";

import { Pedometer } from "expo-sensors";
import CircularProgress from "react-native-circular-progress-indicator";

export default function App() {
  const [PedomaterAvailability, SetPedomaterAvailability] = useState("");
  const [StepCount, SetStepCount] = useState(0);
  var WindowHeight = Dimensions.get("window").height;
  var Dist = StepCount / 1300;
  var DistanceCovered = Dist.toFixed(4);
  var cal = DistanceCovered * 60;
  var caloriesBurnt = cal.toFixed(4);

  subscribe = () => {
    const subscription = Pedometer.watchStepCount((result) => {
      SetStepCount(result.steps);
    });

    Pedometer.isAvailableAsync().then(
      (result) => {
        SetPedomaterAvailability(String(result));
      },
      (error) => {
        SetPedomaterAvailability(error);
      }
    );
  };

  useEffect(() => {
    subscribe();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={styles.headingDesign}>
          Is Pedometer available on the device : {PedomaterAvailability}
        </Text>
      </View>

      <View style={{ flex: 3, alignItems: "center", justifyContent: "center" }}>
        <CircularProgress
          value={1}
          maxValue={6500}
          radius={210}
          textColor={"#ecf0f1"}
          activeStrokeColor={"#00aaff"}
          inActiveStrokeColor={"#22272a"}
          inActiveStrokeWidth={25}
          activeStrokeWidth={20}
          title={"Step Count"}
          titleColor={"#ecf0f1"}
          titleStyle={{ fontWeight: "bold", fontSize: 30 }}
        />
      </View>

      <View style={{ flex: 1, justifyContent: "space-around" }}>
        <View style={{ width: "65%", alignSelf: "flex-start" }}>
          <Text style={styles.textDesign}>Target : 6500 steps(5kms)</Text>
        </View>
        <View style={{ width: "65%", alignSelf: "flex-end" }}>
          <Text style={styles.textDesign}>
            Distance Covered : {DistanceCovered} km
          </Text>
        </View>

        <View style={{ width: "65%", alignSelf: "flex-start" }}>
          <Text style={styles.textDesign}>
            Calories Burnt : {caloriesBurnt}
          </Text>
        </View>

        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171a1c",
  },

  headingDesign: {
    backgroundColor: "rgba(155, 89, 182,0.5)",
    alignSelf: "center",
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },

  textDesign: {
    backgroundColor: "rgba(155, 89, 182,0.5)",
    textAlign: "center",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 20,
    overflow: "hidden",
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },
});
