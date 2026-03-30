# 🚀 Escalyze - Gestão de Vendas e Leads

Um **CRM profissional e escalável** com suporte a múltiplas empresas, integração com WhatsApp, plataformas de tráfego pago, funil de vendas e histórico de conversas em tempo real.

## ✨ Funcionalidades Principais

### 📊 Dashboard Inteligente
- Gráficos de leads vs conversões
- Distribuição por estágio do funil
- **Funil de Vendas Visual** com métricas
- Cards com KPIs principais

### 👥 Gerenciamento de Leads
- CRUD completo de leads
- Filtros por estágio (Novo, Contatado, Qualificado, Proposta, Negociação, Ganho, Perdido)
- Atribuição de leads a usuários
- Score de qualificação
- Histórico de interações

### 💬 Conversas em Tempo Real
- Chat integrado com múltiplos canais
- Suporte a: WhatsApp, Email, SMS, Phone, Facebook, Instagram
- Histórico completo de mensagens
- Status de mensagens (Enviada, Recebida, Lida)

### 🚀 Campanhas de Tráfego Pago
- Integração com: Facebook Ads, Google Ads, Instagram, TikTok, LinkedIn
- Rastreamento de: Impressões, Cliques, Leads
- Cálculo automático de ROI
- Gerenciamento de orçamento

### 📱 Integração WhatsApp
- Conexão com WhatsApp Business API
- **Geração de QR Code** para conectar
- Envio de mensagens via WhatsApp
- Recebimento de mensagens automático

### 🏢 Multi-Tenant
- Suporte a múltiplas empresas
- Isolamento de dados por empresa
- Gerenciamento de usuários por empresa
- Roles: Admin, Manager, Agent, Viewer

## 🛠️ Stack Tecnológico

### Backend
- **Java 17** com Spring Boot 3.2.2
- **PostgreSQL** para persistência de dados
- **Redis** para cache e sessões
- **JWT** para autenticação
- **WebSocket** para chat em tempo real
- **Google Zxing** para geração de QR Code

### Frontend
- **React 18** com TypeScript
- **Vite** como bundler
- **Tailwind CSS** para estilização
- **React Router** para navegação
- **Zustand** para gerenciamento de estado
- **Axios** para requisições HTTP
- **Recharts** para gráficos
- **Lucide React** para ícones

## 📋 Pré-requisitos

### Backend
- Java 17+
- Maven 3.8+
- PostgreSQL 12+
- Redis 6+

### Frontend
- Node.js 18+
- npm ou pnpm

## 🚀 Instalação e Execução

### 1. Backend (Java)

```bash
cd backend

# Compilar
mvnw clean install

# Executar
mvnw spring-boot:run
```

O backend estará disponível em `http://localhost:8080`

### 2. Frontend (React)

```bash
cd frontend

# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

## 📁 Estrutura do Projeto

```
crm-enterprise/
├── backend/
│   ├── src/main/java/com/crm/
│   │   ├── config/              # Configurações
│   │   ├── controller/          # Controllers REST
│   │   ├── service/             # Lógica de negócios
│   │   ├── repository/          # Acesso a dados
│   │   ├── model/               # Entidades JPA
│   │   ├── dto/                 # Data Transfer Objects
│   │   ├── security/            # Segurança e JWT
│   │   ├── exception/           # Exceções customizadas
│   │   └── util/                # Utilitários
│   ├── src/main/resources/
│   │   └── application.yml      # Configurações
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── components/          # Componentes React
│   │   ├── pages/               # Páginas
│   │   ├── services/            # Serviços de API
│   │   ├── store/               # Zustand store
│   │   ├── types/               # Tipos TypeScript
│   │   ├── styles/              # Estilos globais
│   │   ├── App.tsx              # Componente principal
│   │   └── main.tsx             # Entrada
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
│
└── README.md
```

## 🔌 Endpoints da API

### Leads
- `GET /api/leads` - Listar leads
- `GET /api/leads/{id}` - Obter lead
- `POST /api/leads` - Criar lead
- `PUT /api/leads/{id}` - Atualizar lead
- `DELETE /api/leads/{id}` - Deletar lead
- `PUT /api/leads/{id}/stage/{stage}` - Mover para estágio

### Conversas
- `GET /api/conversations/lead/{leadId}` - Listar conversas
- `POST /api/conversations` - Criar conversa
- `POST /api/conversations/{id}/messages` - Adicionar mensagem
- `PUT /api/conversations/{id}/close` - Fechar conversa

### Campanhas
- `GET /api/campaigns` - Listar campanhas
- `POST /api/campaigns` - Criar campanha
- `PUT /api/campaigns/{id}` - Atualizar campanha
- `DELETE /api/campaigns/{id}` - Deletar campanha

### WhatsApp
- `GET /api/whatsapp/connections` - Listar conexões
- `POST /api/whatsapp/connections` - Criar conexão
- `POST /api/whatsapp/send` - Enviar mensagem
- `DELETE /api/whatsapp/connections/{id}` - Remover conexão

## 🔐 Autenticação

O sistema usa **JWT (JSON Web Tokens)** para autenticação:

```
Authorization: Bearer <token>
```

## 📊 Modelos de Dados

### Company
- Informações da empresa
- Múltiplos usuários
- Múltiplos leads
- Múltiplas campanhas

### User
- Usuários da empresa
- Roles: Admin, Manager, Agent, Viewer
- Leads atribuídos

### Lead
- Informações do contato
- Estágio do funil
- Valor da oportunidade
- Score de qualificação
- Histórico de conversas

### Conversation
- Histórico de chat
- Múltiplos canais
- Mensagens com timestamps
- Status da conversa

### Campaign
- Campanhas de tráfego pago
- Fonte: Facebook, Google Ads, etc
- Métricas: Impressões, Cliques, Leads
- Orçamento e ROI

### WhatsAppConnection
- Conexões WhatsApp Business
- QR Code para autenticação
- Webhook para receber mensagens

## 🔄 Fluxo de Dados

```
Frontend (React)
    ↓
API REST (Spring Boot)
    ↓
Banco de Dados (PostgreSQL)
    ↓
Cache (Redis)
    ↓
Integrações Externas (WhatsApp, Facebook Ads, Google Ads)
```

## 🚀 Próximos Passos

1. **Implementar Autenticação Real**
   - Login/Registro
   - Recuperação de senha
   - OAuth2 com Google/Facebook

2. **Integração com APIs Externas**
   - WhatsApp Business API
   - Facebook Ads API
   - Google Ads API

3. **WebSocket para Chat em Tempo Real**
   - Mensagens ao vivo
   - Notificações
   - Presença online

4. **Testes Automatizados**
   - Testes unitários
   - Testes de integração
   - Testes E2E

5. **Deploy**
   - Docker
   - Kubernetes
   - CI/CD Pipeline

## 📝 Variáveis de Ambiente

### Backend (.env)
```
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/crm_enterprise
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=postgres
JWT_SECRET=your-secret-key-here
WHATSAPP_ACCESS_TOKEN=your-whatsapp-token
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret
GOOGLE_ADS_API_KEY=your-google-ads-api-key
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:8080/api
```

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.


**Desenvolvido com ❤️ para o seu sucesso em vendas!** 🚀
