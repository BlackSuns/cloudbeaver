ALTER TABLE {table_prefix}CB_AUTH_ATTEMPT
    ADD ERROR_CODE VARCHAR(128) NULL;

ALTER TABLE {table_prefix}CB_AUTH_ATTEMPT
    ADD FORCE_SESSION_LOGOUT CHAR(1) DEFAULT 'N' NOT NULL;