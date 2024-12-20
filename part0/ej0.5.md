```mermaid
graph TD
  A[Inicio] --> B{¿Se ha cargado la página?}
  B -->|Sí| C[Renderizar UI inicial]
  B -->|No| D[Hacer una petición al servidor]
  D --> E{¿Hay respuesta del servidor?}
  E -->|Sí| F[Cargar datos y actualizar UI]
  E -->|No| G[Manejar error]
  F --> C
  G --> H[Mostrar mensaje de error]
  C --> I{¿El usuario navega a una nueva vista?}
  I -->|Sí| J[Hacer una nueva petición al servidor si es necesario]
  I -->|No| K[Esperar interacción del usuario]
  J --> L{¿Hay respuesta del servidor?}
  L -->|Sí| F
  L -->|No| G
  K --> I
  
