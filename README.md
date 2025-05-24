# Baze podataka 3 - Sistem za praćenje proizvodnje alkoholnih pića

Aplikacija za praćenje proizvodnje alkoholnih pića sa klijentskim i serverskim delom.

## Struktura projekta

Repozitorijum sadrži dve glavne komponente:

- `client/` - React aplikacija (korisnički interfejs)
- `server/` - Node.js Express server (backend)

## Tehnologije

### Baza podataka

- PostgreSQL sa pgAdmin 4 SUBP za upravljanje bazom

### Backend

- Node.js sa Express framework-om
- REST API komunikacija sa PostgreSQL bazom

### Frontend

- React + Vite
- Tailwind CSS za stilizovanje

## Uputstvo za pokretanje

### Preduslovi

- Instaliran [Node.js](https://nodejs.org/)
- Instaliran [PostgreSQL](https://www.postgresql.org/) sa pgAdmin 4 ili psql terminalom
- PostgreSQL baza sa šemom `appfinal`

### Koraci za pokretanje

1. **Postavka okruženja**

- Kreirati bazu i importovati backup fajl (biće postavljen kasnije u repozitorijumu)

- U folderu `server` potrebno je kreirati `.env` fajl sa sledećim vrednostima:
  ```
  DB_USER=naziv vašeg korisnika (postgres je defaultni)
  DB_PASSWORD=šifra koju ste postavili za korisnika
  DB_HOST=vaš host (npr localhost)
  DB_PORT=vaš port (verovatno 5432)
  DB_NAME=naziv koji ste dali bazi
  DB_SCHEMA=appfinal
  ```

2. **Pokretanje servera u zasebnom terminalu**

```bash
cd server
npm install
npm run dev
```

2. **Pokretanje klijenta u zasebnom terminalu**

```bash
cd client
npm install
npm run dev
```
