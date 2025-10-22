// mongo/init/init.js

// Conectarse a la base admin
db = db.getSiblingDB('admin');

// Crear usuario admin global (root)
db.createUser({
    user: "adminuser",
    pwd: "AppUserPass12345",
    roles: [{ role: "root", db: "admin" }]
});

// Crear usuario de aplicación con permisos específicos
db = db.getSiblingDB('appdb');

db.createUser({
    user: "appuser",
    pwd: "AppUserPass123",
    roles: [
        { role: "readWrite", db: "appdb" },
        { role: "dbAdmin", db: "appdb" }
    ]
});
