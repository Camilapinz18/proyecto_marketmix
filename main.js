const app = Vue.createApp({
  data () {
    return {
      cargos: [
        {
          cargo: 'admin',
          clave: 'adm1'
        },
        {
          cargo: 'secretario',
          clave: 'scr1'
        },
        {
          cargo: 'vendedor',
          clave: 'ven1'
        },
        {
          cargo: 'ensamblador',
          clave: 'ens1'
        }
      ],
      usuario: '',
      clave: ''
    }
  },
  methods: {
    verificarDatos () {
      console.log('verificar datos')
      const isUsuario = this.cargos.find(
        usuario => usuario.cargo === this.usuario.trim()
      )
      if (isUsuario) {
        if (isUsuario.clave.trim() === this.clave) {
          alert('login exitoso')
          this.usuario= '',
          this.clave= ''
        } else {
          alert('Clave incorrecta')
        }
      } else {
        alert('El nombre del usuario no existe o es incorrecto')
      }
    },
    verificarCampos () {
      console.log('verificar campos')
      if (this.usuario === '' || this.clave === '') {
        alert('Debe llenar todos los campos para continuar')
      } else {
        this.verificarDatos()
      }
    }
  }
})

app.mount('#app')
