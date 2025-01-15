---
title: "Control de Acceso a Archivos"
author: "Tu Nombre"
publishDate: 2024-01-15
description: "Gestiona el control de acceso a archivos en RHEL: permisos básicos y avanzados, umask, ACLs y mejores prácticas de seguridad para proteger tus datos"category: "linux"
tags: ["RHEL", "Permisos", "Seguridad", "chmod", "chown", "ACL", "umask", "Archivos"]
level: "beginner"
readingTime: 15
status: true
order: 6
---

# Mi Viaje por Linux: Control de Acceso a Archivos - La Seguridad es lo Primero

¡Hola otra vez, entusiastas de Linux! En la entrada anterior exploramos la gestión de usuarios y grupos. Hoy vamos a sumergirnos en algo igualmente crucial: el control de permisos en archivos y directorios. ¡Es como establecer las reglas de quién puede entrar en cada habitación de nuestra casa digital!

## Los Tres Pilares de Permisos

En Linux, cada archivo tiene tres niveles de permisos:
1. **Usuario (u)**: El dueño del archivo
2. **Grupo (g)**: Los miembros del grupo al que pertenece el archivo
3. **Otros (o)**: Todos los demás usuarios

Y para cada nivel, hay tres tipos de permisos:
- **Lectura (r)**: Ver el contenido
- **Escritura (w)**: Modificar el contenido
- **Ejecución (x)**: Ejecutar el archivo o acceder al directorio

## Interpretando los Permisos

Cuando ejecutamos `ls -l`, vemos algo así:
```bash
-rw-r--r-- 1 nacho developers 1234 Jan 1 12:00 document.txt
```

Desglosémoslo:
```
- rw- r-- r--
│ │   │   │
│ │   │   └── Permisos para otros
│ │   └────── Permisos para grupo
│ └────────── Permisos para usuario
└────────────  Tipo de archivo
```

## Cambiando Permisos: chmod

Hay dos formas de cambiar permisos:

### 1. Método Simbólico
```bash
chmod u+x script.sh    # Dar permiso de ejecución al usuario
chmod g-w archivo.txt  # Quitar permiso de escritura al grupo
chmod o=r archivo.txt  # Establecer solo lectura para otros
```

### 2. Método Octal
```bash
chmod 644 archivo.txt  # rw-r--r--
chmod 755 script.sh    # rwxr-xr-x
```

## Permisos Especiales

Además de los permisos básicos, existen permisos especiales:

1. **SetUID (u+s)**
   ```bash
   chmod u+s program
   # El programa se ejecuta como el propietario
   ```

2. **SetGID (g+s)**
   ```bash
   chmod g+s directory
   # Los nuevos archivos heredan el grupo
   ```

3. **Sticky Bit (o+t)**
   ```bash
   chmod o+t directory
   # Solo el propietario puede borrar archivos
   ```

## La Máscara de Permisos (umask)

El `umask` es como un filtro que determina los permisos predeterminados:
```bash
umask        # Ver máscara actual
umask 022    # Establecer nueva máscara
```

Por defecto:
- Archivos: 666 - umask
- Directorios: 777 - umask

## Ejemplos Prácticos

1. **Configurar un directorio compartido**:
   ```bash
   mkdir /shared
   chmod 775 /shared
   chown :developers /shared
   ```

2. **Hacer un script ejecutable**:
   ```bash
   chmod u+x script.sh
   # o
   chmod 755 script.sh
   ```

3. **Proteger archivos sensibles**:
   ```bash
   chmod 600 ~/.ssh/id_rsa
   ```

## Tips de Seguridad

1. **Usar permisos restrictivos por defecto**:
   ```bash
   umask 027  # Restringe acceso a "otros"
   ```

2. **Revisar permisos regularmente**:
   ```bash
   find /home -type f -perm -0777
   ```

3. **Mantener los permisos especiales bajo control**:
   ```bash
   find / -type f -perm /6000
   ```

