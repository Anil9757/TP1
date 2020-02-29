<template>
<div id="app">
  <v-app id="inspire">
    <v-content>
      <v-container
        fluid
        fill-height
      >
        <v-layout
          align-center
          justify-center
        >
          <v-flex
            xs12
            sm8
            md4
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    name="login"
                     :rules="mailRules"
                    label="Email"
                    required
                    type="text"
                    v-model="input.username"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    :rules="passwordRules"
                    name="password"
                    type="password"
                    v-model="input.password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" v-on:click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</div>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    state: false,
    valid: false,
    username: '',
    password: '',
    todos: [],
    mailRules: [
      v => !!v || 'Email is required',
      v => v.match(/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/) || 'Wrong email'
    ],
    passwordRules: [
      v => !!v || 'Password is required'
    ]
  }),
  methods: {
    async login () {
      const { username, password } = this
      try {
        const result = await this.axios.post('http://localhost:3000/api/v1/login', {
          username,
          password
        })
        this.user = result.data
        this.loggedIn = true
        this.$router.push('/Main')
      } catch (err) {
        this.errorLogin = err
      }
    }
  }
}

</script>

<style scoped>
    #login {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
</style>
