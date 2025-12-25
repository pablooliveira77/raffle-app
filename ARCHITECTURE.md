# Architecture Documentation

## Clean Architecture Layers

### 1. Domain Layer (`src/features/raffle/domain/`)

Pure business logic with no external dependencies.

#### Entities
```typescript
// Participant.ts
interface Participant {
  id: string;
  name: string;
  createdAt: number;
}

interface DrawnParticipant {
  id: string;
  name: string;
  position: number;
  drawnAt: number;
}
```

#### Repository Interface
```typescript
// ParticipantRepository.ts
interface ParticipantRepository {
  getAllParticipants(): Promise<Participant[]>;
  addParticipants(names: string[]): Promise<void>;
  removeParticipant(id: string): Promise<void>;
  getDrawHistory(): Promise<DrawnParticipant[]>;
  addToDrawHistory(participant: DrawnParticipant): Promise<void>;
  clearAll(): Promise<void>;
}
```

#### Use Cases
- `addParticipants`: Validates and adds multiple participants
- `drawOneParticipant`: Randomly selects one participant
- `drawAllParticipants`: Shuffles and draws all participants
- `resetRaffle`: Clears all data

### 2. Infrastructure Layer (`src/features/raffle/infra/`)

External dependencies and implementations.

#### IndexedDB Repository
```typescript
// IndexedDBParticipantRepository.ts
class IndexedDBParticipantRepository implements ParticipantRepository {
  // Concrete implementation using idb library
}
```

### 3. UI Layer (`src/features/raffle/ui/`)

React components with no business logic.

#### Custom Hook
```typescript
// useRaffle.ts
const {
  participants,
  history,
  isLoading,
  isDrawing,
  addParticipants,
  drawOne,
  drawAll,
  reset
} = useRaffle();
```

## Data Flow

```
User Action → UI Component → useRaffle Hook → Use Case → Repository → IndexedDB
                                                              ↓
User Feedback ← UI Component ← State Update ←────────────────┘
```

## Dependency Rules

1. **Domain** depends on nothing
2. **Infrastructure** depends on Domain (implements interfaces)
3. **UI** depends on Domain and Infrastructure (via hooks)
4. Dependencies point inward (Dependency Inversion Principle)

## Adding New Features

### Example: Add "Export History" Feature

1. **Domain**: Create use case
```typescript
// src/features/raffle/domain/usecases/exportHistory.ts
export async function exportHistory(
  repository: ParticipantRepository
): Promise<string> {
  const history = await repository.getDrawHistory();
  return JSON.stringify(history, null, 2);
}
```

2. **UI**: Add button and handler
```typescript
// In useRaffle hook
const exportHistory = useCallback(async () => {
  const data = await exportHistoryUseCase(repositoryRef.current);
  // Download or copy data
}, []);
```

3. **Component**: Use the hook
```typescript
<Button onClick={exportHistory}>
  Export History
</Button>
```

## Testing Strategy

### Unit Tests (Domain)
Test use cases with mock repositories:
```typescript
test('drawOneParticipant removes participant from list', async () => {
  const mockRepo = new MockParticipantRepository();
  await mockRepo.addParticipants(['Alice', 'Bob']);
  
  const drawn = await drawOneParticipant(mockRepo);
  const remaining = await mockRepo.getAllParticipants();
  
  expect(remaining).toHaveLength(1);
  expect(drawn.name).toMatch(/Alice|Bob/);
});
```

### Integration Tests (Infrastructure)
Test IndexedDB repository with fake IndexedDB:
```typescript
test('IndexedDBRepository persists data', async () => {
  const repo = new IndexedDBParticipantRepository();
  await repo.addParticipants(['Alice']);
  
  const participants = await repo.getAllParticipants();
  expect(participants).toHaveLength(1);
  expect(participants[0].name).toBe('Alice');
});
```

### E2E Tests (UI)
Test complete user flows with Playwright or Cypress.

## Performance Considerations

- **IndexedDB**: Async operations with no blocking
- **React optimizations**: useCallback, useMemo for expensive operations
- **Code splitting**: Dynamic imports for large features (if needed)
- **Lazy loading**: Components loaded on demand

## Security Considerations

- No backend = No server-side vulnerabilities
- Data stored locally = User controls their own data
- No authentication = No password security issues
- XSS protection via React's built-in escaping

## Scalability

Current design supports:
- Thousands of participants (IndexedDB can handle it)
- Unlimited draw history
- Multiple concurrent tabs (IndexedDB handles conflicts)

## Browser Storage Limits

- Chrome: ~60% of disk space (but minimum 300MB)
- Firefox: ~50% of available disk space
- Safari: 1GB limit

For typical use (hundreds of participants), storage is not a concern.
