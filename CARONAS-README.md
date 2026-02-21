# ParkFlow Caronas - Funcionalidades

Este documento descreve as páginas e funcionalidades implementadas com base no **Diagrama ER de Caronas**.

## Pré-requisitos

### 1. Criar o schema e tabelas no PostgreSQL

Execute o script SQL na pasta `parkflow-api`:

```bash
psql -U postgres -d parkflow -f parkflow-api/scripts/schema-caronas.sql
```

Ou conecte ao banco e execute o conteúdo de `parkflow-api/scripts/schema-caronas.sql`.

## Estrutura das Tabelas (Schema `carona`)

| Tabela | Descrição |
|--------|-----------|
| `usuario` | Usuários do sistema (nome, email, senha, telefone, tipo) |
| `veiculo` | Veículos dos usuários (marca, modelo, placa, cor, capacidade) |
| `carona` | Caronas oferecidas (origem, destino, data, horário, vagas, motorista, veículo) |
| `solicitacao` | Pedidos de passageiros para participar de caronas |
| `pagamento` | Pagamentos vinculados a solicitações aceitas |
| `avaliacao` | Avaliações entre usuários (nota, comentário) |
| `log_sistema` | Logs de auditoria do sistema |

## API - Endpoints

Base: `http://localhost:3000/api/carona`

- **Usuários**: `GET/POST /usuarios`, `GET/PUT/DELETE /usuarios/:id`, `GET /usuarios/email/:email`
- **Veículos**: `GET/POST /veiculos`, `GET/PUT/DELETE /veiculos/:id`, `GET /veiculos/usuario/:idUsuario`
- **Caronas**: `GET/POST /caronas`, `GET/PUT/DELETE /caronas/:id`, `GET /caronas/motorista/:idMotorista`
- **Solicitações**: `GET/POST /solicitacoes`, `GET/PUT/DELETE /solicitacoes/:id`, `GET /solicitacoes/carona/:idCarona`, `GET /solicitacoes/passageiro/:idPassageiro`
- **Pagamentos**: `GET/POST /pagamentos`, `GET /pagamentos/solicitacao/:idSolicitacao`
- **Avaliações**: `GET/POST /avaliacoes`, `GET /avaliacoes/avaliado/:idAvaliado`

## Páginas do Frontend

| Rota | Componente | Funcionalidade |
|------|------------|----------------|
| `/` | Home | Página inicial com busca e oferta de caronas |
| `/login` | Login | Autenticação (busca por email) |
| `/cadastro` | Cadastro | Registro de novo usuário |
| `/caronas/buscar` | BuscarCaronas | Buscar caronas por origem, destino e data |
| `/caronas/oferecer` | OferecerCarona | Motorista cria nova carona |
| `/caronas/minhas` | MinhasCaronas | Lista caronas oferecidas pelo motorista |
| `/caronas/:id` | DetalheCarona | Detalhes da carona, solicitar vaga, aceitar/recusar, pagar |
| `/veiculos` | Veiculos | CRUD de veículos do usuário |
| `/solicitacoes` | MinhasSolicitacoes | Lista solicitações do passageiro |
| `/perfil` | Perfil | Dados do usuário e avaliações recebidas |

## Fluxo de Uso

1. **Cadastro/Login** → Usuário se cadastra ou entra com email
2. **Motorista** → Cadastra veículos em "Veículos" → Oferece carona em "Oferecer Carona"
3. **Passageiro** → Busca caronas → Solicita vaga na carona → Após aceite, realiza pagamento
4. **Motorista** → Vê solicitações na página da carona → Aceita ou recusa
5. **Perfil** → Exibe avaliações recebidas (futuro: formulário para avaliar após a viagem)

## Observações

- **Autenticação**: Atualmente simulado via `localStorage`; login verifica se o email existe no banco
- **Senha**: Não há validação de senha no login (apenas checagem de email)
- **Pagamento**: Fluxo de criação de registro de pagamento; integração com gateways pode ser adicionada depois
