const app = Vue.createApp({
  data () {
    return {
      activeLogin: true,
      activeAdmin: false,
      activeSeller: false,
      activeSecretary: false,
      activessembler: false,
      isError: true,
      messageError: '',
      user: '',
      password: '',
      isChange: false,
      btnChange: 'Change',
      loader: false,
      messageLoader: '',
      positionSelect: null,
      salary: null,
      quantyShoes: null,
      priceShoes: null,
      commision: null,
      users: [
        {
          name: 'admin',
          password: 'adm1'
        },
        {
          name: 'assembler',
          password: 'asm1',
          salary: 1300000,
          quantyShoes: 500,
          priceShoes: 25000
        },
        {
          name: 'seller',
          password: 'sel1',
          salary: 1400000,
          commision: 600
        },
        {
          name: 'secretary',
          password: 'srt1',
          salary: 1500000
        }
      ]
    }
  },
  watch: {
    positionSelect (newValue, oldValue) {
      this.isChange = false
      this.changeBtnChangeName()
      if (this.positionSelect) {
        const user = this.users.find(element => element.name === newValue)
        if (user) {
          this.salary = user.salary
          this.quantyShoes = null
          this.priceShoes = null
          this.commision = null
          switch (user.name) {
            case 'assembler':
              this.quantyShoes = user.quantyShoes
              this.priceShoes = user.priceShoes
              break
            case 'seller':
              this.commision = user.commision
              break
          }
        }
      }
    }
  },
  methods: {
    /*--GENERAL-- */
    launchError (message) {
      this.isError = true
      this.messageError = message
      setTimeout(() => {
        this.isError = false
        this.messageError = ''
      }, 2000)
    },
    /*--LOGIN--*/
    checkData () {
      const isUser = this.users.find(user => user.name === this.user.trim())
      if (isUser) {
        if (isUser.password.trim() === this.password) {
          ;(this.user = ''), (this.password = '')
          this.activeLogin = false
          this.activeAdmin = true
          console.log('Successful login')
        } else {
          this.launchError('Wrong password')
        }
      } else {
        this.launchError('The username is wrong or doesnt exists')
      }
    },
    checkFields () {
      if (this.user === '' || this.password === '') {
        this.launchError('You must fill all the fields to continue')
      } else {
        this.checkData()
      }
    },
    /*--ADMIN--*/
    save () {
      this.messageLoader = 'Please wait...'
      this.changeLoaderState()
      setTimeout(() => {
        const user = this.users.find(
          element => element.name === this.positionSelect
        )
        if (user) {
          user.salary = this.salary
          switch (user.name) {
            case 'assembler':
              user.quantyShoes = this.quantyShoes
              user.priceShoes = this.priceShoes
              break
            case 'seller':
              user.commision = this.commision
              break
          }
          this.users.splice(
            this.users.findIndex(u => u.name === this.positionSelect),
            1,
            user
          )
        }
        this.changeLoaderState()
        this.changeBtnChangeName()
        this.clearForm()
      }, 10)
    },
    change () {
      this.isChange = !this.isChange
      this.changeBtnChangeName()
    },
    changeBtnChangeName () {
      this.isChange
        ? (this.btnChange = 'No Change')
        : (this.btnChange = 'Change')
    },
    changeLoaderState () {
      this.loader = !this.loader
    },
    clearForm () {
      this.positionSelect = null
      this.quantyShoes = null
      this.priceShoes = null
      this.commision = null
    }
  }
})

app.mount('#app')
