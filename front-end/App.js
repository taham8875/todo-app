import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import AuthScreen from "./screens/AuthScreen";
import TodoScreen from "./screens/TodoScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Auth">
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="Todo" component={TodoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    width: "100%"
  },
});
