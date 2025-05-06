# Instrucciones para configurar el servidor de producción

## 1. Configuración del entorno

1. Copia el archivo `.env.example` a `.env` y configura las variables de entorno:

```bash
cp .env.example .env
nano .env
```

2. Asegúrate de establecer las siguientes variables en el archivo `.env`:

```
NODE_ENV=production
HTTP_PORT=3000
USE_HTTPS=false
```

## 2. Configuración de Nginx

1. Instala Nginx si aún no lo tienes:

```bash
sudo apt update
sudo apt install nginx
```

2. Crea un archivo de configuración para tu aplicación:

```bash
sudo nano /etc/nginx/sites-available/mcd-register
```

3. Copia el contenido del archivo `nginx-config-example.conf` y ajústalo según tus necesidades.

4. Habilita la configuración:

```bash
sudo ln -s /etc/nginx/sites-available/mcd-register /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 3. Configuración de SSL/TLS

1. Instala Certbot para obtener certificados SSL gratuitos:

```bash
sudo apt install certbot python3-certbot-nginx
```

2. Obtén un certificado para tu dominio:

```bash
sudo certbot --nginx -d tu-dominio.com
```

## 4. Configuración del cliente Socket.IO

En tu aplicación cliente, asegúrate de configurar Socket.IO para conectarse a través de HTTPS:

```javascript
import { io } from 'socket.io-client';

const socket = io('https://tu-dominio.com', {
  path: '/socket.io/',
  transports: ['websocket', 'polling'],
});

socket.on('connect', () => {
  console.log('Conectado al servidor de Socket.IO');
});

socket.on('newNotification', (notification) => {
  console.log('Nueva notificación recibida:', notification);
});
```

## 5. Iniciar la aplicación

1. Instala PM2 para gestionar el proceso de Node.js:

```bash
npm install -g pm2
```

2. Inicia la aplicación:

```bash
pm2 start dist/main.js --name mcd-register
```

3. Configura PM2 para iniciar automáticamente al reiniciar el servidor:

```bash
pm2 startup
pm2 save
```

## Solución de problemas

### Error de conexión de Socket.IO

Si tienes problemas con la conexión de Socket.IO, verifica lo siguiente:

1. Asegúrate de que Nginx esté configurado correctamente para manejar las conexiones de Socket.IO.
2. Verifica que el cliente esté utilizando la URL correcta y las opciones adecuadas.
3. Revisa los logs de la aplicación y de Nginx para identificar posibles errores.

```bash
pm2 logs mcd-register
sudo tail -f /var/log/nginx/error.log
```
