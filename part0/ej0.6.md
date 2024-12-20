```mermaid
graph TD
  A[Inicio] --> B[Mostrar lista]
  B --> C[Mostrar botón "Agregar"]
  C --> D{¿El usuario hace clic en "Agregar"?}
  D -->|Sí| E[Solicitar entrada del usuario]
  D -->|No| F[Esperar interacción del usuario]
  E --> G{¿El usuario ingresa un valor?}
  G -->|Sí| H[Añadir elemento a la lista]
  G -->|No| I[Manejar error o mostrar mensaje de entrada vacía]
  H --> B
  I --> B
  F --> D
