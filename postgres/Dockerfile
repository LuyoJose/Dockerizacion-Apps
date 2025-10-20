# Dockerfile.postgres
FROM postgres:16-alpine

# Usuario y base de datos seguros
ENV POSTGRES_USER=appuser
ENV POSTGRES_PASSWORD=AppUserPass123
ENV POSTGRES_DB=appdb

# Copia configuración y scripts
#COPY ./docker-entrypoint-initdb.d /docker-entrypoint-initdb.d
#COPY ./postgresql.conf /etc/postgresql/postgresql.conf

# Ajusta permisos
RUN chown -R postgres:postgres /docker-entrypoint-initdb.d /etc/postgresql

# Volumen persistente
VOLUME ["/var/lib/postgresql/data"]

# Puerto por defecto
EXPOSE 5432

# Healthcheck con autenticación
HEALTHCHECK --interval=15s --timeout=3s --start-period=10s \
    CMD pg_isready -U appuser -d appdb || exit 1

# Ejecutar como usuario no root
USER postgres

# Entry point oficial
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["postgres"]
