# 🚀 KYRIE OS - MVP PRD
## Product Requirements Document

**Version:** MVP 1.0  
**Date:** December 17, 2024  
**Author:** Gilmar (Kyrie Performance & Resultados)  
**Development Method:** Vibe Coding 🎵  
**Status:** Ready to Ship

---

## 📋 ÍNDICE

1. [Visão Executiva](#1-visão-executiva)
2. [O Problema](#2-o-problema)
3. [A Solução MVP](#3-a-solução-mvp)
4. [Features do MVP](#4-features-do-mvp)
5. [Stack Técnica](#5-stack-técnica)
6. [AI Agents & MCP](#6-ai-agents--mcp)
7. [Roadmap MVP](#7-roadmap-mvp)
8. [Success Metrics](#8-success-metrics)

---

## 1. VISÃO EXECUTIVA

### 1.1 O Que É Kyrie OS?

**"Kyrie OS" - Operating System para Consultorias de Performance**

Um ecossistema completo que:
- ✅ **Unifica gestão interna** (substitui Jira + Trello + ClickUp)
- ✅ **Portal do cliente** (relatórios + aprovações + comunicação)
- ✅ **IA integrada** (insights + automações + cálculos)
- ✅ **Tracking inteligente** (tutoriais + progresso + ROI)
- ✅ **Elimina ferramentas fragmentadas**

**Diferencial:** Não é "mais um project manager", é um **sistema de inteligência comercial + gestão** que transforma consultoria em máquina de resultados previsíveis.

### 1.2 Por Que Construir Isso?

**Dor atual:**
- Gilmar gasta 10h/semana em coordenação/relatórios
- Clientes não veem o trabalho sendo feito (invisível)
- Relatórios manuais consomem tempo valioso
- Difícil provar ROI claramente

**Solução:**
- AI agents fazem relatórios automaticamente
- Dashboard mostra trabalho em tempo real
- Métricas de negócio sempre atualizadas
- Transparência = confiança = retenção

### 1.3 MVP Scope

**O MVP foca em 2 coisas:**

1. **Para Gilmar:**
   - Crew AI + MCP automatizando relatórios
   - Dashboard de gestão de todos os clientes
   - Visão unificada do trabalho

2. **Para Clientes:**
   - Ver o que está sendo feito (tarefas/projetos)
   - Ver resultados do negócio (métricas)
   - Relatórios semanais automáticos

---

## 2. O PROBLEMA

### 2.1 Problemas de Gilmar

```yaml
PROBLEMA 1: Ferramentas fragmentadas
  Current State:
    - Trello para tarefas
    - Clockify para tempo
    - Google Sheets para métricas
    - WhatsApp para comunicação
    - Email para relatórios
    - 5+ ferramentas diferentes!
  
  Pain Level: 🔥🔥🔥 CRÍTICO
  Impact: Context switching mata produtividade
  Solution: Kyrie OS unifica TUDO em um lugar

PROBLEMA 2: Tempo perdido em coordenação
  Current State:
    - 10h/semana em mensagens, calls, relatórios
    - Interrupções constantes de clientes
    - Repetir mesmas informações
  
  Pain Level: 🔥🔥🔥 ALTO
  Impact: Menos tempo para trabalho estratégico

PROBLEMA 3: Relatórios manuais
  Current State:
    - Coleta manual de dados (Clockify, Trello, Meta Ads)
    - Montar planilhas/apresentações
    - Enviar por WhatsApp/Email
  
  Pain Level: 🔥🔥🔥 ALTO
  Impact: 4h/semana perdidas

PROBLEMA 4: Clientes inseguros
  Current State:
    - "O que vocês estão fazendo?"
    - "Vale a pena o investimento?"
    - Churn por falta de transparência
  
  Pain Level: 🔥🔥 MÉDIO
  Impact: Churn de 10%/ano
```

### 2.2 Problemas dos Clientes

```yaml
PROBLEMA 1: Não veem o trabalho
  Current State:
    - Sabem que Kyrie trabalha, mas não veem
    - Incerteza sobre valor entregue
    - Precisam perguntar status
  
  Pain Level: 🔥🔥 MÉDIO
  Impact: Insegurança, possível churn

PROBLEMA 2: Dados espalhados
  Current State:
    - Meta Ads em um lugar
    - Google Ads em outro
    - Métricas do negócio em Excel
  
  Pain Level: 🔥 BAIXO
  Impact: Decisões mais lentas

PROBLEMA 3: Relatórios atrasados
  Current State:
    - Esperam relatório semanal
    - Às vezes atrasa por correria
    - Informações defasadas
  
  Pain Level: 🔥 BAIXO
  Impact: Frustração ocasional
```

---

## 3. A SOLUÇÃO MVP

### 3.1 Visão Geral

**1 Sistema para Governar Todos:**

```
┌─────────────────────────────────────────────────────────┐
│         KYRIE OS - Operating System (MVP)               │
│                                                         │
│  Substitui: Trello + Clockify + Sheets + WhatsApp      │
│             + Email + PowerPoint + 10 outras tools      │
└─────────────────────────────────────────────────────────┘
                          │
         ┌────────────────┼────────────────┐
         │                                 │
┌────────▼──────────┐            ┌────────▼──────────┐
│   ADMIN APP       │            │   CLIENT APP      │
│   (Gilmar)        │            │   (4 clientes)    │
│                   │            │                   │
│ • Dashboard       │            │ • Métricas        │
│   Consolidado     │            │   Negócio         │
│                   │            │                   │
│ • Gestão de       │            │ • Projetos        │
│   Clientes        │            │   Ativos          │
│                   │            │                   │
│ • AI Agents       │            │ • Trabalho em     │
│   Control         │            │   Andamento       │
│                   │            │                   │
│ • Relatórios      │            │ • Relatórios      │
│   Manuais         │            │   Históricos      │
└───────────────────┘            └───────────────────┘

INTELLIGENCE LAYER (IA embarcada)
├─ Report Generator Agent (automação)
├─ Business Calculator (cálculos de ROI)
├─ Insights Generator (próxima fase)
└─ Prediction Engine (próxima fase)
```

### 3.2 Arquitetura de Roles

**App único, views diferentes por role:**

```typescript
// App único, views diferentes por role
if (user.role === 'KYRIE_ADMIN') {
  // Dashboard Kyrie completo
  <KyrieDashboard>
    <AllClients />
    <SprintPlanning />
    <AIInsights />
    <TeamManagement />
  </KyrieDashboard>
}

if (user.role === 'CLIENT_OWNER') {
  // Portal do cliente
  <ClientPortal>
    <MyReports />
    <TaskProgress />
    <Tutorials />
    <ApprovalQueue />
  </ClientPortal>
}
```

**Roles no sistema:**
- `KYRIE_ADMIN` - Gilmar (acesso total)
- `KYRIE_TEAM` - Futuros membros da equipe (futuro)
- `CLIENT_OWNER` - Dono do negócio (pode aprovar, ver tudo)
- `CLIENT_VIEWER` - Funcionário do cliente (só visualiza)

### 3.3 Features por Módulo

#### 📊 MÓDULO 1: DASHBOARD KYRIE (Interno)

```
┌─────────────────────────────────────────┐
│ 🏠 KYRIE DASHBOARD                      │
├─────────────────────────────────────────┤
│                                         │
│ 📊 Sprint Atual                         │
│ ├─ Distribuição por cliente (%)        │
│ │  • Adega: 40% (target: 40%) ✅       │
│ │  • Mont: 35% (target: 35%) ✅        │
│ │  • Libertare: 15% (target: 15%) ✅   │
│ ├─ Horas trabalhadas vs Meta           │
│ ├─ Alertas automáticos                 │
│ └─ Próximas 5 prioridades               │
│                                         │
│ 🤖 AI Insights                          │
│ ├─ "Adega precisa +5h esta semana"     │
│ ├─ "MontMassas: Google Ads performando" │
│ ├─ "Sugestão: priorizar NFC-e"         │
│ └─ "Cliente Libertare engajado (🟢)"   │
│                                         │
│ 📋 Backlog Inteligente                  │
│ ├─ Auto-priorizado por ICE + Tempo     │
│ ├─ Drag & drop manual override         │
│ ├─ Filtros: cliente/projeto/status     │
│ └─ Bulk actions                        │
│                                         │
│ 👥 Clientes                             │
│ ├─ Adega Anita's (health: 🟢 85/100)  │
│ │  └─ ROI: 4.2x • Churn risk: 5%      │
│ ├─ MontMassas (health: 🟡 72/100)     │
│ │  └─ ROI: 3.1x • Churn risk: 15%     │
│ ├─ Libertare (health: 🟢 88/100)      │
│ │  └─ ROI: 5.6x • Churn risk: 3%      │
│ └─ SI:pai (health: 🟢 80/100)         │
│    └─ ROI: 3.8x • Churn risk: 8%      │
└─────────────────────────────────────────┘
```

**Features principais:**
- ✅ Sprint planning visual com drag & drop
- ✅ Time tracking integrado (mata Clockify)
- ✅ Cálculo automático ICE + distribuição de tempo
- ✅ Chat com IA ("Qual task priorizar agora?")
- ✅ Kanban + Gantt + Calendar views
- ✅ Health score em tempo real
- ✅ Alertas proativos (cliente em risco)
- ✅ ROI por cliente calculado automaticamente

#### 🏢 MÓDULO 2: PORTAL DO CLIENTE

```
┌─────────────────────────────────────────┐
│ 🏢 ADEGA ANITA'S - Portal               │
├─────────────────────────────────────────┤
│                                         │
│ 📈 Métricas do Mês                      │
│ ├─ Faturamento: R$ 45.320 (+12%) 📈    │
│ ├─ Novos clientes: 18 (+3)             │
│ ├─ Taxa conversão: 3.2% (+0.8%)        │
│ ├─ ROI Marketing: 4.2x                 │
│ └─ Investimento: R$ 3.500               │
│    Retorno: R$ 14.700                   │
│    Lucro: R$ 11.200 💰                  │
│                                         │
│ 🎯 Progresso Projetos                   │
│ ├─ Google Ads Dezembro                 │
│ │  [██████░░░░] 60%                    │
│ │  • Setup: ✅ Concluído                │
│ │  • Anúncios: ✅ Concluído             │
│ │  • Otimização: 🔄 Em andamento       │
│ │                                       │
│ ├─ NFC-e Sistema                       │
│ │  [████████░░] 80%                    │
│ │  • Config: ✅ Concluído               │
│ │  • Testes: ✅ Concluído               │
│ │  • Deploy: 🔄 Em andamento           │
│ │                                       │
│ └─ Carrossel Instagram                 │
│    [███░░░░░░░] 30%                    │
│    • Planejamento: ✅ Concluído        │
│    • Criação: 🔄 Em andamento          │
│                                         │
│ ✅ Aprovações Pendentes (3)             │
│ ├─ 📸 Post Instagram - Promoção Natal  │
│ │   [Ver] [Aprovar] [Solicitar mudanças]│
│ ├─ 📝 Copy Email Marketing             │
│ └─ 🎨 Banner site - Black Friday       │
│                                         │
│ 📚 Tutoriais (5/8 completos)            │
│ ├─ ✅ Como adicionar produtos (100%)   │
│ ├─ ⏸️ Google Analytics (50%)           │
│ │   [Continuar assistindo]             │
│ ├─ 🆕 Meta Ads Básico                  │
│ │   [Começar] • 15min • Obrigatório    │
│ └─ 🔒 Campanhas Avançadas               │
│    Desbloqueado após: Meta Ads Básico  │
│                                         │
│ 💬 Comunicação                          │
│ ├─ Enviar mensagem para Gilmar         │
│ ├─ Últimas mensagens:                  │
│ │  • Hoje: "Setup NFC-e concluído" ✅  │
│ │  • Ontem: "Anúncios no ar!"         │
│ └─ [Ver histórico completo]            │
│                                         │
│ 📊 Relatórios Semanais                  │
│ ├─ Semana 10-16 Dez (novo) 🆕          │
│ ├─ Semana 03-09 Dez                    │
│ ├─ Semana 26 Nov - 02 Dez              │
│ └─ [Ver todos os relatórios]           │
└─────────────────────────────────────────┘
```

**Features principais:**
- ✅ Métricas de negócio em tempo real
- ✅ ROI visual e calculado automaticamente
- ✅ Progress bars de projetos
- ✅ Aprovações com preview e feedback
- ✅ Sistema de tutoriais com tracking
- ✅ Comunicação assíncrona com Kyrie
- ✅ Arquivo de relatórios semanais
- ✅ Dashboard responsivo (mobile-friendly)

### 3.2 Core Value Propositions

**Para Gilmar:**
- 🎯 **1 sistema substitui 10+ ferramentas** (Trello, Clockify, Sheets, etc)
- 🤖 **IA embarcada gera relatórios** automaticamente (economiza 4h/semana)
- 📊 **Dashboard único** para todos os clientes (zero context switching)
- ⚡ **Menos interrupções** (clientes veem dados em tempo real)
- 💰 **ROI calculado automaticamente** (prova valor constantemente)

**Para Clientes:**
- 👀 **Transparência total** do trabalho (veem tudo que acontece)
- 📈 **Métricas de negócio** sempre atualizadas (receita, ROI, conversão)
- 📱 **Acesso 24/7** ao dashboard (quando quiserem)
- 🔔 **Relatórios automáticos** toda semana (sem atrasos)
- 🎓 **Tracking de evolução** (veem próprio progresso)

**Diferencial vs. Concorrentes:**
- ❌ Trello/Jira: Só gestão de tarefas (sem IA, sem relatórios)
- ❌ ClickUp: Genérico (não focado em consultoria)
- ❌ Notion: Tudo manual (zero automação)
- ✅ **Kyrie OS: Sistema completo + IA + foco em resultado**

---

## 4. FEATURES DO MVP

### 4.1 ADMIN APP (Gilmar)

#### Feature 1: Dashboard Consolidado

```yaml
Description:
  Visão única de todos os 4 clientes com métricas principais

Components:
  - Grid de cards (1 por cliente)
  - Health score de cada cliente
  - Tempo alocado vs. target
  - Projetos ativos
  - Alertas importantes

Why MVP:
  - Essencial para gestão diária
  - Economiza tempo de context switching
  - Detecta problemas rapidamente
```

#### Feature 2: AI Report Generator

```yaml
Description:
  Botão para gerar relatório semanal de qualquer cliente
  usando AI Agent + MCP

Flow:
  1. Gilmar seleciona cliente
  2. Clica "Gerar Relatório Semanal"
  3. AI Agent:
     - Busca dados no Supabase (projetos, tarefas)
     - Busca tempo no Clockify via MCP
     - Busca métricas no Google Sheets via MCP
     - Gera texto com insights (LLM)
     - Formata em markdown/PDF
  4. Gilmar revisa e envia (ou envia automático)

Why MVP:
  - MAIOR ECONOMIA DE TEMPO (4h/semana → 30min)
  - Relatórios consistentes
  - Dados sempre corretos
```

#### Feature 3: Client Management

```yaml
Description:
  CRUD básico de clientes e projetos

Components:
  - Lista de clientes
  - Adicionar/editar cliente
  - Associar projetos
  - Definir targets de tempo

Why MVP:
  - Base necessária para tudo
  - Sem isso, nada funciona
```

#### Feature 4: Unified Task Manager

```yaml
Description:
  Gestão de tarefas integrada (substitui Trello/Jira)

Components:
  - Kanban board por cliente
  - Criar/editar/mover tarefas
  - Filtros por projeto/status
  - Drag & drop

Why MVP:
  - UNIFICA FERRAMENTAS (mata Trello)
  - Tudo em um lugar
  - Base para relatórios AI
```

#### Feature 5: Intelligence Dashboard

```yaml
Description:
  Painel com insights de IA sobre todos os clientes

Components:
  - Health score por cliente
  - Alertas automáticos (cliente em risco)
  - ROI calculado automaticamente
  - Sugestões de ação

Why MVP:
  - DIFERENCIAL vs. ferramentas normais
  - IA mostra o que fazer agora
  - Previne churn
```

### 4.2 CLIENT APP (4 Clientes)

#### Feature 1: Business Metrics Dashboard

```yaml
Description:
  Cards animados mostrando KPIs do negócio do cliente

Métricas:
  - Receita mensal
  - Novos clientes
  - Taxa de conversão
  - ROI do marketing
  - Comparação vs. mês anterior

Data Source:
  - Google Sheets (via MCP)
  - Atualização manual por Gilmar
  - Futuro: Integrações diretas

Why MVP:
  - MOSTRA VALOR IMEDIATO
  - Clientes veem ROI claramente
  - Reduz insegurança
```

#### Feature 2: Work in Progress

```yaml
Description:
  Lista de projetos e tarefas em andamento

Display:
  - Projeto: "Google Ads Dezembro"
    └─ Status: Em andamento
    └─ Progresso: 60%
    └─ Tarefas:
       • [x] Setup campanha
       • [x] Criar anúncios
       • [ ] Otimização semanal
  
  - Projeto: "Conteúdo Instagram"
    └─ Status: Em andamento
    └─ Progresso: 80%
    └─ Tarefas: ...

Why MVP:
  - TRANSPARÊNCIA TOTAL
  - Cliente vê trabalho acontecendo
  - Reduz "cadê o trabalho?" em 90%
```

#### Feature 3: Weekly Reports Archive

```yaml
Description:
  Lista de relatórios semanais gerados pela AI

Display:
  - Semana 10/12 - 16/12
    └─ Resumo executivo
    └─ Trabalho realizado
    └─ Resultados alcançados
    └─ Próximos passos
    └─ [Ver completo] [Download PDF]

Why MVP:
  - Histórico sempre acessível
  - Cliente pode revisar quando quiser
  - Prova de valor acumulado
```

#### Feature 4: ROI Tracker

```yaml
Description:
  Visualização do ROI do investimento em consultoria

Display:
  - Gráfico de evolução
  - Investimento: R$ 1.500/mês
  - Retorno: R$ 8.400/mês
  - ROI: 5.6x 🚀
  - Payback: 2 semanas

Why MVP:
  - PROVA VALOR CLARAMENTE
  - Cliente vê que vale a pena
  - Reduz churn drasticamente
```

---

## 5. STACK TÉCNICA

### 5.1 Architecture Overview

```
┌──────────────────────────────────────────────────┐
│              FRONTEND (Next.js 14)               │
│                                                  │
│  ┌─────────────┐          ┌─────────────┐      │
│  │  Admin App  │          │ Client App  │      │
│  │  (Gilmar)   │          │ (Clientes)  │      │
│  └──────┬──────┘          └──────┬──────┘      │
│         │                        │              │
│         └────────────┬───────────┘              │
│                      │                          │
└──────────────────────┼──────────────────────────┘
                       │ API Calls (REST)
┌──────────────────────▼──────────────────────────┐
│            BACKEND (FastAPI)                    │
│                                                  │
│  ┌────────────────────────────────┐            │
│  │     API Routes                 │            │
│  │  • /auth/*                     │            │
│  │  • /clients/*                  │            │
│  │  • /projects/*                 │            │
│  │  • /reports/*                  │            │
│  │  • /ai/generate-report         │            │
│  └────────────────────────────────┘            │
│                                                  │
│  ┌────────────────────────────────┐            │
│  │     AI Engine (CrewAI)         │            │
│  │  • Report Generator Agent      │            │
│  │  • MCP Tools Integration       │            │
│  └────────────────────────────────┘            │
└──────────────────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
┌───────▼────┐  ┌──────▼──────┐  ┌───▼────────┐
│  Supabase  │  │ MCP Servers │  │  OpenAI    │
│            │  │             │  │  (GPT-4o)  │
│ • Database │  │ • Clockify  │  └────────────┘
│ • Auth     │  │ • Sheets    │
│ • Storage  │  │ • Trello    │
└────────────┘  └─────────────┘
```

### 5.2 Tech Stack Detalhado

```yaml
FRONTEND:
  Framework: Next.js 14 (App Router)
  Language: TypeScript
  Styling: Tailwind CSS + shadcn/ui
  Animations: Framer Motion
  State: React Context + SWR (data fetching)
  Auth: Supabase Auth
  
  Architecture:
    Single App with Role-Based Routing:
    
    app/
    ├── (auth)/
    │   └── login/page.tsx          # Login único
    │
    ├── (kyrie)/                    # KYRIE_ADMIN role
    │   ├── layout.tsx              # Admin layout
    │   ├── dashboard/page.tsx      # Sprint planning
    │   ├── clients/page.tsx        # Client management
    │   ├── backlog/page.tsx        # Intelligent backlog
    │   └── insights/page.tsx       # AI insights
    │
    ├── (client)/                   # CLIENT_OWNER role
    │   ├── layout.tsx              # Client layout
    │   ├── dashboard/page.tsx      # Metrics & projects
    │   ├── approvals/page.tsx      # Approval queue
    │   ├── tutorials/page.tsx      # Tutorial center
    │   └── reports/page.tsx        # Reports archive
    │
    └── middleware.ts               # Role-based redirect
  
  Key Libraries:
    - @supabase/supabase-js (auth + data)
    - recharts (gráficos)
    - react-hook-form (formulários)
    - zod (validação)
    - @dnd-kit/core (drag & drop)
    - framer-motion (animations)

BACKEND:
  Framework: FastAPI (Python 3.11+)
  AI Framework: CrewAI 0.30+
  LLM: OpenAI GPT-4o-mini
  
  Key Libraries:
    - crewai
    - langchain
    - pydantic (schemas)
    - supabase-py
    - python-dotenv

DATABASE:
  Primary: Supabase (PostgreSQL)
  
  Tables (MVP):
    Core:
      - organizations (clientes)
      - users (auth)
      - projects
      - tasks
    
    Intelligence Layer:
      - business_metrics (receita, ROI, etc)
      - client_health (scores calculados por IA)
      - ai_insights (sugestões e alertas)
      - reports (gerados por IA)
    
    Tracking:
      - time_entries (tempo trabalhado)
      - activities (audit log)

MCP SERVERS:
  1. Clockify MCP:
     - Get time entries
     - Weekly summaries
  
  2. Google Sheets MCP:
     - Read metrics
     - Update data
  
  3. Trello MCP (nice to have):
     - Read cards
     - Sync tasks

DEPLOYMENT:
  Frontend: Vercel
  Backend: Render (Docker)
  Database: Supabase Cloud
  AI Engine: Same as Backend
```

### 5.3 Role-Based Routing Implementation

```typescript
// middleware.ts - Role-based redirect

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Not authenticated → redirect to login
  if (!session && !req.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Authenticated → route by role
  if (session) {
    const { data: user } = await supabase
      .from('users')
      .select('role, organization_id')
      .eq('id', session.user.id)
      .single()

    const path = req.nextUrl.pathname

    // KYRIE_ADMIN routes
    if (user?.role === 'KYRIE_ADMIN') {
      // Allow access to /kyrie/* routes
      if (path.startsWith('/client')) {
        // Admin trying to access client routes → redirect to admin dashboard
        return NextResponse.redirect(new URL('/kyrie/dashboard', req.url))
      }
    }

    // CLIENT_OWNER routes
    if (user?.role === 'CLIENT_OWNER') {
      // Allow access to /client/* routes
      if (path.startsWith('/kyrie')) {
        // Client trying to access admin routes → redirect to client dashboard
        return NextResponse.redirect(new URL('/client/dashboard', req.url))
      }
    }

    // Root redirect based on role
    if (path === '/') {
      if (user?.role === 'KYRIE_ADMIN') {
        return NextResponse.redirect(new URL('/kyrie/dashboard', req.url))
      }
      if (user?.role === 'CLIENT_OWNER') {
        return NextResponse.redirect(new URL('/client/dashboard', req.url))
      }
    }
  }

  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
```

```typescript
// Example: Kyrie Dashboard Layout
// app/(kyrie)/layout.tsx

import { KyrieSidebar } from '@/components/kyrie/sidebar'
import { KyrieHeader } from '@/components/kyrie/header'

export default function KyrieLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <KyrieSidebar />
      
      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <KyrieHeader />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
```

```typescript
// Example: Client Portal Layout
// app/(client)/layout.tsx

import { ClientHeader } from '@/components/client/header'
import { ClientSidebar } from '@/components/client/sidebar'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Sidebar */}
      <ClientSidebar />
      
      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <ClientHeader />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
```

```yaml
FRONTEND:
  Framework: Next.js 14 (App Router)
  Language: TypeScript
  Styling: Tailwind CSS + shadcn/ui
  Animations: Framer Motion
  State: React Context + SWR (data fetching)
  Auth: Supabase Auth
  
  Architecture:
    Single App with Role-Based Routing:
    
    app/
    ├── (auth)/
    │   └── login/page.tsx          # Login único
    │
    ├── (kyrie)/                    # KYRIE_ADMIN role
    │   ├── layout.tsx              # Admin layout
    │   ├── dashboard/page.tsx      # Sprint planning
    │   ├── clients/page.tsx        # Client management
    │   ├── backlog/page.tsx        # Intelligent backlog
    │   └── insights/page.tsx       # AI insights
    │
    ├── (client)/                   # CLIENT_OWNER role
    │   ├── layout.tsx              # Client layout
    │   ├── dashboard/page.tsx      # Metrics & projects
    │   ├── approvals/page.tsx      # Approval queue
    │   ├── tutorials/page.tsx      # Tutorial center
    │   └── reports/page.tsx        # Reports archive
    │
    └── middleware.ts               # Role-based redirect
  
  Key Libraries:
    - @supabase/supabase-js (auth + data)
    - recharts (gráficos)
    - react-hook-form (formulários)
    - zod (validação)
    - @dnd-kit/core (drag & drop)
    - framer-motion (animations)

BACKEND:
  Framework: FastAPI (Python 3.11+)
  AI Framework: CrewAI 0.30+
  LLM: OpenAI GPT-4o-mini
  
  Key Libraries:
    - crewai
    - langchain
    - pydantic (schemas)
    - supabase-py
    - python-dotenv

DATABASE:
  Primary: Supabase (PostgreSQL)
  
  Tables (MVP):
    Core:
      - organizations (clientes)
      - users (auth)
      - projects
      - tasks
    
    Intelligence Layer:
      - business_metrics (receita, ROI, etc)
      - client_health (scores calculados por IA)
      - ai_insights (sugestões e alertas)
      - reports (gerados por IA)
    
    Tracking:
      - time_entries (tempo trabalhado)
      - activities (audit log)

MCP SERVERS:
  1. Clockify MCP:
     - Get time entries
     - Weekly summaries
  
  2. Google Sheets MCP:
     - Read metrics
     - Update data
  
  3. Trello MCP (nice to have):
     - Read cards
     - Sync tasks

DEPLOYMENT:
  Frontend: Vercel
  Backend: Render (Docker)
  Database: Supabase Cloud
  AI Engine: Same as Backend
```

---

## 6. AI AGENTS & MCP

### 6.1 Intelligence Layer Overview

**Kyrie OS tem IA embarcada que:**
- 🤖 Gera relatórios automaticamente
- 📊 Calcula ROI e métricas de negócio
- ⚠️ Detecta clientes em risco (churn prediction)
- 💡 Sugere próximas ações
- 🎯 Prioriza tarefas por impacto

**No MVP temos 2 agentes:**

1. **Report Generator Agent** (prioridade 1)
   - Gera relatório semanal completo
   - Usa MCP para buscar dados
   - Economiza 4h/semana

2. **Business Calculator Agent** (prioridade 2)
   - Calcula ROI automaticamente
   - Health score do cliente
   - Churn risk prediction

### 6.2 Report Generator Agent

```python
# Pseudo-código do Report Generator Agent

from crewai import Agent, Task, Crew
from tools.mcp_tools import (
    ClockifyTool,
    GoogleSheetsTool,
    SupabaseTool
)

class ReportGeneratorAgent:
    """
    Gera relatório semanal de cliente usando:
    - Dados do Supabase (projetos, tarefas)
    - Time tracking do Clockify
    - Métricas do Google Sheets
    """
    
    def __init__(self, client_id: str):
        self.client_id = client_id
        
        # Setup tools
        self.tools = [
            SupabaseTool(),      # Buscar projetos/tarefas
            ClockifyTool(),      # Tempo trabalhado
            GoogleSheetsTool()   # Métricas de negócio
        ]
        
        # Create agent
        self.agent = Agent(
            role="Marketing Report Specialist",
            goal=f"Generate comprehensive weekly report for client {client_id}",
            backstory="""You are an expert marketing analyst who creates 
            clear, actionable reports for clients. You focus on results 
            and always connect activities to business outcomes.""",
            tools=self.tools,
            llm="gpt-4o-mini"
        )
    
    def generate_weekly_report(self, week_start: str, week_end: str):
        """Generate weekly report"""
        
        # Task 1: Gather data
        gather_task = Task(
            description=f"""
            Gather all data for week {week_start} to {week_end}:
            
            1. From Supabase:
               - All projects for client {self.client_id}
               - Tasks completed this week
               - Tasks in progress
            
            2. From Clockify:
               - Total hours worked
               - Hours per project
            
            3. From Google Sheets:
               - Revenue this week vs last week
               - New customers
               - Conversion rate
               - ROI
            """,
            expected_output="Structured JSON with all data",
            agent=self.agent
        )
        
        # Task 2: Analyze and generate report
        report_task = Task(
            description="""
            Using the gathered data, create a weekly report with:
            
            STRUCTURE:
            1. Executive Summary (2-3 sentences)
               - Main achievements
               - Business impact
            
            2. Work Completed (bullet list)
               - Project X: Tasks A, B, C completed
               - Project Y: Tasks D, E completed
            
            3. Business Results
               - Revenue: R$ X (+Y% vs last week)
               - New customers: Z
               - ROI: W.X
            
            4. Next Week Focus
               - Top 3 priorities
            
            5. Insights & Recommendations
               - 1-2 key insights from data
            
            TONE: Professional but friendly, results-focused
            FORMAT: Markdown
            """,
            expected_output="Complete markdown report",
            agent=self.agent,
            context=[gather_task]
        )
        
        # Execute crew
        crew = Crew(
            agents=[self.agent],
            tasks=[gather_task, report_task],
            verbose=True
        )
        
        result = crew.kickoff()
        return result
```

### 6.3 Business Calculator Agent

```python
# agents/business_calculator.py

from crewai import Agent, Task, Crew
from tools.mcp_tools import SupabaseTool, GoogleSheetsTool

class BusinessCalculatorAgent:
    """
    Calcula métricas de negócio e saúde do cliente:
    - ROI do investimento em consultoria
    - Health score (0-100)
    - Churn risk (%)
    - Insights automáticos
    """
    
    def __init__(self, client_id: str):
        self.client_id = client_id
        
        self.tools = [
            SupabaseTool(),
            GoogleSheetsTool()
        ]
        
        self.agent = Agent(
            role="Business Intelligence Analyst",
            goal=f"Calculate business metrics and health for client {client_id}",
            backstory="""You are a business analyst expert who calculates 
            ROI, health scores, and predicts churn risk based on client 
            behavior and business results.""",
            tools=self.tools,
            llm="gpt-4o-mini"
        )
    
    def calculate_roi(self, period_days: int = 30):
        """Calculate ROI for the period"""
        
        task = Task(
            description=f"""
            Calculate ROI for client {self.client_id} for last {period_days} days:
            
            1. Get investment:
               - Monthly fee: R$ 1,500
               - Ads spend from Sheets
            
            2. Get results:
               - Revenue growth from Sheets
               - New customers from Sheets
            
            3. Calculate:
               - Total investment = fee + ads
               - Revenue increase = current - previous
               - ROI = (revenue increase - investment) / investment
               - Payback period in days
            
            Return JSON:
            {{
              "investment": 1500,
              "ads_spend": 2000,
              "total_investment": 3500,
              "revenue_increase": 12400,
              "profit": 8900,
              "roi": 2.54,
              "roi_percentage": "254%",
              "payback_days": 8
            }}
            """,
            expected_output="JSON with ROI calculations",
            agent=self.agent
        )
        
        crew = Crew(agents=[self.agent], tasks=[task])
        result = crew.kickoff()
        return result
    
    def calculate_health_score(self):
        """Calculate client health score (0-100)"""
        
        task = Task(
            description=f"""
            Calculate health score for client {self.client_id}:
            
            FACTORS (each 0-10):
            1. Engagement (30%):
               - Login frequency (last 30 days)
               - Response time to messages
               - Tasks completion rate
            
            2. Satisfaction (30%):
               - Feedback sentiment
               - Approval response time
               - Issues raised
            
            3. Results (40%):
               - Revenue growth trend
               - ROI above 2x
               - Goals achievement
            
            Formula:
            health_score = (engagement * 0.3) + (satisfaction * 0.3) + (results * 0.4)
            health_score = health_score * 10  # Scale to 0-100
            
            Classify:
            - 80-100: Excellent (green)
            - 60-79: Good (yellow)
            - 40-59: At Risk (orange)
            - 0-39: Critical (red)
            
            Return JSON:
            {{
              "health_score": 85,
              "classification": "Excellent",
              "color": "green",
              "factors": {{
                "engagement": 9,
                "satisfaction": 8,
                "results": 9
              }},
              "churn_risk": 5,
              "insights": ["Client is very engaged", "Excellent results"]
            }}
            """,
            expected_output="JSON with health score",
            agent=self.agent
        )
        
        crew = Crew(agents=[self.agent], tasks=[task])
        result = crew.kickoff()
        return result
```

### 6.4 API Endpoints

```python
# api/routes/intelligence.py

from fastapi import APIRouter
from agents.business_calculator import BusinessCalculatorAgent

router = APIRouter()

@router.post("/ai/calculate-roi")
async def calculate_roi(client_id: str, period_days: int = 30):
    """
    Calculate ROI for client
    
    Returns:
        {
          "investment": 3500,
          "revenue_increase": 12400,
          "roi": 2.54,
          "roi_percentage": "254%"
        }
    """
    agent = BusinessCalculatorAgent(client_id)
    result = agent.calculate_roi(period_days)
    return result

@router.post("/ai/health-score")
async def calculate_health_score(client_id: str):
    """
    Calculate client health score
    
    Returns:
        {
          "health_score": 85,
          "classification": "Excellent",
          "churn_risk": 5
        }
    """
    agent = BusinessCalculatorAgent(client_id)
    result = agent.calculate_health_score()
    return result
```

### 6.5 MCP Tools Implementation

```python
# tools/mcp_tools.py

from crewai_tools import BaseTool
from mcp_client import MCPClient

class ClockifyTool(BaseTool):
    name: str = "Clockify Time Tracker"
    description: str = """
    Get time tracking data from Clockify.
    Use this to see how much time was spent on each project.
    """
    
    def _run(self, workspace_id: str, user_id: str, 
             start_date: str, end_date: str) -> dict:
        """Get time entries from Clockify via MCP"""
        
        client = MCPClient("clockify")
        
        result = client.call_tool(
            "get_time_entries",
            {
                "workspaceId": workspace_id,
                "userId": user_id,
                "start": start_date,
                "end": end_date
            }
        )
        
        return result


class GoogleSheetsTool(BaseTool):
    name: str = "Google Sheets Reader"
    description: str = """
    Read business metrics from Google Sheets.
    Use this to get revenue, customers, conversion rate, ROI, etc.
    """
    
    def _run(self, spreadsheet_id: str, range: str) -> dict:
        """Read data from Google Sheets via MCP"""
        
        client = MCPClient("google-sheets")
        
        result = client.call_tool(
            "read_range",
            {
                "spreadsheetId": spreadsheet_id,
                "range": range  # e.g., "Métricas!A1:E10"
            }
        )
        
        return result


class SupabaseTool(BaseTool):
    name: str = "Supabase Database"
    description: str = """
    Query projects and tasks from Supabase database.
    Use this to see what work was done.
    """
    
    def _run(self, table: str, filters: dict) -> dict:
        """Query Supabase via MCP"""
        
        client = MCPClient("supabase")
        
        result = client.call_tool(
            "query_table",
            {
                "table": table,
                "filters": filters
            }
        )
        
        return result
```

### 6.3 API Endpoint

```python
# api/routes/reports.py

from fastapi import APIRouter, HTTPException
from agents.report_generator import ReportGeneratorAgent

router = APIRouter()

@router.post("/ai/generate-report")
async def generate_report(
    client_id: str,
    week_start: str,
    week_end: str
):
    """
    Generate weekly report using AI Agent
    
    Returns:
        {
            "success": true,
            "report_markdown": "# Weekly Report...",
            "execution_time": 8.5,
            "llm_used": "gpt-4o-mini"
        }
    """
    
    try:
        # Create agent
        agent = ReportGeneratorAgent(client_id)
        
        # Generate report
        report = agent.generate_weekly_report(week_start, week_end)
        
        # Save to database
        # (código para salvar)
        
        return {
            "success": True,
            "report_markdown": report,
            "execution_time": 8.5,
            "llm_used": "gpt-4o-mini"
        }
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate report: {str(e)}"
        )
```

---

## 7. ROADMAP MVP

### 7.1 Cronograma (3 Semanas)

```
SEMANA 1: Foundation (40h)
═══════════════════════════════════════

Day 1-2: Setup (16h)
  ✅ Criar repos GitHub
  ✅ Setup Next.js + Tailwind
  ✅ Setup FastAPI
  ✅ Setup Supabase
  ✅ Database schema (apenas tabelas MVP)
  ✅ Auth flow básico

Day 3-4: Admin App Base (16h)
  ✅ Layout admin
  ✅ Client list
  ✅ CRUD clients
  ✅ Dashboard consolidado (mockado)

Day 5: MCP Setup (8h)
  ✅ Clockify MCP
  ✅ Google Sheets MCP
  ✅ Testar conexões

Deliverable: Login funcionando + CRUD clients

───────────────────────────────────────────────────

SEMANA 2: AI Agent + Client App (40h)
═══════════════════════════════════════

Day 1-2: AI Agent (16h)
  ✅ CrewAI setup
  ✅ Report Generator Agent
  ✅ MCP Tools wrapper
  ✅ Test report generation
  ✅ API endpoint

Day 3: Client App Base (8h)
  ✅ Layout client
  ✅ Login client
  ✅ Business metrics dashboard (mockado)

Day 4: Real Data Integration (8h)
  ✅ Connect Sheets → metrics display
  ✅ Projects list from Supabase
  ✅ Real-time updates

Day 5: Polish (8h)
  ✅ Animations
  ✅ Error handling
  ✅ Loading states

Deliverable: AI gerando relatórios + Client vendo métricas

───────────────────────────────────────────────────

SEMANA 3: Integration + Deploy (40h)
═══════════════════════════════════════

Day 1-2: Work in Progress Feature (16h)
  ✅ Projects/tasks display
  ✅ Progress bars
  ✅ Status updates
  ✅ Real-time sync

Day 3: Reports Archive (8h)
  ✅ List historical reports
  ✅ View report detail
  ✅ Download PDF

Day 4: Testing + Fixes (8h)
  ✅ Test com dados reais
  ✅ Bug fixes
  ✅ Performance

Day 5: Deploy (8h)
  ✅ Deploy frontend (Vercel)
  ✅ Deploy backend (Render)
  ✅ Setup domínio
  ✅ Onboarding 4 clientes

Deliverable: MVP em produção com 4 clientes

═══════════════════════════════════════
```

### 7.2 Milestones

```yaml
MILESTONE 1 (Week 1):
  Goal: Foundation working
  Success: Gilmar can login and manage clients
  Demo: Create client, see dashboard

MILESTONE 2 (Week 2):
  Goal: AI Agent generating reports
  Success: Click button → AI generates report in 10s
  Demo: Generate report for Adega Anita's

MILESTONE 3 (Week 3):
  Goal: MVP live with 4 clients
  Success: All 4 clients using daily
  Demo: Full system walkthrough
```

---

## 8. SUCCESS METRICS

### 8.1 Métricas de Sucesso (30 dias)

```yaml
UNIFICAÇÃO (Ferramentas eliminadas):
  Metric: Número de ferramentas em uso
  Current: 10+ (Trello, Clockify, Sheets, etc)
  Target: 1 (apenas Kyrie OS)
  Success: ✅ 90% das tarefas no Kyrie OS

EFICIÊNCIA (Gilmar):
  Metric: Tempo em relatórios
  Current: 4h/semana
  Target: 30min/semana
  Success: ✅ Redução de 87.5%

  Metric: Context switching
  Current: 10+ trocas de ferramenta/dia
  Target: 2 trocas/dia
  Success: ✅ Redução de 80%

  Metric: Interrupções de clientes
  Current: 20/semana ("cadê o trabalho?")
  Target: 5/semana
  Success: ✅ Redução de 75%

INTELIGÊNCIA (IA working):
  Metric: Relatórios gerados por IA
  Target: 100% (4 clientes × 4 semanas = 16 relatórios)
  Success: ✅ Zero relatório manual

  Metric: ROI calculado automaticamente
  Target: Atualizado diariamente
  Success: ✅ Clientes veem ROI em tempo real

  Metric: Health score accuracy
  Target: 85% de acurácia
  Success: ✅ Prediz churn corretamente

SATISFAÇÃO (Clientes):
  Metric: Clientes usando 3x/semana
  Target: 100% (4 de 4)
  Success: ✅ Todos os clientes ativos

  Metric: "Cadê o trabalho?" messages
  Current: 5/semana por cliente
  Target: 0
  Success: ✅ Zero perguntas sobre status

  Metric: NPS
  Current: N/A
  Target: 9/10
  Success: ✅ Survey após 30 dias

TÉCNICO:
  Metric: Uptime
  Target: >99%
  Success: ✅ Zero downtime crítico

  Metric: Page load
  Target: <2s
  Success: ✅ Dashboard load <2s

  Metric: AI response time
  Target: Report em <15s
  Success: ✅ Click → report ready
```

---

## 9. OUT OF SCOPE (MVP)

**O que NÃO entra no MVP:**
- ❌ Tutorial system completo (apenas básico)
- ❌ Approval workflow avançado (sem canvas)
- ❌ Mobile app nativo (apenas responsive web)
- ❌ Chat em tempo real (apenas mensagens assíncronas)
- ❌ Notifications push (apenas email)
- ❌ API pública
- ❌ White-label
- ❌ Multiple team members (apenas Gilmar)
- ❌ Advanced analytics (apenas métricas core)

**O que ENTRA no MVP:**
- ✅ **Unified task manager** (mata Trello)
- ✅ **Time tracking integrado** (mata Clockify)
- ✅ **Report Generator AI** (mata PowerPoint/Google Slides)
- ✅ **Business Calculator AI** (cálculos automáticos)
- ✅ **Client portal** (transparência total)
- ✅ **ROI tracking** (prova de valor)
- ✅ **Health scoring** (previne churn)

**Integrações via MCP (não diretas):**
- Google Sheets (bridge para métricas)
- Clockify (tempo trabalhado)
- Trello (sync tarefas - opcional)

**Integrações futuras (pós-MVP):**
- Meta Ads API
- Google Ads API
- Google Analytics API
- WhatsApp Business API

**Por quê este scope?**

MVP foca em **2 pilares principais:**

1. **UNIFICAÇÃO:** Substituir ferramentas fragmentadas
   - Menos context switching
   - Tudo em um lugar
   - Economia de tempo massiva

2. **INTELIGÊNCIA:** IA gera valor automaticamente
   - Relatórios automáticos
   - ROI calculado
   - Insights acionáveis
   - Prevenção de churn

Resto vem em versões futuras após validação.

---

## 10. NEXT STEPS IMEDIATOS

### 10.1 Hoje (Agora!)

```yaml
1. Setup Repos:
   ⏳ Create GitHub repo: kyrie-os
   ⏳ Initialize Next.js: apps/web
   ⏳ Initialize FastAPI: apps/api
   ⏳ Add .gitignore, README

2. Setup Supabase:
   ⏳ Create project
   ⏳ Run migrations:
      - organizations table
      - users table
      - projects table
      - business_metrics table
      - reports table
   ⏳ Enable Auth

3. Setup Vercel:
   ⏳ Connect repo
   ⏳ Deploy preview

4. Setup Render:
   ⏳ Create web service
   ⏳ Connect repo (api folder)
```

### 10.2 Esta Semana (Semana 1)

```yaml
Monday-Tuesday:
  - Complete setup
  - Basic auth flow
  - Admin layout

Wednesday-Thursday:
  - Client CRUD
  - Dashboard mockup
  - MCP connections

Friday:
  - Test everything
  - Fix bugs
  - Milestone 1 demo
```

---

## 11. DECISÕES FINAIS

### 11.1 Escolhas Técnicas Justificadas

```yaml
Why Next.js?
  ✅ SSR para SEO e performance
  ✅ App Router moderno
  ✅ Vercel deploy trivial
  ✅ Você já domina

Why FastAPI?
  ✅ Python = CrewAI/LangChain
  ✅ Async nativo
  ✅ Docs automáticas
  ✅ Type hints = menos bugs

Why Supabase?
  ✅ PostgreSQL sério
  ✅ Auth built-in
  ✅ Realtime
  ✅ Free tier generoso
  ✅ RLS = segurança

Why CrewAI?
  ✅ Multi-agent framework
  ✅ MCP integration easy
  ✅ LangChain compatible
  ✅ Ativo e moderno

Why GPT-4o-mini?
  ✅ Barato ($0.15/1M tokens)
  ✅ Rápido
  ✅ Suficiente para reports
  ✅ Pode upgrade depois
```

### 11.2 Budget MVP

```yaml
COSTS (Monthly):
  Supabase: $0 (free tier)
  Vercel: $0 (hobby)
  Render: $7 (starter)
  OpenAI: ~$10/mês (relatórios)
  Domain: $1/mês
  
  TOTAL: ~$18/mês 🎉

TIME SAVED:
  Gilmar: 4h/semana = 16h/mês
  Value: 16h × $50/h = $800/mês
  
  ROI: ($800 - $18) / $18 = 4,344% 🚀
```

---

## 12. CONCLUSÃO

### 12.1 O Que Você Tem Agora

✅ **PRD completo e focado** para MVP do Kyrie OS
✅ **Posicionamento claro**: Operating System (não "mais um PM tool")
✅ **Escopo definido**: 3 semanas
✅ **Stack justificada**: Next.js + FastAPI + Supabase + CrewAI
✅ **2 AI Agents**: Report Generator + Business Calculator
✅ **Roadmap executável**: semana a semana
✅ **Success metrics**: claros e mensuráveis

### 12.2 Diferencial vs. Concorrentes

```yaml
Trello/Jira:
  ❌ Só gestão de tarefas
  ❌ Zero inteligência
  ❌ Sem relatórios
  ❌ Sem portal do cliente

ClickUp/Monday:
  ❌ Genéricos (não focados em consultoria)
  ❌ IA básica (se houver)
  ❌ Ferramentas separadas para tudo
  ❌ Clientes não veem nada

Notion:
  ❌ Tudo manual
  ❌ Zero automação
  ❌ Sem IA real
  ❌ Não é sistema, é wiki

Kyrie OS:
  ✅ Sistema unificado (1 tool mata 10)
  ✅ IA embarcada (insights reais)
  ✅ Portal do cliente (transparência)
  ✅ Foco 100% em consultoria de performance
  ✅ ROI calculado automaticamente
  ✅ Previne churn com inteligência
```

### 12.3 Por Que Vai Funcionar

**1. Problema Real Validado**
- Você vive isso diariamente
- 10+ ferramentas = caos
- 4h/semana em relatórios = desperdício

**2. Solução Única**
- Não existe nada assim no mercado
- Unificação + IA + Foco = diferencial brutal

**3. Tech Stack Moderna**
- Next.js + FastAPI = rápido de desenvolver
- CrewAI + MCP = IA de verdade
- Supabase = infraestrutura sólida

**4. Validação Imediata**
- 4 clientes prontos para usar
- Valor mensurável (economiza 4h/semana)
- ROI claro (elimina ferramentas pagas)

**5. Timing Perfeito**
- IA está no auge
- Consultores precisam disso
- Mercado desorganizado

### 12.4 Próxima Ação

```
🎯 SETUP ANTIGRAVITY AGORA!

1. Criar pasta kyrie-os/
2. Criar .docs/ e colar este PRD
3. Criar .cursorrules
4. Abrir Antigravity
5. Primeiro prompt: "Analise o PRD..."
6. LET'S BUILD! 🚀

💜 VIBE CODING ACTIVATED!
```

---

**Kyrie OS - Operating System para Consultorias de Performance.**

*"A melhor ferramenta é aquela que você não precisa trocar."*

**LET'S BUILD THIS EMPIRE! 🚀💜**
