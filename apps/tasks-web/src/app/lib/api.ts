import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081',
});
//TODO: Remover o interceptor quando a API real estiver disponível
interface Task {
  id: string;
  title: string;
  completed: boolean;
}

const fakeTasks: Task[] = [
  { id: '1', title: 'Task 1', completed: false },
  { id: '2', title: 'Task 2', completed: true },
  { id: '3', title: 'Task 3', completed: false },
];

// Intercepta todas as requisições GET
api.get = async (url: string, config?: any) => {
  // Retorna dados falsos apenas para a rota /tasks
  if (url === '/tasks') {
    return Promise.resolve({
      status: 200,
      statusText: 'OK',
      headers: {},
      config: { url, method: 'get', ...config },
      data: fakeTasks
    });
  } 
 
  // Mantém comportamento padrão para outras rotas
  return axios.get(url, config);
};

export default api;