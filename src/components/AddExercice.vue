<template>
  <v-form @submit.prevent="saveExercise">
    <v-expansion-panels popout multiple :value="defaultOpenedPanels">
      <v-expansion-panel>
        <v-expansion-panel-header><h2>Add An Exercice</h2></v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row class="mb-0">
            <v-col cols="9">
              <v-text-field
                v-model="title"
                label="Title"
                outlined/>
            </v-col>

            <v-col cols="3">
              <v-select
                v-model="language"
                label="Language"
                :items="availablelanguages"
                item-text="name"
                item-value="value"
                outlined
              >
              </v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="9">
              <v-textarea
                v-model="instructions"
                label="Instructions"
                outlined
              />
            </v-col>

            <v-col cols="3" class="pt-0">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="difficulty"
                    type="number"
                    label="Difficulty"
                    outlined/>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header><h2>Unit tests</h2></v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-col cols="12">
            <MainPage
              v-model="testsCode"
            />
          </v-col>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header><h2>Sandbox</h2></v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row>
            <v-col cols="7">
              <MainPage
                v-model="sandboxCode"
              />
            </v-col>

            <v-col cols="5">
              <div align="center">
                <v-btn color="primary" outlined @click="runSandbox">
                  Run sandbox
                </v-btn>
              </div>

              <div class="mt-5" v-show="sandboxTestsResponse.length !== 0">
                <v-alert
                  v-for="testResult in sandboxTestsResponse"
                  :key="testResult.line"
                  :type="testResult.message ? 'error' : 'success'"
                  class="my-2 py-1">
                  <h4>{{ testResult.name }} - {{ testResult.time }}s</h4>
                  <p class="body-2" v-if="testResult.message">{{ testResult.message }}</p>
                </v-alert>
              </div>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <div class="d-flex justify-end mt-5">
      <v-btn x-large type="submit" color="success">
        Save
      </v-btn>
    </div>
  </v-form>
</template>

<script>
import MainPage from '@/components/MainPage'
export default {
  components: {
    MainPage
  },
  data () {
    return {
      defaultOpenedPanels: [0, 1],
      availablelanguages: [
        {
          name: 'Python',
          value: 'python'
        }
      ],
      title: '',
      language: '',
      difficulty: 5,
      instructions: '',
      testsCode: '',
      sandboxCode: '',
      sandboxTestsResponse: []
    }
  },
  beforeMount () {
    this.language = this.availablelanguages[0]
  },
  methods: {
    async displayErrorToast (message, { duration, keepOnHover }) {
      this.$toasted.show(message, {
        type: 'error',
        duration: duration || 2500,
        keepOnHover: keepOnHover || true
      })
    },
    async saveExercise () {
      try {
        const response = await this.axios.post('http://localhost:3000/api/v1/exercice', {
          creation_date: new Date(),
          title: this.title,
          instructions: this.instructions,
          tests: this.testsCode,
          lang: this.language,
          difficulty: this.difficulty
        })
        console.log({ response })
      } catch (error) {
        this.displayErrorToast(error.message)
      }
    },
    async runSandbox () {
      try {
        const response = await this.axios.post('http://localhost:3000/api/v1/exercice/sandbox', {
          tests: this.testsCode,
          lang: this.language,
          solution: this.sandboxCode
        })
        // Gather only required data about tests
        this.sandboxTestsResponse = response.data.result.tests
          .map(item => {
            if (item.failure) {
              return {
                name: item.name,
                line: item.line,
                time: item.time,
                message: item.failure.message
              }
            }
            return {
              name: item.name,
              line: item.line,
              time: item.time
            }
          })
          .sort((a, b) => a.line < b.line)
      } catch (error) {
        this.displayErrorToast(error.message)
      }
    }
  }
}
</script>
