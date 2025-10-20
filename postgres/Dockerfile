# Dockerfile.postgres
FROM postgres:15-alpine

# Copia scripts de inicializacion (si los tienes)
COPY ./docker-entrypoint-initdb.d /docker-entrypoint-initdb.d

# Ajustes de configuración (opcional)
COPY ./postgresql.conf /etc/postgresql/postgresql.conf

# Variables recomendadas (no poner secrets aquí)
ENV POSTGRES_INITDB_WALDIR=/var/lib/postgresql/data/pgdata

VOLUME ["/var/lib/postgresql/data"]

EXPOSE 5432

# Healthcheck
HEALTHCHECK --interval=15s --timeout=3s --start-period=10s \
    CMD pg_isready -U $POSTGRES_USER -d $POSTGRES_DB || exit 1

# Entrypoint deja el entrypoint oficial
