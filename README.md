# 🌱 Ana Tierra Fértil

Proyecto creado con [Next.js](https://nextjs.org) y configurado con [Tailwind CSS v4](https://tailwindcss.com), [shadcn/ui](https://ui.shadcn.com), ESLint y Prettier.

---

## 🚀 Requisitos previos

- Node.js 18 o superior
- npm 9 o superior

---

## 🧩 Instalación

Clona el repositorio y ejecuta:

````bash
npm install

## Ejecutar el Proyecto

```bash
npm run dev

## 🧹 Formato y limpieza del código

El proyecto usa Prettier y ESLint para mantener el código limpio y consistente.

🔹 Formatear código (Prettier)

```bash
npm run format

🔹 Analizar y corregir errores de lint (ESLint)

```bash
npm run lint

🔹 Ejecutar ambos (formato + lint) automáticamente

```bash
npm run fix

Este comando ejecuta npm run format y npm run lint --fix en secuencia.

## 🧱 Componentes UI (shadcn/ui)

El proyecto utiliza shadcn/ui para los componentes de interfaz.

➕ Agregar nuevos componentes

Puedes añadir cualquier componente de shadcn con el siguiente comando (con 'button' de ejemplo):

```bash
npx shadcn@latest add button

Esto descargará el componente y lo colocará automáticamente en la carpeta src/components/ui.

💡 Si no recuerdas el nombre exacto del componente, puedes ver la lista completa en ui.shadcn.com/docs/components

## 📂 Estructura básica

src/
├─ app/               # Páginas y layouts del proyecto
│   ├─ styles/        # Estilos globales (globals.css)
│   └─ page.tsx       # Página principal
├─ components/        # Componentes reutilizables
│   └─ ui/            # Componentes de shadcn
└─ lib/               # Configuración o utilidades (si aplica)

## 🧠 Notas

Tailwind CSS está configurado para usar variables CSS (--background, --foreground, etc.) compatibles con modo claro/oscuro.

## 🛠 Scripts disponibles

| Comando          | Descripción                           |
| ---------------- | ------------------------------------- |
| `npm run dev`    | Inicia el servidor de desarrollo      |
| `npm run format` | Aplica formato con Prettier           |
| `npm run lint`   | Ejecuta ESLint para revisar el código |
| `npm run fix`    | Ejecuta Prettier y ESLint con `--fix` |
````
