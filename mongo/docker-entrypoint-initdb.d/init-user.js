db = db.getSiblingDB("appdb");
db.createUser({
    user: "appuser",
    pwd: "AppUserPass123",
    roles: [{ role: "readWrite", db: "appdb" }]
});
