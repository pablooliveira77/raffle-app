import { openDB, type DBSchema, type IDBPDatabase } from "idb";
import type { ParticipantRepository } from "../../domain/repositories/ParticipantRepository";
import type {
  Participant,
  DrawnParticipant,
} from "../../domain/entities/Participant";

interface RaffleDB extends DBSchema {
  participants: {
    key: string;
    value: Participant;
  };
  history: {
    key: string;
    value: DrawnParticipant;
    indexes: { byPosition: number };
  };
}

const DB_NAME = "raffle-draw-db";
const DB_VERSION = 1;

export class IndexedDBParticipantRepository implements ParticipantRepository {
  private dbPromise: Promise<IDBPDatabase<RaffleDB>>;

  constructor() {
    this.dbPromise = openDB<RaffleDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("participants")) {
          db.createObjectStore("participants", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("history")) {
          const historyStore = db.createObjectStore("history", {
            keyPath: "id",
          });
          historyStore.createIndex("byPosition", "position");
        }
      },
    });
  }

  async getAllParticipants(): Promise<Participant[]> {
    const db = await this.dbPromise;
    return db.getAll("participants");
  }

  async addParticipants(names: string[]): Promise<void> {
    const db = await this.dbPromise;
    const tx = db.transaction("participants", "readwrite");

    for (const name of names) {
      const participant: Participant = {
        id: crypto.randomUUID(),
        name,
        createdAt: Date.now(),
      };
      await tx.store.add(participant);
    }

    await tx.done;
  }

  async removeParticipant(id: string): Promise<void> {
    const db = await this.dbPromise;
    await db.delete("participants", id);
  }

  async getDrawHistory(): Promise<DrawnParticipant[]> {
    const db = await this.dbPromise;
    const index = db.transaction("history").store.index("byPosition");
    return index.getAll();
  }

  async addToDrawHistory(participant: DrawnParticipant): Promise<void> {
    const db = await this.dbPromise;
    await db.add("history", participant);
  }

  async clearAll(): Promise<void> {
    const db = await this.dbPromise;
    const tx = db.transaction(["participants", "history"], "readwrite");
    await tx.objectStore("participants").clear();
    await tx.objectStore("history").clear();
    await tx.done;
  }
}
