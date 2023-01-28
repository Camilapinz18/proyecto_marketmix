const app = Vue.createApp({
  data () {
    return {
      accounts: [
        {
          name: 'admin',
          password: 'adm1'
        },
        {
          name: 'secretary',
          password: 'scr1'
        },
        {
          name: 'seller',
          password: 'sll1'
        },
        {
          name: 'aassembler',
          password: 'asb1'
        }
      ],
      userLogged: '',
      activeLogin: true,
      activeAdmin: false,
      activeSeller: false,
      activeSecretary: false,
      activeAssembler: false,
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
      usersData: [
        {
          name: 'assembler',
          salary: 1300000,
          quantyShoes: 500,
          priceShoes: 25000
        },
        {
          name: 'seller',
          salary: 1400000,
          commision: 600
        },
        {
          name: 'secretary',
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
        const user = this.usersData.find(element => element.name === newValue)
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
    onLoadPage () {
      console.log('page refreshed')
      this.checkIsAlreadyLogged()
    },
    /*--LOGIN--*/
    checkIsAlreadyLogged () {
      if (localStorage.getItem('userLogged')) {
        this.userLogged = JSON.parse(localStorage.getItem('userLogged'))
        switch (this.userLogged.name) {
          case 'admin':
            this.activeLogin = false
            this.activeAdmin = true
            break

          case 'seller':
            this.activeLogin = false
            this.activeSeller = true
            break

          case 'secretary':
            this.activeLogin = false
            this.activeSecretary = true
            break

          case 'assembler':
            this.activeLogin = false
            this.activeAssembler = true
            break
        }
      }
    },
    checkData () {
      const isUser = this.accounts.find(user => user.name === this.user.trim())
      if (isUser) {
        if (isUser.password.trim() === this.password) {
          ;(this.user = ''), (this.password = '')
          this.activeLogin = false
          this.activeAdmin = true
          this.launchError('Successful login')
          console.log('isUser', isUser)
          localStorage.setItem('userLogged', JSON.stringify(isUser))
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
      console.log('posotionmselect', this.positionSelectChanged)
      this.messageLoader = 'Please wait...'
      this.changeLoaderState()
      setTimeout(() => {
        const user = this.usersData.find(
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
          this.usersData.splice(
            this.usersData.findIndex(u => u.name === this.positionSelect),
            1,
            user
          )
        }
        this.changeLoaderState()
        this.changeBtnChangeName()
        this.clearForm()
      }, 1000)
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
  },
  created: function () {
    this.onLoadPage()
  }
})

app.mount('#app')
