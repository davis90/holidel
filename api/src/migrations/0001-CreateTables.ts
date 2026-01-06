import {MigrationInterface, QueryRunner} from 'typeorm';

const createNursesTable = async (queryRunner: QueryRunner) => {
  return await queryRunner.query(`
    DROP TYPE IF EXISTS nurse_status;
    CREATE TYPE nurse_status AS ENUM ('titular', 'associate', 'collaborator');
    CREATE TABLE IF NOT EXISTS nurses (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      first_name VARCHAR(60) NOT NULL,
      last_name VARCHAR(60) NOT NULL,
      status nurse_status NOT NULL,
      authorized_department NUMERIC(2)[] NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      description TEXT,
      start_activity_date TIMESTAMPTZ NOT NULL,
      phone_number VARCHAR(20) NOT NULL,
      created_at TIMESTAMPTZ DEFAULT now(),
      edited_at TIMESTAMPTZ DEFAULT now()
    );`
  )
}
const createUsersTable = async (queryRunner: QueryRunner) => {
  return await queryRunner.query(`
    CREATE TABLE IF NOT EXISTS users (
      nurse_id UUID PRIMARY KEY REFERENCES nurses NOT NULL,
      connection_id UUID,
      password text NOT NULL,
      active boolean DEFAULT false,
      created_at TIMESTAMPTZ DEFAULT now(),
      edited_at TIMESTAMPTZ DEFAULT now()
    );
  `)
}
const createPostalAddressesTable = async (queryRunner: QueryRunner) => {
  return await queryRunner.query(`
    CREATE TABLE IF NOT EXISTS postal_addresses (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      additional_building text NOT NULL,
      address text NOT NULL,
      additional_address text NOT NULL,
      postal_code NUMERIC(5, 0) NOT NULL,
      city text NOT NULL,
      cedex NUMERIC(5, 0) NOT NULL,
      country text NOT NULL,
      created_at TIMESTAMPTZ DEFAULT now(),
      edited_at TIMESTAMPTZ DEFAULT now()
    );
  `)
}
const createCerticatesTable = async (queryRunner: QueryRunner) => {
  return await queryRunner.query(`
    CREATE TABLE IF NOT EXISTS certificates (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      nurse_id UUID REFERENCES nurses NOT NULL,
      label text NOT NULL,
      postal_address_id UUID REFERENCES postal_addresses NOT NULL,
      date_graduation TIMESTAMPTZ NOT NULL,
      created_at TIMESTAMPTZ DEFAULT now(),
      edited_at TIMESTAMPTZ DEFAULT now()
    );
  `)
}
const createDiplomasTable = async (queryRunner: QueryRunner) => {
  return await queryRunner.query(`
    CREATE TABLE IF NOT EXISTS diplomas (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      nurse_id UUID REFERENCES nurses NOT NULL,
      label text NOT NULL,
      postal_address_id UUID REFERENCES postal_addresses NOT NULL,
      date_graduation TIMESTAMPTZ NOT NULL,
      created_at TIMESTAMPTZ DEFAULT now(),
      edited_at TIMESTAMPTZ DEFAULT now()
    );
  `)
}
const createOfficesTable = async (queryRunner: QueryRunner) => {
  return await queryRunner.query(`
    CREATE TABLE IF NOT EXISTS offices (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      nurse_id UUID REFERENCES nurses NOT NULL,
      label text NOT NULL,
      postal_address_id UUID REFERENCES postal_addresses NOT NULL,
      date_graduation TIMESTAMPTZ NOT NULL,
      created_at TIMESTAMPTZ DEFAULT now(),
      edited_at TIMESTAMPTZ DEFAULT now()
    );
  `)
}
const createOffersTable = async (queryRunner: QueryRunner) => {
  return await queryRunner.query(`
    DROP TYPE IF EXISTS offer_type_dates;
    CREATE TYPE offer_type_dates AS ENUM ('list', 'interval');
    CREATE TABLE IF NOT EXISTS offers (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      nurse_id UUID REFERENCES nurses NOT NULL,
      period TIMESTAMPTZ[2] NOT NULL,
      nb_days_min NUMERIC(4, 0) NOT NULL,
      nb_days_max NUMERIC(4, 0) NOT NULL,
      retrocession_rate NUMERIC(2, 0) NOT NULL,
      average_technical_care_day NUMERIC(3, 0),
      average_kilometers_day NUMERIC(4, 0),
      average_consultations_day NUMERIC(3, 0),
      created_at TIMESTAMPTZ DEFAULT now(),
      edited_at TIMESTAMPTZ DEFAULT now()
    );
  `)
}
const createTokenBlacklistTable = async (queryRunner: QueryRunner) => {
  return await queryRunner.query(`
    CREATE TABLE IF NOT EXISTS token_blacklist (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      token TEXT UNIQUE NOT NULL,
      expires_at TIMESTAMPTZ NOT NULL,
      blacklisted_at TIMESTAMPTZ DEFAULT now(),
      created_at TIMESTAMPTZ DEFAULT now()
    );
    CREATE INDEX IF NOT EXISTS idx_token_blacklist_expires_at ON token_blacklist(expires_at);
  `)
}

export class CreateTables1763780304865 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await createNursesTable(queryRunner)
    await createUsersTable(queryRunner)
    await createPostalAddressesTable(queryRunner)
    await createCerticatesTable(queryRunner)
    await createDiplomasTable(queryRunner)
    await createOfficesTable(queryRunner)
    await createOffersTable(queryRunner)
    await createTokenBlacklistTable(queryRunner)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS users, nurses, postal_addresses, offers, offices, certificates, diplomas, token_blacklist;`)
  }
}