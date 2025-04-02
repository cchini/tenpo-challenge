
# Tenpo Challenge 🎯

## Descripción 📖

Este es un proyecto de ejemplo para mostrar cómo manejar la arquitectura de una aplicación frontend, consumir microservicios, y gestionar datos utilizando tecnologías como **React**, **TypeScript**, **React Query**, y más. El proyecto incluye una página de inicio de sesión (**Login**) y una vista con una lista de datos obtenidos de una API.

## Propósito 🎯

El propósito de este proyecto es crear una pequeña aplicación que simula el uso de microservicios con el backend simulado usando **Stubby** y el frontend desarrollado en **React**. Se enfoca en el manejo de datos, optimización de la aplicación, y la correcta configuración de microservicios y permisos.

## ¿Qué problema resuelve? 💡

Este proyecto busca ofrecer una demostración simple pero efectiva sobre cómo gestionar un sistema de microservicios con un enfoque frontend. Abarca el consumo de APIs, la gestión del estado de la aplicación, la optimización con **React Query**, y la integración de múltiples aplicaciones en un único repositorio.

## Tecnologías principales ⚙️

- **React**
- **TypeScript**
- **React Query**
- **Single-spa** (para microfrontends)
- **RxJS**
- **SCSS (modules)**
- **Webpack**
- **Stubby** (para simular el backend)
- **i18n** (internacionalización)
- **Lerna** (gestión de monorepos)

## Requisitos 🛠️

Antes de empezar, asegúrate de tener instaladas las siguientes versiones:

- **pnpm**: `v8.10.0`  
- **Node.js**: `v20.17.0`  


## Instalación

1.  Clona el repositorio:
    
    `git clone <repositorio> cd <carpeta_del_proyecto>` 
    
2.  Ejecuta la instalación de dependencias con `pnpm`:
    
    `pnpm install`

3.   Levanta el **backend** utilizando `stubby`:

 - Dirígete al directorio `tenpo-services`:
  ```
    cd packages/tenpo-services
    pnpm run start:stubby` 
  ```
        
4.   Levanta el **frontend**:
    
  - Dirígete al directorio del frontend:
  ```
    cd packages/tenpo-app
    pnpm run start
  ```
    
  - Esto iniciará el servidor de desarrollo para el frontend.
    
  - Para probar, selecciona las aplicaciones que deseas levantar, como `home`, `login`, y `header`. Se recomienda levantar las tres aplicaciones.

# Variables de Entorno 🌍

El proyecto requiere que se configuren algunas variables de entorno en los siguientes paquetes:

## tenpo-app
```bash
HOST_DEV=tenpo.localhost
REACT_APP_IDENTITY_API=http://localhost:8200/identity.dev.tenpo.cl
```

## tenpo-services
```bash
REACT_APP_IDENTITY_API=http://localhost:8200/identity.dev.tenpo.cl
REACT_APP_COINGEKO_API=https://api.coingecko.com
REACT_APP_RANDOM_USER_API=https://randomuser.me
```

## tenpo-states
```bash
REACT_APP_SECRET_KEY=TENPO
```


# Iniciar Proyecto en Desarrollo 🚀

Para iniciar el proyecto en modo desarrollo, puedes ejecutar el siguiente comando:

`pnpm start`


# Rutas de Acceso 🛣️

Para acceder a la aplicación, puedes utilizar la siguiente ruta:

-   **Login**: [http://tenpo.localhost:9000/login](http://tenpo.localhost:9000/home/list)

-   **Lista de usuarios (home)**: [http://tenpo.localhost:9000/home/list](http://tenpo.localhost:9000/home/list)
-   **Crear usuario (home)**: [http://tenpo.localhost:9000/home/create](http://tenpo.localhost:9000/home/list)
    

## Configuración del archivo de hosts 🌍

Si no puedes acceder a la aplicación a través de `tenpo.localhost`, es posible que necesites configurar el archivo **hosts** de tu máquina para que apunte a `localhost`.

### En sistemas **Linux** o **macOS**:

1.  Abre el archivo `/etc/hosts` como superusuario. Puedes hacerlo con el siguiente comando:
    
    `sudo nano /etc/hosts` 
    
2.  Agrega la siguiente línea al final del archivo:
    
    `127.0.0.1 tenpo.localhost` 
    
3.  Guarda los cambios y cierra el archivo.
    
4.  Reinicia tu navegador para que los cambios tengan efecto.
    

### En **Windows**:

1.  Abre el archivo `C:\Windows\System32\drivers\etc\hosts` con permisos de administrador en un editor de texto.
    
2.  Agrega la siguiente línea al final del archivo:
    
    `127.0.0.1 tenpo.localhost` 
    
3.  Guarda los cambios y cierra el archivo.
    
4.  Reinicia tu navegador para que los cambios tengan efecto.


----------

# Roles de Usuario y Permisos Especiales 🔑

El sistema de permisos habilita funcionalidades dentro de la aplicación. Actualmente, el usuario tiene acceso solo a ciertas rutas. Puedes ver los permisos de un usuario en el archivo del stub:

`packages/tenpo-services/src/stubs/identity/user/account-200.json`

Por ejemplo, un usuario puede tener acceso solo a la lista de usuarios (`tenpo:home:list`). Si intentas acceder a la ruta de creación (`/home/create`), el acceso será denegado.

Para otorgar acceso a esta ruta, puedes agregar el siguiente permiso:

`"tenpo:home:create"`


# Ingreso con Login 🔑

El acceso a la aplicación se realiza con el siguiente usuario y password:
```
  usuario: user@tenpo.cl
  contraseña: user1234
```

Estas credenciales te permitirán ingresar al sistema.