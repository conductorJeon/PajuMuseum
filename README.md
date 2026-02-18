# 🏛️PajuMuseum (파주 박물관 가이드 & 커뮤니티)

> **박물관 유물 정보 제공과 AI 챗봇 가이드, 커뮤니티 기능을 결합한 개인 프로젝트입니다.**
> 다양한 백엔드 기술(Spring AI, Node.js)을 활용하여 목적에 맞는 마이크로서비스 형태의 기능을 구현했습니다.

---

## Tech Stack

### Frontend
- **Framework**: React (TypeScript)

### Backend (Micro-Service Architecture)
- **AI Service**: Spring Boot, Spring AI (Gemini API Integration), Flux
- **Community Service**: Node.js, Express
- **Database**: MySQL (JPA)

---

## Key Features

### 1. 박물관 컬렉션 (Museum Collections)
- **TanStack Query**를 활용한 서버 상태 관리 최적화.
- 컬렉션 목록 조회 및 상세 페이지 로딩 시 캐싱 처리를 통해 사용자 경험(UX) 향상.

### 2. AI 가이드 챗봇 (Spring AI)
- **Gemini API** 기반의 인공지능 활용.
- 커스텀 타이핑 애니메이션 구현.
- 사용자 편의를 위한 자동 스크롤(Auto-scroll) 기능 탑재.

### 3. 커뮤니티 게시판 (Node.js CRUD)
- **Node.js**를 활용한 게시판 생성, 조회, 수정, 삭제 기능 구현.

### 4. 모듈화
- **페이지네이션(Pagination) 모듈화**: 다양한 리스트에서 재사용 가능한 범용 페이지네이션 컴포넌트 설계.
- **댓글 시스템 모듈화**: 독립적인 댓글 컴포넌트 설계를 통한 코드 재사용성 극대화.

---

##  Architecture
- **Frontend**: 사용자 인터페이스 및 API 연동 (React)
- **Backend A (Spring)**: AI 연산 및 Gemini 인터페이스 처리
- **Backend B (Node.js)**: 커뮤니티 게시글 및 댓글 데이터 처리

---

## Technical Challenges & Solutions

### [TanStack Query를 이용한 데이터 최적화]
- 단순 `useEffect` 호출 방식에서 벗어나, 데이터 캐싱과 `staleTime` 설정을 통해 불필요한 네트워크 비용을 절감했습니다.

### [Spring AI 응답의 시각적 구현]
- Flux 데이터 수신 제약 상황에서, 사용자에게 실제 스트리밍과 같은 느낌을 주기 위해 전개 연산자와 `setTimeout` 기반의 커스텀 타이핑 효과를 구현했습니다.

### [컴포넌트 모듈화]
- 반복되는 페이지네이션과 댓글 로직을 별도의 모듈로 분리하여 관리함으로써 유지보수 효율을 높였습니다.

---

## Project Structure (Simplified)
```text
PajuMuseum
├── frontend (React + TanStack Query)
│   ├── src
│   │   ├── components (Shared UI - Pagination, Comment)
│   │   └── pages (Collections, ChatBot, Board)
├── backend-spring (Spring AI + Gemini)
│   └── src/main/java/com/sist/web
|        └── (Collections, Comments, ChatBot)
└── backend-node (Community CRUD)
    ├── node-db
    ├── node-server
    └── routes
