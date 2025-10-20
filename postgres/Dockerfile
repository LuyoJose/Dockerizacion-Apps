# Dockerfile.postgres
FROM postgres:15-alpine

# Variables de entorno seguras (no poner contraseñas reales aquí)
ENV POSTGRES_INITDB_WALDIR=/var/lib/postgresql/data/pgdata

# Copia scripts de inicialización si existen
COPY ./docker-entrypoint-initdb.d /docker-entrypoint-initdb.d

# Copia configuración personalizada (opcional)
COPY ./postgresql.conf /etc/postgresql/postgresql.conf

# Asegurar permisos correctos (solo si cambiaste archivos)
RUN chown -R postgres:postgres /docker-entrypoint-initdb.d /etc/postgresql

# Volumen persistente
VOLUME ["/var/lib/postgresql/data"]

# Puerto por defecto
EXPOSE 5432

# Healthcheck para monitoreo
HEALTHCHECK --interval=15s --timeout=3s --start-period=10s \
    CMD pg_isready -U $POSTGRES_USER -d $POSTGRES_DB || exit 1

# Ejecutar como usuario no root
USER postgres

# Usa el entrypoint oficial
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["postgres"]
