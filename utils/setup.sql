CREATE TABLE IF NOT EXISTS organizations (
    org_id TEXT PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS users (
    org_id TEXT NOT NULL,
    user_id TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT CHECK (ROLE IN ('ADMINISTRATOR', 'EMPLOYEE')),

    CONSTRAINT fk_users_org_id
        FOREIGN KEY (org_id) REFERENCES organizations(org_id),

    CONSTRAINT pk_users_org_id_user_id
        PRIMARY KEY (org_id, user_id)
);

CREATE TABLE IF NOT EXISTS skus (
    org_id TEXT NOT NULL,
    sku_id TEXT NOT NULL,
    sku_name TEXT NOT NULL,
    sku_description TEXT DEFAULT NULL,

    CONSTRAINT fk_skus_org_id
        FOREIGN KEY (org_id) REFERENCES organizations(org_id),

    CONSTRAINT pk_users_org_id_sku_id
        PRIMARY KEY (org_id, sku_id)
);