# 🌍 Travel Planner App

Um aplicativo móvel de planejamento de viagens inteligente desenvolvido com React Native e Expo.

## 🚀 Funcionalidades

- **Autenticação**: Login/cadastro de usuários
- **Planejamento**: Criação de roteiros personalizados por destino e datas
- **Orçamento**: Opções de orçamento (econômico, médio, premium)
- **Roteiros**: Visualização completa com hotéis, restaurantes e atrações
- **Histórico**: Salvamento e acesso às viagens planejadas

## 🛠️ Tecnologias Utilizadas

- **React Native** com **Expo**
- **TypeScript** para tipagem estática
- **React Navigation** para navegação
- **Zustand** para gerenciamento de estado
- **Axios** para requisições HTTP
- **Expo Secure Store** para armazenamento seguro
- **React Native Paper** para componentes UI
- **date-fns** para manipulação de datas

## 📱 Executando o Projeto

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Expo CLI: `npm install -g @expo/cli`
- Expo Go app no seu dispositivo móvel (opcional)

### Instalação

1. **Clone o repositório** (se aplicável):

   ```bash
   git clone <your-repo-url>
   cd travel-app
   ```

2. **Instale as dependências**:

   ```bash
   npm install
   ```

3. **Inicie o aplicativo**:

   ```bash
   npx expo start
   ```

4. **Execute no dispositivo**:
   - Escaneie o QR code com o Expo Go
   - Ou pressione `i` para iOS Simulator
   - Ou pressione `a` para Android Emulator
   - Ou pressione `w` para executar no navegador

## 🎯 Como Usar

### 1. Login/Cadastro

- Use o botão **"🚀 Entrar com Demo"** para acesso rápido
- Ou crie uma conta nova com email e senha

### 2. Criar Nova Viagem

- Toque em **"✈️ Planejar Nova Viagem"**
- Preencha:
  - Destino (ex: Paris, Tokyo, Rio de Janeiro)
  - Datas de início e fim
  - Número de viajantes
  - Tipo de orçamento
- Toque em **"🎯 Criar Roteiro"**

### 3. Visualizar Resultado

- Veja hotéis sugeridos com preços e avaliações
- Confira roteiro diário com atividades e restaurantes
- Navegue entre as diferentes seções

## 🏗️ Estrutura do Projeto

```
travel-app/
├── components/          # Componentes reutilizáveis (modularizados)
│   ├── Form/           # Componentes de formulário
│   │   └── Input.tsx
│   ├── Loading/        # Estados de carregamento
│   │   └── LoadingSpinner.tsx
│   ├── Trip/           # Componentes específicos de viagem
│   │   ├── TripHeader.tsx
│   │   └── HotelCard.tsx
│   ├── Button.tsx      # Botão base reutilizável
│   ├── Card.tsx        # Card base reutilizável
│   └── index.ts        # Exports centralizados
├── hooks/              # Custom hooks
│   └── useForm.ts      # Hook para formulários
├── constants/          # Cores, espaçamentos, configurações
│   └── index.ts
├── navigation/         # Configuração de navegação
│   └── AppNavigator.tsx
├── screens/           # Telas do aplicativo
│   ├── HomeScreen.tsx
│   ├── LoginScreen.tsx (+ versão refatorada)
│   ├── RegisterScreen.tsx
│   ├── TripFormScreen.tsx
│   └── ResultsScreen.tsx
├── services/          # APIs e serviços externos
│   └── api.ts
├── types/             # Tipagens TypeScript
│   └── index.ts
├── utils/             # Funções utilitárias
│   ├── auth.ts
│   ├── index.ts
│   └── store.ts
├── docs/              # Documentação
│   └── MODULAR_ARCHITECTURE.md
└── App.tsx            # Componente raiz
```

## 🔧 Configuração do Backend

Para conectar com seu backend real:

1. **Atualize a URL da API** em `constants/index.ts`:

   ```typescript
   export const API_CONFIG = {
     BASE_URL: "https://sua-api-backend.com/api",
     TIMEOUT: 10000,
   };
   ```

2. **Endpoints esperados**:
   - `POST /auth/login` - Login de usuário
   - `POST /auth/register` - Cadastro de usuário
   - `POST /auth/logout` - Logout
   - `POST /trips/create` - Criar roteiro
   - `GET /trips` - Listar viagens do usuário
   - `GET /trips/:id` - Detalhes da viagem

## 🎨 Personalização

### Cores e Tema

Edite `constants/index.ts` para personalizar:

```typescript
export const Colors = {
  primary: "#2196F3", // Cor primária
  secondary: "#FF9800", // Cor secundária
  background: "#F5F5F5", // Fundo
  // ... outras cores
};
```

### Componentes

Use os componentes reutilizáveis em `components/`:

```typescript
import { Button, Card } from "../components";

<Button title="Meu Botão" variant="primary" onPress={() => {}} />;
```

## 📋 Próximos Passos (Roadmap)

- [ ] **Mapas**: Integração com react-native-maps
- [ ] **Fotos**: Upload e exibição de imagens
- [ ] **Compartilhamento**: Exportar roteiro em PDF
- [ ] **Favoritos**: Sistema de curtidas para locais
- [ ] **Offline**: Cache de dados para uso offline
- [ ] **Push Notifications**: Lembretes de viagem
- [ ] **Social**: Compartilhar viagens com amigos

## 🐛 Troubleshooting

### Erro de dependências

```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro no iOS Simulator

```bash
npx expo run:ios
```

### Erro no Android

```bash
npx expo run:android
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature: `git checkout -b feature/AmazingFeature`
3. Commit suas mudanças: `git commit -m 'Add some AmazingFeature'`
4. Push para a branch: `git push origin feature/AmazingFeature`
5. Abra um Pull Request

---

**Desenvolvido com ❤️ usando React Native + Expo**
