---
title: "Gestión de Usuarios y Grupos"
author: "Tu Nombre"
publishDate: 2024-01-15
description: "Domina la administración de usuarios y grupos en RHEL: creación y gestión de cuentas, permisos, grupos y mejores prácticas de seguridad"category: "linux"
tags: ["RHEL", "Usuarios", "Grupos", "Seguridad", "Administración", "root", "sudo"]
level: "beginner"
readingTime: 15
status: true
order: 5
---

# Gestión de Usuarios y Grupos en Linux: Control de Acceso y Seguridad

La gestión de usuarios y grupos constituye un pilar fundamental en la administración y seguridad de sistemas Linux, proporcionando un marco robusto para el control de acceso y la compartición de recursos.

## 1. Sistema de Usuarios en Linux

El sistema de usuarios en Linux puede compararse con una estructura organizacional donde cada entidad tiene roles, permisos y espacios definidos. Cada usuario posee:

-   Identificador único (UID)
-   Credenciales de autenticación
-   Directorio personal (/home/usuario)
-   Shell predeterminada
-   Conjunto de permisos específicos

### Categorías de Usuarios

1. **Usuario Root (UID 0)**:

    - Control total del sistema
    - Acceso irrestricto a recursos
    - Capacidad de modificar configuraciones críticas

2. **Usuarios del Sistema (UID 1-999)**:

    - Destinados a servicios y demonios
    - Acceso limitado a recursos específicos
    - Generalmente sin shell interactiva

3. **Usuarios Regulares (UID 1000+)**:
    - Cuentas de usuario final
    - Acceso restringido a recursos personales
    - Shell interactiva para operaciones normales

## 2. Estructura de Datos de Usuario

### *Archivo /etc/passwd*
Este archivo es como el directorio principal de usuarios del sistema. Cada línea representa a un usuario y contiene información vital separada por dos puntos:

```bash
cat /etc/passwd

username:x:1000:1000:comentario:/home/username:/bin/bash
|        | |    |    |          |              |
|        | |    |    |          |              └─ Shell
|        | |    |    |          └──────────────── Directorio home
|        | |    |    └─────────────────────────── Comentario/Nombre completo
|        | |    └────────────────────────────────── GID primario
|        | └───────────────────────────────────────── UID
|        └─────────────────────────────────────────── Marcador de contraseña
└────────────────────────────────────────────────────── Nombre de usuario
```

### Archivo /etc/shadow
Este archivo es como la caja fuerte del sistema, donde se almacenan las contraseñas y las políticas de seguridad de cada usuario.
```bash
cat /etc/shadow

username:$6$xyz..:18000:0:99999:7:0:18500:
|        |       |     | |     | | |     |
|        |       |     | |     | | |     └─ Campo reservado
|        |       |     | |     | | └─────── Fecha de expiración
|        |       |     | |     | └───────── Días de inactividad
|        |       |     | |     └─────────── Días para avisar
|        |       |     | └─────────────────── Máximo días válidos
|        |       |     └───────────────────── Mínimo días cambio
|        |       └─────────────────────────── Último cambio (días desde 1/1/1970)
|        └───────────────────────────────────── Hash de la contraseña
└──────────────────────────────────────────────── Nombre de usuario
```
Por ejemplo, si vemos esta línea:
```bash
juan:$6$xyz..:18734:0:99999:7:30:18900:
```
Significa que:

-   juan: El usuario al que pertenece esta configuración
-   $6$xyz..: La contraseña encriptada (siempre empieza con $6$ en sistemas modernos)
-   18734: La contraseña se cambió el día 18734 desde 1/1/1970
-   0: Puede cambiar su contraseña en cualquier momento
-   99999: Debe cambiar su contraseña antes de 99999 días
-   7: Recibirá avisos 7 días antes de que expire su contraseña
-   30: La cuenta se bloqueará después de 30 días sin uso
-   18900: La cuenta expirará en el día 18900 desde 1/1/1970

## 3. Sistema de Grupos

Los grupos facilitan la administración de permisos colectivos y el acceso compartido a recursos.

### Estructura de Grupos

-   **Grupo Primario**: Asignación principal del usuario
-   **Grupos Secundarios**: Membresías adicionales

### *Archivo /etc/group*

```bash
cat /etc/group

groupname:x:1001:user1,user2,user3
|         | |    |
|         | |    └─ Miembros del grupo
|         | └──────── GID
|         └────────── Marcador de contraseña
└───────────────────── Nombre del grupo
```

## 4. Comandos de Administración

### Gestión de Usuarios

- Creación de usuarios

    ```bash
    useradd -m -s /bin/bash -c "Comentario" username
    ```

- Usuario de sistema

    ```bash
    useradd -r -s /sbin/nologin serviceuser    
    ```

# Modificación de usuarios
- Agregar a grupo

    ```bash
    usermod -aG groupname username    
    ```
- Bloquear cuenta

    ```bash
    usermod -L username              
    ```
- Desbloquear cuenta
    ```bash
    usermod -U username              
    ```

# Eliminación de usuarios
```bash
userdel -r username              # Eliminar usuario y directorio home
```

### Gestión de Grupos

```bash
# Creación y modificación
groupadd groupname               # Crear grupo
groupmod -n newname oldname      # Renombrar grupo
groupdel groupname               # Eliminar grupo

# Gestión de membresía
gpasswd -a username groupname    # Agregar usuario
gpasswd -d username groupname    # Eliminar usuario
```

### Gestión de Contraseñas

```bash
# Configuración de contraseñas
passwd username                  # Cambiar contraseña
chage -l username               # Ver política de contraseña
chage -M 90 -m 7 -W 7 username  # Configurar política
```

## 5. Prácticas de Seguridad

### Elevación de Privilegios

```bash
# Configuración de sudo
visudo                          # Editar configuración sudo
sudo -l                         # Listar permisos sudo
```

### Monitoreo de Accesos

```bash
# Herramientas de auditoría
last                            # Inicios de sesión exitosos
lastb                           # Intentos fallidos
who                            # Usuarios actuales
w                              # Usuarios y actividad
```

## 6. Configuraciones Avanzadas

### Shell Restringida

```bash
# Configuración de shell no interactiva
usermod -s /sbin/nologin username
```

### Política de Contraseñas

```bash
# Archivo /etc/login.defs
PASS_MAX_DAYS   90
PASS_MIN_DAYS   7
PASS_WARN_AGE   7
```


## 7. Tabla de Modificadores de Comandos
| Modificador | Descripción | Ejemplo de Uso |
|-------------|-------------|----------------|
| -m | Crea el directorio home | useradd -m juan |
| -r | Crea usuario del sistema | useradd -r servicio |
| -s | Especifica el shell | useradd -s /bin/bash juan |
| -c | Añade un comentario | useradd -c "Juan Pérez" juan |
| -d | Especifica directorio home | useradd -d /home/juan juan |
| -e | Fecha de expiración | useradd -e 2024-12-31 juan |
| -f | Días después de expirar contraseña | useradd -f 7 juan |
| -g | Grupo primario | useradd -g ventas juan |
| -G | Grupos secundarios | useradd -G admin,dev juan |
| -l | Bloquea la cuenta | usermod -l juan |
| -U | Desbloquea la cuenta | usermod -U juan |
| -L | Lista la política de contraseña | chage -l juan |
| -M | Máximo días validez contraseña | chage -M 90 juan |
| -W | Días de aviso antes de expirar | chage -W 7 juan |
| -a | Añade a un grupo (con -G) | usermod -aG ventas juan |

## 8. Mejores Prácticas

1. **Seguridad del Superusuario**:

    - Limitar acceso directo a root
    - Implementar sudo con restricciones
    - Auditar uso de privilegios elevados

2. **Gestión de Cuentas**:

    - Documentar creación/eliminación
    - Revisar permisos periódicamente
    - Mantener grupos organizados

3. **Monitoreo y Mantenimiento**:
    - Auditar accesos regularmente
    - Actualizar políticas de contraseñas
    - Realizar respaldos de archivos críticos