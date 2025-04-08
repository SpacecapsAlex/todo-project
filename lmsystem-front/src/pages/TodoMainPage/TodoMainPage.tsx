import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Checkbox,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
  Paper,
  Chip,
  Stack,
  CircularProgress,
  InputAdornment
} from "@mui/material";
import {
  Delete,
  Add,
  CheckCircle,
  RadioButtonUnchecked,
  Search
} from "@mui/icons-material";
import { useSnackbar } from "notistack";

interface TodoItem {
  id: number;
  title: string;
  isCompleted: boolean;
  createdAt?: string;
}

export const TodoMainPage = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const apiUrl = 'https://localhost:7150/api/Todo';

  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<TodoItem[]>(apiUrl, {
        headers: {
          Authorization: localStorage.getItem('token'),
        }
      });
      setTodos(response.data);
    } catch (error) {
      enqueueSnackbar('Ошибка при загрузке задач', { variant: 'error' });
      console.error('Ошибка при загрузке задач', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!newTodo.trim()) {
      enqueueSnackbar('Введите текст задачи', { variant: 'warning' });
      return;
    }

    try {
      const response = await axios.post<TodoItem>(
        apiUrl,
        { title: newTodo, isCompleted: false },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          }
        }
      );
      setTodos([response.data, ...todos]);
      setNewTodo('');
      enqueueSnackbar('Задача добавлена', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Ошибка при добавлении задачи', { variant: 'error' });
      console.error('Ошибка при добавлении задачи', error);
    }
  };

  const toggleTodo = async (todo: TodoItem) => {
    try {
      const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };
      await axios.put(`${apiUrl}/${todo.id}`, updatedTodo, {
        headers: {
          Authorization: localStorage.getItem('token'),
        }
      });
      setTodos(todos.map(t => t.id === todo.id ? updatedTodo : t));
      const action = updatedTodo.isCompleted ? 'выполнена' : 'отмечена невыполненной';
      enqueueSnackbar(`Задача "${todo.title}" ${action}`, { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Ошибка при обновлении задачи', { variant: 'error' });
      console.error('Ошибка при обновлении задачи', error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await axios.delete(`${apiUrl}/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        }
      });
      setTodos(todos.filter(t => t.id !== id));
      enqueueSnackbar('Задача удалена', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Ошибка при удалении задачи', { variant: 'error' });
      console.error('Ошибка при удалении задачи', error);
    }
  };

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const completedCount = todos.filter(todo => todo.isCompleted).length;
  const totalCount = todos.length;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            mb: 4,
            color: 'primary.main'
          }}
        >
          Управление системными задачами
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <Chip
            label={`Всего: ${totalCount}`}
            color="default"
            variant="outlined"
          />
          <Chip
            label={`Выполнено: ${completedCount}`}
            color="success"
            variant={completedCount > 0 ? 'filled' : 'outlined'}
          />
          <Chip
            label={`Активные: ${totalCount - completedCount}`}
            color="primary"
            variant={(totalCount - completedCount) > 0 ? 'filled' : 'outlined'}
          />
        </Stack>

        <TextField
          fullWidth
          size='small'
          variant="outlined"
          placeholder="Поиск задач..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 3 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
            },
          }}
        />

        <Box sx={{
          mb: 4,
          p: 1,
          bgcolor: 'background.paper',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: 1,
          display: 'flex',
          gap: 1,
        }}>
          <TextField
            fullWidth
            size='small'
            variant="outlined"
            placeholder="Введите название задачи..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                fontSize: '1rem',
                alignItems: 'flex-start'
              }
            }}
          />
          <Button
            size='small'
            variant="contained"
            color="primary"
            onClick={addTodo}
            startIcon={<Add />}
            sx={{
              px: 4,
              fontSize: '1rem',
              borderRadius: 1,
              height: '40px'
            }}
            disabled={!newTodo.trim()}
          >
            Добавить
          </Button>
        </Box>

        {isLoading
? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        )
: (
          <List sx={{ bgcolor: 'background.paper', borderRadius: 2 }}>
            {filteredTodos.length > 0
? (
              filteredTodos.map(todo => (
                <Paper
                  key={todo.id}
                  elevation={0}
                  sx={{
                    mb: 1,
                    borderLeft: '4px solid',
                    borderColor: todo.isCompleted ? 'success.main' : 'primary.main'
                  }}
                >
                  <ListItem
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => deleteTodo(todo.id)}
                        color="error"
                        sx={{ mr: 1 }}
                      >
                        <Delete />
                      </IconButton>
                    }
                    disablePadding
                  >
                    <ListItemButton onClick={() => toggleTodo(todo)} sx={{ py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 48 }}>
                        <Checkbox
                          edge="start"
                          checked={todo.isCompleted}
                          icon={<RadioButtonUnchecked color="primary" />}
                          checkedIcon={<CheckCircle color="success" />}
                          disableRipple
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={todo.title}
                        secondary={todo.createdAt && new Date(todo.createdAt).toLocaleString()}
                        slotProps={{
                          primary: {
                            component: 'span',
                            sx: {
                              textDecoration: todo.isCompleted ? 'line-through' : 'none',
                              color: todo.isCompleted ? 'text.secondary' : 'text.primary',
                              fontSize: '1.05rem'
                            }
                          },
                          secondary: {
                            component: 'span',
                            sx: {
                              fontSize: '0.85rem',
                              color: 'text.secondary'
                            }
                          }
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                </Paper>
              ))
            )
: (
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 200
              }}>
                <Typography variant="body1" color="text.secondary">
                  {searchTerm ? 'Задачи не найдены' : 'Нет задач. Добавьте первую!'}
                </Typography>
              </Box>
            )}
          </List>
        )}
      </Paper>
    </Container>
  );
}