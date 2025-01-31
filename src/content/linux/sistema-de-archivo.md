---
title: 'El Sistema de Archivos'
author: 'Pedro Martinez'
publishDate: 2024-01-15
description: 'Descubre cómo RHEL organiza sus archivos: la estructura de directorios, tipos de enlaces y comandos esenciales para la gestión de archivos'
category: 'RHEL'
tags: ['RHEL', 'Sistema de Archivos', 'Comandos', 'Directorios', 'Enlaces']
level: 'beginner'
readingTime: 15
status: true
order: 2
---

# Árbol Invertido

## 1. El Sistema de Archivos: La Ciudad Linux

El sistema de archivos de Linux presenta una estructura jerárquica organizada que permite una gestión eficiente de datos y recursos del sistema. Esta documentación técnica explora su organización y funcionamiento fundamental.

El sistema de archivos Linux puede visualizarse como una ciudad meticulosamente planificada, donde cada zona tiene un propósito específico. El directorio raíz (/) representa el centro de la ciudad, desde donde se ramifican todas las "calles" y "distritos" especializados:

-   `/bin`: El distrito industrial de la ciudad, donde residen las herramientas y ejecutables fundamentales del sistema. Como una zona industrial bien equipada, contiene todas las herramientas básicas necesarias para el funcionamiento del sistema y la recuperación de emergencia.

-   `/boot`: La central eléctrica de la ciudad. Sin ella, nada arranca. Técnicamente, almacena los archivos críticos para el proceso de arranque, incluyendo el kernel Linux, initrd y el gestor de arranque.

-   `/etc`: El ayuntamiento de la ciudad, donde se centraliza toda la administración. Aquí se almacenan todos los archivos de configuración del sistema y las aplicaciones, actuando como el centro de control administrativo.

-   `/home`: Los barrios residenciales de la ciudad, donde cada usuario tiene su propia "casa". Técnicamente, es el directorio que aloja los datos personales y configuraciones de los usuarios regulares del sistema.

-   `/root`: La mansión del alcalde (superusuario), una residencia especial con privilegios únicos en el sistema.

-   `/tmp`: El área de construcción temporal de la ciudad, donde se pueden crear y destruir estructuras temporales. Los contenidos se eliminan automáticamente durante el reinicio del sistema.

-   `/usr`: El gran centro comercial de la ciudad, repleto de aplicaciones y recursos. Contiene la mayoría del software instalado por el usuario, documentación y recursos compartidos.

-   `/var`: El distrito de almacenes y logística, donde el contenido cambia constantemente. Aloja datos variables como registros del sistema (logs), bases de datos y colas de correo.

## 2. Navegando por la Ciudad Linux: Rutas Absolutas y Relativas

En la ciudad Linux existen dos formas de indicar ubicaciones, similar a cómo se pueden dar direcciones en una ciudad real:

### Rutas Absolutas: Las Coordenadas GPS

Las rutas absolutas son como coordenadas GPS precisas: siempre indican la ubicación exacta desde el centro de la ciudad (directorio raíz /). Técnicamente, se especifican la ubicación absoluta de un archivo o directorio en el sistema:

```bash
/home/nameuser/Documents/file.txt
```

Esta notación puede interpretarse como: "Desde el centro de la ciudad, dirígete al barrio residencial (home), busca la casa del usuario 'nameuser', entra en la habitación 'Documents' y ahí encontrarás 'file.txt'".

### Rutas Relativas: Direcciones desde tu Ubicación Actual

Las rutas relativas son como dar indicaciones desde el punto donde te encuentras actualmente. Técnicamente, especifican ubicaciones en relación con el directorio actual:

```bash
./Documents/file.txt    #Desde aquí, entra en la sala Documents
```

```bash
../photo/vacation.jpg   #Regresa un nivel y busca en la carpeta photos
```

## 3. Directorios Especiales: Referencias de Navegación

El sistema implementa referencias especiales para facilitar la navegación:

-   `.` : Referencia al directorio actual ("aquí mismo")
-   `..` : Referencia al directorio padre ("un nivel arriba")
-   `~` : Referencia al directorio home del usuario actual ("tu casa")

## 4. Comandos de Exploración y Análisis

Los siguientes comandos permiten examinar y analizar la estructura del sistema de archivos:

| Comando | Descripción                                                              |
| ------- | ------------------------------------------------------------------------ |
| `pwd`   | Print Working Directory - Muestra la ruta absoluta del directorio actual |
| `ls`    | List - Muestra el contenido del directorio actual                        |
| `ls -l` | Lista detallada que incluye permisos, propietario, tamaño y fecha        |
| `ls -a` | Muestra todos los archivos, incluyendo los ocultos (que comienzan con .) |

#### Detalles del comando ls

-   `-l`: Formato largo que muestra:
    -   Permisos de archivo (rwx)
    -   Número de enlaces
    -   Propietario y grupo
    -   Tamaño en bytes
    -   Fecha de última modificación
    -   Nombre del archivo
-   `-a`: Incluye entradas que comienzan con punto
-   `-h`: Muestra tamaños en formato humano (KB, MB, GB)
-   `-R`: Lista recursiva de subdirectorios

## 5. Gestión de Directorios y Archivos

Comandos fundamentales para la creación y gestión de estructuras de archivos:

```bash
mkdir [opciones] directorio    # Make Directory - Crea un nuevo directorio
touch [opciones] archivo       # Actualiza timestamps o crea archivos vacíos
mkdir -p ruta/completa        # Crea directorios padre si no existen
```

#### Opciones Importantes de mkdir

-   `-p`: Crea directorios padre si no existen
-   `-m`: Establece permisos del directorio al crearlo
-   `-v`: Modo verbose, muestra cada directorio creado

## 6. Operaciones de Copia y Movimiento

Comandos para la manipulación y transferencia de archivos:

```bash
cp [opciones] origen destino   # Copy - Copia archivos o directorios
mv [opciones] origen destino   # Move - Mueve o renombra archivos
```

#### Opciones Avanzadas de cp

-   `-r`: Copia recursiva de directorios
-   `-p`: Preserva atributos del archivo
-   `-i`: Modo interactivo, solicita confirmación
-   `-u`: Actualiza solo si el origen es más reciente

## 7. Operaciones de Eliminación

Comandos para la eliminación segura de archivos y directorios:

```bash
rm [opciones] archivo         # Remove - Elimina archivos
rmdir directorio             # Remove Directory - Elimina directorios vacíos
rm -r directorio            # Elimina recursivamente directorios y contenido
```

#### Consideraciones de Seguridad

-   `-i`: Solicita confirmación para cada archivo
-   `-f`: Forzar eliminación sin confirmación
-   `-v`: Modo verbose, muestra cada archivo eliminado
-   `-r`: Elimina recursivamente directorios y contenido
-   Se recomienda usar con precaución, especialmente con `-r` y `-f`

## 8. Enlaces Duros (Hard Links)

Los enlaces en Linux son mecanismos que crean referencias o puntos de acceso adicionales a archivos y directorios existentes. Funcionan como un sistema de señalización que puede apuntar a contenido desde múltiples ubicaciones:

Implementación técnica:

```bash
ln archivo_origen enlace_duro
```

Características técnicas:

-   Son diferentes nombres que apuntan al mismo archivo físico en el disco
-   El archivo permanece accesible mientras exista al menos un enlace, incluso si se elimina el nombre original
-   Solo funcionan dentro del mismo disco o partición
-   Solo pueden utilizarse con archivos, no con carpetas
-   El sistema mantiene un registro de cuántos nombres apuntan al mismo archivo

## 9. Enlaces Simbólicos (Soft Links)

Implementación:

```bash
ln -s archivo_origen enlace_simbolico
```

Especificaciones técnicas:

-   Actúan como atajos que señalan la ubicación del archivo original
-   Funcionan entre diferentes discos o particiones
-   Se pueden crear tanto para archivos como para carpetas
-   El tamaño del atajo depende de qué tan larga sea la ruta al archivo original
-   Se mantienen funcionales si el archivo original cambia de ubicación dentro del mismo disco

## 10. Ejercicio Práctico: Gestión de Enlaces

Existen comandos esenciales y las mejores prácticas para una gestión de enlaces avanzados.

| Comando                      | Descripción                                                                                         |
| ---------------------------- | --------------------------------------------------------------------------------------------------- |
| `ls -l \| grep ^l`           | Identifica y lista todos los enlaces simbólicos en el directorio actual                             |
| `readlink <ruta-del-enlace>` | Muestra la ruta de destino a la que apunta el enlace simbólico. Ejemplo: `readlink /usr/bin/python` |
| `stat <archivo/enlace>`      | Muestra información detallada del inodo, incluyendo permisos, timestamps y más                      |
| `find . -type l`             | Busca recursivamente todos los enlaces simbólicos desde el directorio actual                        |

1.  Primero, creemos un directorio de práctica y un archivo:

    -   Crear directorio de trabajo

    ```bash
    mkdir ~/lab_enlaces
    cd ~/lab_enlaces
    ```

    -   Crear un archivo de texto para pruebas

    ```bash
    echo "Este es un archivo de prueba" > archivo_original.txt
    ```

2.  Crear y verificar enlaces simbólicos:

    -   Crear un enlace simbólico al archivo

    ```bash
    ln -s archivo_original.txt enlace1
    ```

    -   Verificar que el enlace se creó correctamente

    ```bash
    ls -l | grep ^l
    ```

    -   Ver el contenido a través del enlace

    ```bash
    cat enlace1
    ```

3.  Explorar información del enlace:

    -   Ver a dónde apunta el enlace

    ```bash
    readlink enlace1
    ```

    -   Ver información detallada

    ```bash
    stat enlace1
    ```

4.  Experimentar con enlaces rotos:

    -   Crear un enlace a un archivo que no existe

    ```bash
    ln -s archivo_no_existe.txt enlace2
    ```

    -   Buscar enlaces rotos

    ```bash
    find . -type l ! -exec test -e {} \; -print
    ```
