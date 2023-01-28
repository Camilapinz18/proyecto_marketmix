const app = Vue.createApp({
  data () {
    return {
      positions: [
        {
          position: 'admin',
          password: 'adm1'
        },
        {
          position: 'secretario',
          password: 'scr1'
        },
        {
          position: 'vendedor',
          password: 'ven1'
        },
        {
          position: 'ensamblador',
          password: 'ens1'
        }
      ],
      user: '',
      password: ''
    }
  },
  methods: {
    checkData () { 
      const isUser = this.positions.find(
        user => user.position === this.user.trim()
      )
      if (isUser) {
        if (isUser.password.trim() === this.password) {
          alert('Successful login')
          this.user= '',
          this.password= ''
        } else {
          alert('Wrong password')
        }
      } else {
        alert('The username is wrong or doesnt exists')
      }
    },
    checkFields () {
      if (this.user === '' || this.password === '') {
        alert('You must fill all the fields to continue')
      } else {
        this.checkData()
      }
    }
  }
})

app.mount('#app')
