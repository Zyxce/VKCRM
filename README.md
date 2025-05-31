<<<<<<< HEAD
# VKCRM
=======
# My React project template

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

```
36-VK-CRM
├─ db.json
├─ package-lock.json
├─ package.json
├─ public
│  ├─ about.txt
│  ├─ android-chrome-192x192.png
│  ├─ android-chrome-512x512.png
│  ├─ apple-touch-icon.png
│  ├─ favicon-16x16.png
│  ├─ favicon-32x32.png
│  ├─ favicon.ico
│  ├─ index.html
│  └─ site.webmanifest
├─ README.md
├─ src
│  ├─ api
│  │  └─ index.ts
│  ├─ components
│  │  ├─ App.tsx
│  │  ├─ DataTable
│  │  │  ├─ DataTable.tsx
│  │  │  ├─ EditableCell.tsx
│  │  │  ├─ RowActions.tsx
│  │  │  └─ TableRow.tsx
│  │  ├─ EditRecordForm.tsx
│  │  ├─ RecordForm.tsx
│  │  └─ UI
│  │     ├─ Button.tsx
│  │     ├─ FormInput.tsx
│  │     ├─ Modal.tsx
│  │     ├─ TableBottom.tsx
│  │     └─ TableHeader.tsx
│  ├─ config
│  │  └─ fieldsConfig.ts
│  ├─ global.d.ts
│  ├─ hooks
│  │  └─ useInfiniteScroll.ts
│  ├─ index.tsx
│  ├─ setupTests.ts
│  ├─ store
│  │  └─ useRecordsStore.ts
│  ├─ styles
│  │  ├─ base
│  │  │  ├─ normalize.css
│  │  │  ├─ variables.css
│  │  │  ├─ variables.css.map
│  │  │  └─ variables.sass
│  │  ├─ components
│  │  │  ├─ App.css
│  │  │  ├─ App.css.map
│  │  │  ├─ App.sass
│  │  │  ├─ DataTable
│  │  │  │  ├─ DataTable.module.css
│  │  │  │  ├─ DataTable.module.css.map
│  │  │  │  ├─ DataTable.module.sass
│  │  │  │  ├─ RowActions.module.css
│  │  │  │  ├─ RowActions.module.css.map
│  │  │  │  └─ RowActions.module.sass
│  │  │  ├─ RecordForm.module.css
│  │  │  ├─ RecordForm.module.css.map
│  │  │  ├─ RecordForm.module.sass
│  │  │  └─ UI
│  │  │     ├─ Button.module.css
│  │  │     ├─ Button.module.css.map
│  │  │     ├─ Button.module.sass
│  │  │     ├─ FormInput.module.css
│  │  │     ├─ FormInput.module.css.map
│  │  │     ├─ FormInput.module.sass
│  │  │     ├─ Modal.module.css
│  │  │     ├─ Modal.module.css.map
│  │  │     ├─ Modal.module.sass
│  │  │     ├─ TableBottom.module.css
│  │  │     ├─ TableBottom.module.css.map
│  │  │     ├─ TableBottom.module.sass
│  │  │     ├─ TableHeader.module.css
│  │  │     ├─ TableHeader.module.css.map
│  │  │     └─ TableHeader.module.sass
│  │  ├─ index.css
│  │  ├─ index.css.map
│  │  └─ index.sass
│  ├─ types.ts
│  ├─ utils
│  │  ├─ FormValidation.ts
│  │  └─ schema.ts
│  └─ __tests__
│     ├─ InfiniteScroll.test.tsx
│     ├─ RecordForm.error.test.tsx
│     ├─ RecordForm.validation.test.tsx
│     └─ RecordFrom.success.test.tsx
└─ tsconfig.json

```
>>>>>>> 5368a0f (First MVP)
