export const defConfig=`
server:
  port: 3030
  base-url: /sigf
  session-store: memory-saved
db:
  motor: postgresql
  host: localhost
  database: sigf_db
  schema: sigf
  user: sigf_user
  search_path: 
  - sigf
  - public
install:
  dump:
    db:
      owner: sigf_owner
      apply-generic-user-replaces: true
      user4special-scripts: sigf_admin
      owner4special-scripts: sigf_owner
      extensions:
      - pg_trgm
    enances: inline
    skip-content: true
    scripts:
      prepare:
      post-adapt: 
      - ../node_modules/pg-triggers/lib/recreate-his.sql
      - ../node_modules/pg-triggers/lib/table-changes.sql
      - ../node_modules/pg-triggers/lib/function-changes-trg.sql
      - ../node_modules/pg-triggers/lib/enance.sql
login:
  table: usuarios
  userFieldName: usuario
  passFieldName: md5clave
  rolFieldName: rol
  infoFieldList: [usuario, rol, jurisdiccion]
  activeClausule: activo
  plus:
    maxAge-5-sec: 5000    
    maxAge: 864000000
    maxAge-10-day: 864000000
    allowHttpLogin: true
    fileStore: false
    skipCheckAlreadyLoggedIn: true
    loginForm:
      formTitle: sigf
      usernameLabel: usuario
      passwordLabel: clave
      buttonLabel: entrar
      formImg: img/login-lock-icon.png
    chPassForm:
      usernameLabel: usuario
      oldPasswordLabel: clave anterior
      newPasswordLabel: nueva clave
      repPasswordLabel: repetir nueva clave
      buttonLabel: Cambiar
      formTitle: Cambio de clave
  messages:
    userOrPassFail: el nombre de usuario no existe o la clave no corresponde
    lockedFail: el usuario se encuentra bloqueado
    inactiveFail: es usuario está marcado como inactivo
client-setup:
  title: sigf
  cursors: true
  lang: es
  menu: true
  initial-scale: 1.0
  user-scalable: no
  deviceWidthForMobile: 768px
  x-grid-buffer: wsql
`