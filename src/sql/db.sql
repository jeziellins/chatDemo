-- Database: chat

-- DROP DATABASE IF EXISTS chat;

CREATE DATABASE chat
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Portuguese_Brazil.1252'
    LC_CTYPE = 'Portuguese_Brazil.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
	
	
-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    "Id" uuid NOT NULL,
    "Name" character varying(200) COLLATE pg_catalog."default" NOT NULL,
    "Email" character varying(100) COLLATE pg_catalog."default" NOT NULL,
    "PasswordHash" character varying(200) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT chats_pkey PRIMARY KEY ("Id"),
    CONSTRAINT uk_email UNIQUE ("Email")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;
	

-- Table: public.messages

-- DROP TABLE IF EXISTS public.messages;

CREATE TABLE IF NOT EXISTS public.messages
(
    "Id" uuid NOT NULL,
    "ReceiveAt" timestamp without time zone NOT NULL,
    "SourceUserId" uuid NOT NULL,
    "TargetUserId" uuid NOT NULL,
    "Text" character varying(250) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT messages_pkey PRIMARY KEY ("Id")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.messages
    OWNER to postgres;