# angular-franchise-web

# Angular Franchise Web

Una aplicación web Angular para gestión de franquicias, completamente containerizada y lista para producción.

## 🚀 Despliegue con Docker

Este proyecto está configurado para desplegarse fácilmente usando Docker, sin necesidad de instalar Node.js o Angular CLI en el servidor de producción.

### Prerrequisitos

- Docker instalado en el servidor
- Acceso al repositorio de GitHub

## 📋 Instrucciones de Despliegue

### 1. Clonar el Repositorio

```bash
git clone https://github.com/sneicast/angular-franchise-web.git
cd angular-franchise-web
```

### 2. Construir la Imagen Docker

```bash
docker build -t angular-franchise-web .
```

Este comando:
- Instala las dependencias de Node.js
- Compila la aplicación Angular para producción
- Configura un servidor Nginx optimizado

### 3. Ejecutar el Contenedor con Auto-Reinicio

```bash
docker run -d --name angular-franchise-web --restart unless-stopped -p 80:80 angular-franchise-web
```

Parámetros:
- `-d`: Ejecuta el contenedor en segundo plano
- `--name`: Asigna un nombre al contenedor
- `--restart unless-stopped`: **Reinicia automáticamente el contenedor** cuando el servidor se reinicia
- `-p 80:80`: Mapea el puerto 80 del host al puerto 80 del contenedor

### ✅ Políticas de Reinicio Disponibles

- `--restart unless-stopped`: **Recomendado** - Reinicia automáticamente excepto cuando se detiene manualmente
- `--restart always`: Reinicia siempre, incluso si se detiene manualmente
- `--restart on-failure`: Reinicia solo si el contenedor falla
- `--restart no`: No reinicia automáticamente (por defecto)

### 4. Verificar el Despliegue

Abre tu navegador web y navega a:
```
http://<IP_DEL_SERVIDOR>
```

Si estás ejecutando localmente, usa:
```
http://localhost
```

## 🔄 Verificar Auto-Reinicio

### Comprobar que el Contenedor se Reinicia Automáticamente

```bash
# Ver el estado del contenedor
docker ps

# Ver la política de reinicio configurada
docker inspect angular-franchise-web | grep -i restart
```

### Probar el Reinicio Automático

```bash
# Reiniciar el servidor (simulación)
sudo reboot

# Después del reinicio, verificar que el contenedor sigue ejecutándose
docker ps
```

## 🛠️ Gestión del Contenedor

### Detener la Aplicación
```bash
docker stop angular-franchise-web
```

### Reiniciar la Aplicación
```bash
docker start angular-franchise-web
```

### Eliminar el Contenedor
```bash
docker rm angular-franchise-web
```

### Ver Logs del Contenedor
```bash
docker logs angular-franchise-web
```

## ⚙️ Configuración

### Variables de Entorno

Antes del despliegue, asegúrate de configurar correctamente el archivo `src/environments/environment.prod.ts` con la URL de tu backend:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://tu-backend-api.com'
};
```

## 🔧 Desarrollo Local

Si necesitas ejecutar el proyecto localmente para desarrollo:

```bash
# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
ng serve
```

## 📝 Notas Importantes

- **No requiere instalación de Node.js o Angular CLI** en el servidor de producción
- La compilación se realiza completamente dentro del contenedor Docker
- El servidor Nginx está optimizado para servir aplicaciones Angular SPA
- La aplicación se ejecuta en modo de producción automáticamente

## 🚨 Solución de Problemas

### El contenedor no inicia
Verifica que Docker esté ejecutándose:
```bash
docker ps
```

### Error de puerto en uso
Si el puerto 80 está ocupado, usa un puerto diferente:
```bash
docker run -d --name angular-franchise-web -p 8080:80 angular-franchise-web
```

### Problemas de conectividad con la API
Revisa la configuración en `environment.prod.ts` y asegúrate de que la URL del backend sea accesible desde el navegador del cliente.

## 📄 Licencia

[Especificar licencia del proyecto]

## 🤝 Contribuciones

[Instrucciones para contribuir al proyecto]

---

**¿Necesitas ayuda?** Abre un issue en el repositorio de GitHub.