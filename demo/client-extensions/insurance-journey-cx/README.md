# insurance-journey-cx - Liferay React Client Extension

This project was generated using `create-liferay-react-cx`.

## 🚀 Quick Start

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Development**:
   ```bash
   npm run dev
   ```

3. **Deploy to Liferay**:
   ```bash
   # From the project root
   ../../gradlew deploy
   ```

## 🛠 Features

- **React Version**: Chosen during scaffolding.
- **External Dependencies**: React and Clay UI are provided by Liferay (smaller bundles!).
- **Vite Powered**: Instant HMR and optimized builds.


## 📦 Bundling

When you run `npm run build`, Vite will output files to `vite-build/static`. These are the assets that Liferay will serve.

## 📄 Manifest

The `client-extension.yaml` file defines how this extension is registered in Liferay. It includes a `jsImportMapsEntry` which allows you to import this component into any custom fragment easily.

---
*Built with ❤️ using [create-liferay-react-cx](https://github.com/laxitkhanpara/create-liferay-react-cx)*
