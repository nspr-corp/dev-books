---
title: "Configuración de Red"
author: "Pedro Martinez"
publishDate: 2024-01-15
description: "Domina la configuración de red en RHEL: NetworkManager, interfaces de red, DNS, direccionamiento IP y resolución de problemas de conectividad"
category: "linux"
tags: ["RHEL", "Networking", "NetworkManager", "IP", "DNS", "nmcli", "Configuración", "Interfaces de Red"]
level: "beginner"
readingTime: 15
status: true
order: 8
---

# Mi Viaje por Linux: Dominando la Configuración de Red - NetworkManager al Rescate

¡Hola de nuevo, aventureros de Linux! En nuestra última entrada exploramos los fundamentos de las redes. Hoy quiero compartir mis descubrimientos sobre cómo configurar y gestionar las conexiones de red en Linux. ¡Es más fácil de lo que parece!

## Conociendo Nuestro Sistema

Lo primero que aprendí fue a identificar mi sistema en la red:

```bash
# Ver el nombre de nuestro equipo
hostname
hostname -I  # Ver todas nuestras direcciones IP

# Ver un resumen de nuestras interfaces
ip addr show
```

## NetworkManager: Nuestro Mejor Amigo

NetworkManager es la herramienta que hace toda la magia. Aquí están los comandos que más uso:

```bash
# Ver todas nuestras conexiones
nmcli dev status
nmcli con show

# Mostrar solo las conexiones activas
nmcli con show --active
```

## Configurando Interfaces de Red

He aquí cómo crear y configurar interfaces (esto me salvó la vida más de una vez):

```bash
# Crear una nueva conexión Ethernet
nmcli con add con-name "mi-red" type ethernet ifname eth0

# Configurar una IP estática
nmcli con mod "mi-red" \
    ipv4.method manual \
    ipv4.addresses 192.168.1.100/24 \
    ipv4.gateway 192.168.1.1 \
    ipv4.dns "8.8.8.8,8.8.4.4"

# Activar la conexión
nmcli con up "mi-red"
```

## Trucos Prácticos que he Aprendido

1. **Verificar Conectividad Rápidamente**:
```bash
# Probar la resolución DNS
host google.com

# Verificar nuestra puerta de enlace
ip route show
```

2. **Gestionar Conexiones**:
```bash
# Desactivar una interfaz
nmcli dev disconnect eth0

# Reactivar una interfaz
nmcli dev connect eth0
```

3. **Configuración del Hostname**:
```bash
# Ver nuestro hostname actual
hostnamectl

# Cambiar el hostname
sudo hostnamectl set-hostname "new_name"
```

## Mi Lista de Verificación Personal

Cuando configuro una nueva red, siempre reviso:

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

## Resolución de Problemas Comunes

Si algo no funciona, estos comandos me ayudan a diagnosticar:

```bash
# Ver el estado detallado de una conexión
nmcli -p con show "nombre-conexion"

# Ver los logs de NetworkManager
journalctl -u NetworkManager

# Reiniciar NetworkManager si es necesario
sudo systemctl restart NetworkManager
```

*¿Te ha resultado útil esta guía? En la próxima entrada exploraremos la configuración avanzada de red y cómo mantener conexiones seguras. ¡No te lo pierdas!*