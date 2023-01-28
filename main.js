const app = Vue.createApp({
  data () {
    return {
      positions: [
        {
          position: 'Administrator',
          password: 'adm1'
        },
        {
          position: 'Secretary',
          password: 'scr1',
          salary: 0
        },
        {
          position: 'Seller',
          password: 'sel1',
          salary: 0
        },
        {
          position: 'Assembler',
          password: 'asm1',
          salary: 0
        }
      ],
      user: '',
      password: '',
      positionSelect: '',
      salaryInput: 0
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
          ;(this.user = ''), (this.password = '')
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
    },

    save () {
      let toModify = this.positions.find(employee =>
        employee.position === this.positionSelect.position
          ? (employee.salary = this.salaryInput)
          : ''
      )
      this.positions.map(pos => console.log('m', pos))
      this.salaryInput = ''
    },
    change () {
      console.log('change')
    }
  }
})

app.mount('#app')
