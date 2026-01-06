# Holidel API (Node.js + TypeScript)

Project minimal pour démarrer une API Node.js/TypeScript qui interroge une base SQL (Postgres recommandé).

Installation (PowerShell):

```powershell
cd api
npm install
cp .env.example .env
# Éditez .env et mettez la bonne DATABASE_URL, p.ex.:
# DATABASE_URL=postgres://user:password@localhost:5432/holidel_db

npm run dev
```

Commandes utiles:
- `npm run dev` : démarre en mode développement (ts-node-dev)
- `npm run build` : compile TypeScript dans `dist/`
- `npm start` : démarre le build compilé

Endpoint exemple:
- `GET /users` : retourne toutes les lignes de la table `users` (assurez-vous que la table existe)

Migrations TypeORM
 - Pour exécuter les migrations et initialiser la base :

```powershell
cd api
npm install
cp .env.example .env
# Éditez .env et définissez DATABASE_URL
npm run db:init
```

 - Pour annuler la dernière migration :

```powershell
npm run typeorm:revert
```

Remarques:
 - Le projet est configuré pour utiliser les migrations (`synchronize` est désactivé). La première migration fournie crée la table `users`.
 - Les scripts utilisent `ts-node` pour exécuter des scripts TypeScript. Assurez-vous d'avoir installé les dépendances de développement.

Exemple SQL pour Postgres:

```sql
CREATE TABLE users (
  id serial primary key,
  name text not null,
  email text unique not null,
  created_at timestamptz default now()
);

INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com');
```

Notes:
- Le projet utilise `knex` + `pg`. Remplacez la `DATABASE_URL` selon votre base (MySQL, SQLite, ...)
- Vous pouvez remplacer Knex par Prisma ou TypeORM si vous préférez un ORM
