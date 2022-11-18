import {
  StyleSheet,
  Text,
  View,
  Button,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useContext, useState, useEffect } from "react";
import Task from "./Task";
import { GlobalContext } from "./GlobalContext";

export function Todo() {
  const { data, setData, currEmail, setIsLogin } = useContext(GlobalContext);
  const [task, setTask] = useState();

  function generateId() {
    return data.length;
  }

  function handleSubmit() {
    if (task.length != 0) {
      const id = generateId().toString();
      const complete = false;
      const newData = [...data, { id, task, complete }];
      setData(newData);
      setTask("");

      fetch("http://192.168.0.199:5001/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: currEmail, userData: newData }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (!json.status) {
            Alert.alert("Natwork Error", "Data not updated on server");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  function handleSignOut() {
    setIsLogin(false);
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>To do:</Text>
          <View style={styles.items}>
            {data.map((x) => {
              return (
                <Task
                  key={x.id}
                  id={x.id}
                  text={x.task}
                  complete={x.complete}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Write a task"}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={() => handleSubmit()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <View>
        <Button title="Sign Out" color="red" onPress={handleSignOut} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {},
});
