# FeedBackCELL 🔗

Plataforma de feedback e comentários em tempo real construída com **Next.js**, **Express** e **MySQL**.

## 🚀 Iniciando Rápido

### Com Docker

```bash
# Na pasta raiz do projeto
docker-compose up -d
```

Tudo rodará automaticamente:
- 🌐 Frontend: http://localhost:3000
- 🔌 Backend API: http://localhost:5000
- 💾 MySQL: localhost:3307

### Sem Docker

#### Frontend:
```bash
cd frontend
pnpm install
pnpm dev
```

#### Backend:
```bash
cd backend
pnpm install
node server.js
```
## 🔌 API

Não tem ainda

### Endpoint Base
```
http://localhost:5000/api
```

### Exemplo: Buscar Feedback
```bash
curl http://localhost:5000/api/feedback
```

### Como usar no Frontend

```typescript
import { useApi } from '@/src/components/hooks/useApi';

export default function Example() {
  const { request, loading, error } = useApi();

  const fetchData = async () => {
    const data = await request('GET', '/api/feedback');
    console.log(data);
  };

  return <button onClick={fetchData}>Buscar Dados</button>;
}
```

## 📦 Dependências Principais

### Frontend:
- **Next.js 16** - Framework React
- **TypeScript** - Type safety
- **TailwindCSS** - Estilos (via @tailwindcss)

### Backend:
- **Express 5** - Framework Web
- **MySQL2** - Driver MySQL
- **CORS** - Compartilhamento de recursos
- **Dotenv** - Variáveis de ambiente

## 🔧 Variáveis de Ambiente .Env

### Backend (`.env`)
```
DB_HOST=mysql
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=feedbackcell
NODE_ENV=development
```

### Frontend (`.env`)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 📝 Próximos Passos

- [ ] Implementar autenticação (JWT)
- [ ] Criar endpoints API completos
- [ ] Adicionar validações
- [ ] Implementar testes
- [ ] Deploar em produção

## 🤝 Contribuindo

Sinta-se livre para fazer fork, criar branches e enviar pull requests!

## 📄 Licença

Este projeto está sob licença ISC.
