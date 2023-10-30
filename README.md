# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

```
lukso-react-vue-project
├─ .eslintrc.cjs
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ HEAD
│  ├─ branches
│  ├─ config
│  ├─ description
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ objects
│  │  ├─ 14
│  │  │  └─ 430a183cf09216850964fac989d4b856b0f1eb
│  │  ├─ 17
│  │  │  └─ dd844b447c5e99a7fe8d7983bb0363cb52bcfd
│  │  ├─ 19
│  │  │  └─ 06a9963bf67d50c9b7266693d0a0df5748a274
│  │  ├─ 21
│  │  │  └─ d7c8052402bddb2bb7b0da43b09938ae18beff
│  │  ├─ 2c
│  │  │  └─ 3fac689c7c4680cfb84bc0746512858b90b908
│  │  ├─ 2d
│  │  │  ├─ 2a2d3242a4bc75935f9338a4551abd582c3a4a
│  │  │  └─ fadc4ac11b71ebed9a49c75a9481e69a2c1b3a
│  │  ├─ 30
│  │  │  └─ 16489eaf9d4c965826ffbcb635bf29ed5c2010
│  │  ├─ 45
│  │  │  └─ 08559b85c763c466275f616c81da3180b2ce2b
│  │  ├─ 49
│  │  │  └─ 6509f0aa40a61f153df19e85def4fc5f50f5f4
│  │  ├─ 4d
│  │  │  └─ cb43901a687f5fa7e3867d9964a76861973151
│  │  ├─ 54
│  │  │  ├─ b39dd1d900e866bb91ee441d372a8924b9d87a
│  │  │  └─ ba5329c5d96039641a8e2cf43475f39a01d5d2
│  │  ├─ 5a
│  │  │  └─ 33944a9b41b59a9cf06ee4bb5586c77510f06b
│  │  ├─ 66
│  │  │  └─ 6d7303d731f2b4e6e97ddf38019b81ad954663
│  │  ├─ 68
│  │  │  └─ b3542c4acb9713eec011446140efaa6eedbffe
│  │  ├─ 80
│  │  │  └─ 2bf15ddda6df77ee794384a7aa803780af664e
│  │  ├─ 94
│  │  │  └─ 88daeb65e044978fe1efddc3415a7b86da8563
│  │  ├─ 95
│  │  │  └─ 3f8287a794fbff003e64defce505351dd9def7
│  │  ├─ 9b
│  │  │  └─ 380ac708584a93c97e02a4c3151cb83227c5bf
│  │  ├─ a3
│  │  │  └─ add6aa173cb5750e33945dce2199319985136b
│  │  ├─ aa
│  │  │  └─ 44fedebd00ab90a386101ee19636d62fdb396b
│  │  ├─ ab
│  │  │  └─ 45e4fea496b49afb9e03168303b15607a7a8d9
│  │  ├─ b9
│  │  │  └─ d355df2a5956b526c004531b7b0ffe412461e0
│  │  ├─ c2
│  │  │  └─ 8cb04352419acbdfa375a12af2d90b0f0e22db
│  │  ├─ c3
│  │  │  └─ c7c73920baaf23c2ec0064be3d3d51663d6d25
│  │  ├─ d4
│  │  │  └─ c571eea69293edd73909bd6eb954b0f8b3e521
│  │  ├─ e9
│  │  │  └─ 36d9b40acb1f35399d39f3338967a3a11d7f45
│  │  ├─ f4
│  │  │  └─ c0e4b9b0bac423214f2f88e2b60953e3386432
│  │  ├─ f7
│  │  │  └─ 68e33fc946e6074d6bd3ce5d454853adb3615e
│  │  ├─ info
│  │  └─ pack
│  └─ refs
│     ├─ heads
│     │  └─ main
│     ├─ remotes
│     │  └─ origin
│     │     └─ main
│     └─ tags
├─ .gitignore
├─ README.md
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
├─ src
│  ├─ App.css
│  ├─ App.jsx
│  ├─ ConnectUPButton.jsx
│  ├─ InjectedWalletModule.jsx
│  ├─ assets
│  │  ├─ cube.png
│  │  ├─ icon.js
│  │  ├─ logo-shine.svg
│  │  ├─ logo.svg
│  │  └─ logoc.svg
│  ├─ connect.jsx
│  ├─ index.css
│  └─ main.jsx
└─ vite.config.js

```