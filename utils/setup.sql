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
    sku_value INTEGER DEFAULT 0,

    CONSTRAINT fk_skus_org_id
        FOREIGN KEY (org_id) REFERENCES organizations(org_id),

    CONSTRAINT pk_skus_org_id_sku_id
        PRIMARY KEY (org_id, sku_id)
);

CREATE TABLE IF NOT EXISTS org_warehouses (
    org_id TEXT NOT NULL,
    warehouse_id TEXT NOT NULL,

    CONSTRAINT fk_warehouses_org_id
        FOREIGN KEY (org_id) REFERENCES organizations(org_id),

    CONSTRAINT pk_org_warehouses_org_id_warehouse_id
        PRIMARY KEY (org_id, warehouse_id)
);

CREATE TABLE IF NOT EXISTS warehouse_items (
    org_id TEXT NOT NULL,
    warehouse_id TEXT NOT NULL,
    sku_id TEXT NOT NULL,
    quantity INTEGER DEFAULT 1,

    CONSTRAINT fk_warehouse_items_org_id
        FOREIGN KEY (org_id) REFERENCES organizations(org_id),

    CONSTRAINT fk_warehouse_items_warehouse_id
        FOREIGN KEY (org_id, warehouse_id) REFERENCES org_warehouses,

    CONSTRAINT fk_warehouse_items_sku_id
        FOREIGN KEY (org_id, sku_id) REFERENCES skus
);

CREATE TABLE IF NOT EXISTS warehouse_logs (
    org_id TEXT NOT NULL,
    sku_id TEXT NOT NULL,
    action TEXT CHECK ( action IN ('UPDATE', 'TRANSFER') ),
    quantity_change INTEGER NOT NULL,
    source_warehouse TEXT,
    destination_warehouse TEXT,
    timestamp TIMESTAMP WITH TIME ZONE,

    CONSTRAINT fk_warehouse_logs_org_id
        FOREIGN KEY (org_id) REFERENCES organizations(org_id),

    CONSTRAINT fk_warehouse_logs_sku_id
        FOREIGN KEY (org_id, sku_id) REFERENCES skus(org_id, sku_id),

    CONSTRAINT fk_warehouse_logs_src_warehouse
        FOREIGN KEY (org_id, source_warehouse) REFERENCES org_warehouses(org_id, warehouse_id),

    CONSTRAINT fk_warehouse_logs_dst_warehouse
        FOREIGN KEY (org_id, destination_warehouse) REFERENCES org_warehouses(org_id, warehouse_id)

);