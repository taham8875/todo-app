import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function AuthScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [invalidCredentialsMessage, setInvalidCredentialsMessage] =
    useState("");
  const navigation = useNavigation();

  const handleAuth = () => {
    // Handle authentication for both login and register
    let endpoint;
    if (isRegistering) {
      endpoint = "register";
    } else {
      endpoint = "signin";
    }
    console.log("endpoint", endpoint);
    fetch(`http://localhost:3000/api/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        // store the jwt token in AsyncStorage
        if (data.token) {
          AsyncStorage.setItem("token", data.token);
          console.log("token", data);
          navigation.navigate("Todo");
        } else {
          console.log("no token");
          setInvalidCredentialsMessage(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isRegistering ? "Register" : "Login"}</Text>
      <TextInput
        style={styles.input}
        placeholder="username"
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleAuth}>
        <Text style={styles.buttonText}>
          {isRegistering ? "Register" : "Login"}
        </Text>
      </TouchableOpacity>
      {Boolean(invalidCredentialsMessage) && (
        <Text style={{ color: "red" }}>{invalidCredentialsMessage}</Text>
      )}
      <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
        <Text style={styles.switchText}>
          {isRegistering
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  input: {
    width: "80%",
    height: 48,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 4,
    padding: 12,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  switchText: {
    marginTop: 16,
    color: "#007bff",
  },
});
