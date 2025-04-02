import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, Checkbox, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface TodoItem {
  id: number;
  title: string;
  isCompleted: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const apiUrl = '/api/Todo';
  // const apiUrl = 'https://localhost:7150/api/Todo';

  const fetchTodos = async () => {
    try {
      const response = await axios.get<TodoItem[]>(apiUrl);
      setTodos(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке задач', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      const response = await axios.post<TodoItem>(apiUrl, { title: newTodo, isCompleted: false });
      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (error) {
      console.error('Ошибка при добавлении задачи', error);
    }
  };

  const toggleTodo = async (todo: TodoItem) => {
    try {
      const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };
      await axios.put(`${apiUrl}/${todo.id}`, updatedTodo);
      setTodos(todos.map(t => t.id === todo.id ? updatedTodo : t));
    } catch (error) {
      console.error('Ошибка при обновлении задачи', error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      setTodos(todos.filter(t => t.id !== id));
    } catch (error) {
      console.error('Ошибка при удалении задачи', error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Todo App
      </Typography>
      <div style={{ display: 'flex', marginBottom: 16 }}>
        <TextField
          fullWidth
          variant="outlined"
          label="Новая задача"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={addTodo} sx={{ marginLeft: 1 }}>
          Добавить
        </Button>
      </div>
      <List>
        {todos.map(todo => (
          <ListItem key={todo.id} secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => deleteTodo(todo.id)}>
              <DeleteIcon />
            </IconButton>
          }>
            <Checkbox
              checked={todo.isCompleted}
              onChange={() => toggleTodo(todo)}
            />
            <ListItemText primary={todo.title} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default App;
