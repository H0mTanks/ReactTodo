import { View, TextInput, StyleSheet, Button, Text, Alert } from "react-native";
import { useState, useContext } from "react";
import { GlobalContext } from "./GlobalContext";
import { Link } from "react-router-native";

export function Register() {
  const { setIsLogin, setCurrEmail } = useContext(GlobalContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  function handleRegister() {
    fetch("http://192.168.0.199:5001/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json.status);
        if (json.status) {
          setCurrEmail(email);
          setIsLogin(true);
        } else {
          Alert.alert("User already exists");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder={"Enter your Email"}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder={"Enter your Password"}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <View style={styles.buttons}>
        <Button onPress={handleRegister} title="Register" color="red" />
        <Link exact to="/">
          <Text style={styles.signInButton}>Sign In</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
    paddingTop: 80,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    marginVertical: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  buttons: {
    flexDirection: "row",
  },
  signInButton: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "white",
    backgroundColor: "green",
    height: 40,
    marginLeft: 15,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
