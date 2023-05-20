import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, TextInput, Button, StyleSheet } from 'react-native';
import { REACT_APP_API_URL } from '@env';
import axios from 'axios';

// Accessing environment variables
const apiUrl = REACT_APP_API_URL;

let config: any;

const TodoListScreen = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        // Retrieve the access token from localStorage
        const accessToken = localStorage.getItem('accessToken');

        // Set the Authorization header with the access token
        config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            // Fetch the user's todo list
            const response = await axios.get(`${apiUrl}/todos`, config);
            const data = response.data;

            setTodos(data.todos);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const handleAddTodo = async () => {
        try {
            // Make the POST request to add the new todo item
            const response = await axios.post(`${apiUrl}/todos`, {
                title: newTodo,
            }, config);

            // Check if the request was successful
            if (response.status === 200) {
                // Fetch the updated todo list
                fetchTodos();
                setNewTodo('');
            } else {
                console.error('Failed to add todo item');
            }
        } catch (error) {
            console.error('Error adding todo item:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    value={newTodo}
                    onChangeText={setNewTodo}
                    style={styles.input}
                    placeholder="Enter a new todo item"
                />
                <Button onPress={handleAddTodo} title="Add" />
            </View>

            <Text style={styles.todoListTitle}>Todo List</Text>
            <FlatList
                data={todos}
                keyExtractor={(item: any) => String(item.id)}
                renderItem={({ item }) => <Text style={styles.todoItem}>{item.title}</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    input: {
        flex: 1,
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingHorizontal: 8,
        fontSize: 16,
    },
    addButton: {
        backgroundColor: 'blue',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 4,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    todoListTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    todoItem: {
        fontSize: 16,
        marginBottom: 4,
    },
});

export default TodoListScreen;
