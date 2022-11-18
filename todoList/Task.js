import { React, useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { GlobalContext } from "./GlobalContext";

const Task = (props) => {
  const { data, setData, currEmail } = useContext(GlobalContext);

  function handleToggleComplete(nodeId) {
    const newData = data.filter((item) => item.id !== nodeId);
    const toToggleItem = data.find((item) => item.id === nodeId);

    toToggleItem.complete = !toToggleItem.complete;
    setData([...newData, toToggleItem]);
    fetch("http://192.168.0.126:199/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: currEmail,
        userData: [...newData, toToggleItem],
      }),
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
    return;
  }

  function handleNodeRemoval(nodeId) {
    const newData = data.filter((el) => {
      return el.id !== nodeId;
    });

    setData(newData);
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
    return;
  }

  const s = props.complete ? styles.bgColorComplete : styles.bgColor;

  return (
    <View style={s}>
      <View style={styles.itemLeft}>
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
      <View style={styles.buttons}>
        <Button
          onPress={() => handleToggleComplete(props.id)}
          title="&#x2713;"
          color="green"
        />
        <Button
          onPress={() => handleNodeRemoval(props.id)}
          title="&#xff38;"
          color="red"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  bgColor: {
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    backgroundColor: "#FFF",
  },
  bgColorComplete: {
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    backgroundColor: "#90EE90",
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  itemText: {
    maxWidth: "100%",
  },
  buttons: {
    flexDirection: "row",
  },
});

export default Task;
