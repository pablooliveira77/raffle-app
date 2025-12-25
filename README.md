# Raffle Draw App

A simple, modern raffle web application where users can add multiple participants, randomly draw winners, track draw history, and manage raffles with complete local persistence.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

## ✨ Features

- **Add Multiple Participants**: Add participants one per line via a simple modal
- **Two Draw Modes**:
  - **Draw One**: Randomly select one participant with animation
  - **Draw All**: Instantly shuffle and draw all participants at once
- **Draw History**: Track all drawn participants with their positions (1°, 2°, 3°, etc.)
- **Local Persistence**: All data stored in IndexedDB (no backend required)
- **Dark/Light Theme**: Toggle between themes with system preference support
- **Internationalization**: Full i18n support (Portuguese and English)
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Clean Architecture**: Follows Clean Architecture principles adapted for frontend

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **UI Library**: [React 18+](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Storage**: [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) via [idb](https://github.com/jakearchibald/idb)
- **Theme Management**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Icons**: [lucide-react](https://lucide.dev/)

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page
│   ├── providers.tsx       # Global providers (theme, language)
│   └── globals.css         # Global styles
│
├── shared/
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Dialog.tsx
│   │   ├── Spinner.tsx
│   │   ├── Skeleton.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── LanguageSelector.tsx
│   ├── hooks/              # Generic hooks
│   │   └── useLanguage.ts
│   ├── lib/                # Utilities and helpers
│   │   ├── language.tsx    # Custom i18n provider
│   │   └── utils.ts        # Utility functions
│   └── types/
│       └── i18n.ts         # i18n types
│
├── features/
│   └── raffle/
│       ├── domain/         # Business logic (Clean Architecture)
│       │   ├── entities/
│       │   │   └── Participant.ts
│       │   ├── repositories/
│       │   │   └── ParticipantRepository.ts
│       │   └── usecases/
│       │       ├── addParticipants.ts
│       │       ├── drawOneParticipant.ts
│       │       ├── drawAllParticipants.ts
│       │       └── resetRaffle.ts
│       │
│       ├── infra/          # Infrastructure implementations
│       │   └── storage/
│       │       └── IndexedDBParticipantRepository.ts
│       │
│       └── ui/             # Feature UI components
│           ├── components/
│           │   ├── RafflePage.tsx
│           │   ├── AddParticipantsModal.tsx
│           │   ├── DrawResultModal.tsx
│           │   ├── ParticipantsList.tsx
│           │   ├── DrawHistoryList.tsx
│           │   └── RaffleActions.tsx
│           └── hooks/
│               └── useRaffle.ts
│
└── messages/               # Internationalization
    ├── pt-BR.json
    └── en.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd raffle-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 🌐 Project Deployment

To access the complete project, click on the link below:

[Raffle App](https://raffle-app-smoky.vercel.app/)

## 🎮 How to Use

1. **Add Participants**: Click "Adicionar participantes" / "Add participants" and enter names (one per line)
2. **Draw One**: Click "Sortear um" / "Draw one" to randomly select one participant with animation
3. **Draw All**: Click "Sortear todos" / "Draw all" to instantly draw all remaining participants
4. **View History**: See all drawn participants in order on the right panel
5. **Reset**: Click "Reiniciar sorteio" / "Reset raffle" to clear everything and start over
6. **Change Theme**: Toggle between dark and light mode using the moon/sun icon
7. **Change Language**: Select Portuguese or English from the dropdown

## 🏗️ Architecture Principles

This project follows **Clean Architecture** adapted for frontend:

- **Domain Layer**: Pure business logic (entities, repositories interfaces, use cases)
- **Infrastructure Layer**: External dependencies (IndexedDB implementation)
- **UI Layer**: React components with no business logic
- **Dependency Inversion**: Use cases depend on repository interfaces, not implementations

### Key Design Decisions

- **No Backend**: All data persists in IndexedDB for simplicity
- **Type Safety**: Strict TypeScript with no `any` types
- **Separation of Concerns**: Business logic separated from UI
- **Custom Hooks**: State orchestration via `useRaffle` hook
- **Repository Pattern**: Abstract storage implementation
- **Custom i18n**: Lightweight custom solution (Next.js 16 compatibility)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🌍 Internationalization

The app supports two languages:
- **Portuguese (Brazil)** - Default
- **English**

Language selection persists in localStorage. Add more languages by:
1. Creating a new JSON file in `src/messages/`
2. Adding the locale to `Locale` type in `src/shared/types/i18n.ts`
3. Importing in `src/shared/lib/language.tsx`

## 🎨 Customization

### Themes

Themes are managed by `next-themes`. Customize colors in `src/app/globals.css` and Tailwind classes.

### Styling

All components use Tailwind CSS. Modify `tailwind.config.ts` to customize the design system.

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using Next.js and Clean Architecture principles

