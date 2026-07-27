import initSqlJs, { Database as SqlJsDatabase } from 'sql.js';
import fs from 'fs';
import { DB_PATH } from './config';

let db: SqlJsDatabase | null = null;

export async function connectDB(): Promise<SqlJsDatabase> {
	if (!db) {
		const SQL = await initSqlJs();

		if (fs.existsSync(DB_PATH)) {
			const buffer = fs.readFileSync(DB_PATH);
			db = new SQL.Database(buffer);
		} else {
			db = new SQL.Database();
		}

		db.run(`
		  CREATE TABLE IF NOT EXISTS orders (
		    id INTEGER PRIMARY KEY AUTOINCREMENT,
		    customer_name TEXT NOT NULL,
		    customer_phone TEXT NOT NULL,
		    customer_email TEXT,
		    delivery_method TEXT NOT NULL CHECK (delivery_method IN ('pickup', 'delivery')),
		    delivery_address TEXT,
		    delivery_date TEXT NOT NULL,
		    delivery_time TEXT NOT NULL,
		    comment TEXT,
		    total_price INTEGER NOT NULL,
		    items TEXT NOT NULL,
		    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'processing', 'done')),
		    created_at TEXT DEFAULT CURRENT_TIMESTAMP
		  )
		`);

		db.run(`
		  CREATE TABLE IF NOT EXISTS idempotency_keys (
		    id INTEGER PRIMARY KEY AUTOINCREMENT,
		    key_hash TEXT NOT NULL UNIQUE,
		    response_body TEXT NOT NULL,
		    status_code INTEGER NOT NULL,
		    created_at TEXT DEFAULT CURRENT_TIMESTAMP
		  )
		`);

		db.run(`
		  CREATE INDEX IF NOT EXISTS idx_idempotency_key_hash
		  ON idempotency_keys (key_hash)
		`);
	}

	return db;
}

export function getDB(): SqlJsDatabase {
	if (!db) {
		throw new Error(
			'База данных не подключена. Вызови connectDB() сначала.'
		);
	}

	return db;
}

export function saveDB(): void {
	if (!db) {
		return;
	}

	const data = db.export();
	const buffer = Buffer.from(data);
	fs.writeFileSync(DB_PATH, buffer);
}
