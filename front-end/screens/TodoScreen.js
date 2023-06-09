import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  CheckBox,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TodoScreen() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    // Load the JWT token from AsyncStorage
    AsyncStorage.getItem("token").then((value) => {
      setToken(value);
    });
  }, []);

  useEffect(() => {
    // Load the todos from the API
    const loadTodos = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/todos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        // Sort todos by id descending so that the newest todo is at the top
        data.todos.sort((a, b) => b.id - a.id);
        setTodos(data.todos);
      } catch (error) {
        console.error(error);
      }
    };

    loadTodos();
  }, [token]);

  const handleAddTodo = () => {
    // Call the API to add a new todo
    fetch("http://localhost:3000/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content: newTodo }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Add the new todo to the beginning of `todos`
        console.log(data);
        setTodos([data, ...todos]);
        // Reset the `newTodo` state
        setNewTodo("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteTodo = (id) => {
    // Call the API to delete a todo
    fetch(`http://localhost:3000/api/todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        // Remove the todo from `todos`
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleToggleTodo = (id) => {
    // Call the API to delete a todo
    fetch(`http://localhost:3000/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        completed: !todos.find((todo) => todo.id === id).completed,
      }),
    })
      .then(() => {
        // Update the todo in `todos`
        setTodos(
          todos.map((todo) => {
            if (todo.id === id) {
              todo.completed = !todo.completed;
            }
            return todo;
          })
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const renderItem = ({ item }) => (
    <View style={styles.todo}>
      <CheckBox
        value={item.completed}
        style={{ marginRight: 5 }}
        onValueChange={() => handleToggleTodo(item.id)}
      />
      <Text style={[styles.todoText, item.completed && { opacity: 0.5 }]}>
        {item.content}
      </Text>
      <Button title="Delete" onPress={() => handleDeleteTodo(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo Screen</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="New Todo"
          value={newTodo}
          onChangeText={setNewTodo}
        />
        <Button title="Add" onPress={handleAddTodo} />
      </View>
      {
        <FlatList
          data={todos}
          renderItem={renderItem}
          keyExtractor={(item) => {
            item.id.toString();
          }}
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  form: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 48,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginRight: 16,
  },
  todo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  todoText: {
    flex: 1,
    fontSize: 16,
    marginRight: 16,
  },
});
