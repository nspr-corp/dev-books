---
title: 'Configuración de Red'
author: 'Pedro Martinez'
publishDate: 2024-01-15
description: 'Domina la configuración de red en RHEL: NetworkManager, interfaces de red, DNS, direccionamiento IP y resolución de problemas de conectividad'
category: 'linux'
tags:
    [
        'RHEL',
        'Networking',
        'NetworkManager',
        'IP',
        'DNS',
        'nmcli',
        'Configuración',
        'Interfaces de Red',
    ]
level: 'beginner'
readingTime: 15
status: true
order: 8
---

# Configuración de Red - NetworkManager al Rescate

En esta guía, se exploran los aspectos fundamentales de la configuración y gestión de conexiones de red en Linux, demostrando que es un proceso más accesible de lo que parece.

## 1. Conociendo el Sistema

Para identificar un sistema en la red, existen comandos esenciales:

-   La identificación del nombre del equipo se realiza mediante:

    ```bash
    hostname
    ```

    Para visualizar todas las direcciones IP asignadas:

    ```bash
    hostname -I
    ```

-   El resumen de interfaces se obtiene con:
    ```bash
    ip addr show
    ```

## 2. NetworkManager: El Aliado Principal

NetworkManager actúa como la herramienta central para la gestión de red. Los comandos más utilizados incluyen:

-   Para visualizar todas las conexiones:
    ```bash
    nmcli dev status
    nmcli con show
    ```
-   Para mostrar exclusivamente las conexiones activas:
    ```bash
    nmcli con show --active
    ```

## 3. Configuración de Interfaces de Red

El proceso de creación y configuración de interfaces se realiza de la siguiente manera:

-   Creación de una nueva conexión Ethernet:
    ```bash
    nmcli con add con-name "mi-red" type ethernet ifname eth0
    ```
-   Configuración de una IP estática:
    ```bash
    nmcli con mod "mi-red" \
        ipv4.method manual \
        ipv4.addresses 192.168.1.100/24 \
        ipv4.gateway 192.168.1.1 \
        ipv4.dns "8.8.8.8,8.8.4.4"
    ```
-   Activación de la conexión:
    ```bash
    nmcli con up "mi-red"
    ```

## 3. Trucos Prácticos Fundamentales

1. Verificación de Conectividad:

-   Para probar la resolución DNS:
    ```bash
    host google.com
    ```
-   Para verificar la puerta de enlace:
    ```bash
    ip route show
    ```

2. Gestión de Conexiones:

-   Desactivación de una interfaz:
    ```bash
    nmcli dev disconnect eth0
    ```
-   Reactivación de una interfaz:
    ```bash
    nmcli dev connect eth0
    ```

3. Configuración del Hostname:

-   Visualización del hostname actual:
    ```bash
    hostnamectl
    ```
-   Modificación del hostname:
    ```bash
    sudo hostnamectl set-hostname "new_name"
    ```

## 4. Lista de Verificación Esencial

Al configurar una nueva red, es crucial verificar:

1. El estado de las interfaces:
    ```bash
    nmcli dev status
    ```
2. La configuración IP:
    ```bash
    ip addr show
    ```
3. La configuración DNS:
    ```bash
    cat /etc/resolv.conf
    ```
4. La conectividad básica:
    ```bash
    ping -c 4 8.8.8.8
    ```

## 5. Resolución de Problemas Frecuentes

Para el diagnóstico de problemas, se pueden utilizar los siguientes comandos:

-   Visualización del estado detallado de una conexión:
    ```bash
    nmcli -p con show "nombre-conexion"
    ```
-   Revisión de los logs de NetworkManager:
    ```bash
    journalctl -u NetworkManager
    ```
-   Reinicio de NetworkManager cuando sea necesario:
    ```bash
    sudo systemctl restart NetworkManager
    ```

Esta guía proporciona las herramientas fundamentales para la gestión efectiva de redes en Linux. La siguiente entrega profundizará en aspectos avanzados de la configuración de red y en las mejores prácticas para mantener conexiones seguras.
