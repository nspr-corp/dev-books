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

# Control de Acceso a Archivos - La Seguridad es lo Primero

El sistema de permisos en Linux es como el sistema de seguridad de un edificio, donde diferentes personas tienen diferentes niveles de acceso. Esta guía te ayudará a entender y gestionar estos permisos de manera efectiva.

## 1. Los Tres Pilares de Permisos

En Linux, cada archivo y directorio tiene tres niveles de control de acceso, similar a tener diferentes llaves para diferentes personas:

1. **Usuario (u)**: El dueño del archivo

    - Como el propietario de una casa que tiene todas las llaves
    - Generalmente tiene los máximos privilegios sobre el archivo
    - Puede cambiar los permisos del archivo

2. **Grupo (g)**: Los miembros del grupo

    - Como una familia que comparte ciertos espacios comunes
    - Pueden tener permisos diferentes al dueño
    - Útil para proyectos compartidos

3. **Otros (o)**: Todos los demás usuarios
    - Como visitantes en un edificio
    - Típicamente tienen los permisos más restrictivos
    - Importante para la seguridad del sistema

## 2. Tipos de Permisos Básicos

Cada nivel tiene tres tipos de permisos fundamentales:

-   **Lectura (r = 4)**

    -   Para archivos: Ver el contenido
    -   Para directorios: Listar el contenido
    -   Ejemplo de permiso de solo lectura

        ```bash
        chmod 444 archivo.txt  
        ```
        Todos pueden leer, nadie puede modificar

-   **Escritura (w = 2)**

    -   Para archivos: Modificar el contenido
    -   Para directorios: Crear/eliminar archivos

    -   Dar permisos de escritura al grupo
        ```bash
        chmod g+w archivo.txt
        ```

-   **Ejecución (x = 1)**
    -   Para archivos: Ejecutar como programa
    -   Para directorios: Acceder al contenido
    -   Hacer ejecutable un script

        ```bash
        chmod +x script.sh
        ```

## 3. Interpretando los Permisos en Detalle

Cuando usamos `ls -l`, vemos una estructura como esta:

```bash
-rw-r--r-- 1 nacho developers 1234 Jan 1 12:00 document.txt
drwxr-xr-x 2 nacho developers 4096 Jan 1 12:00 scripts/
```

Desglose completo:

```
Tipo    Usuario  Grupo   Otros   Enlaces  Dueño   Grupo    Tamaño  Fecha   Nombre
d       rwx      r-x     r-x     2        nacho   devs     4096    Jan 1   scripts/
-       rw-      r--     r--     1        nacho   devs     1234    Jan 1   doc.txt
```

## 4. Ejemplo Práctico de Interpretación:
Ver permisos actuales
```bash
ls -l archivo.txt
-rw-r--r-- 1 nacho developers 1234 Jan 1 12:00 archivo.txt
```

- El primer '-' indica un archivo regular
- 'rw-' → El usuario puede leer y escribir
- 'r--' → El grupo solo puede leer
- 'r--' → Otros solo pueden leer