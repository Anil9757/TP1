<template>
  <v-container>
        <v-layout
          align-center
          justify-center
        >
<div id="app">
  <v-app id="inspire">
    <v-card class="d-inline-block mx-auto">
      <v-container>
        <v-row justify="space-between">
          <v-col cols="auto">
            <v-card class="ma-2"
              height="8em"
              width="16em"
              v-for="exercice in getExercisesBySessionId(session.id)" :key="exercice.id">
               <v-card-title class="subtitle-1">
                {{exercice.name}}
            </v-card-title></v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-app>
</div>
        </v-layout>
  </v-container>
</template>

<script>
import {mapState, mapAction, mapGetters, mapActions } from 'vuex'
import Module from '../components/Module.vue'
export default {
    data: () => ({

    }),
    async mounted(){
        await this.fetchModule({id: this.moduleId})
        await Promise.all(
            this.modules.map(m => this.fetchSessionsForModule({moduleId: m.id}))
        )
        await Promise.all(
            this.sessions.map(s => this.fetchExercisesForSessions({sessionsId: s.id}))
        )
    },
    computed: {
        ...mapState('modules', ['modules']),
        ...mapGetters('modules', ['getModuleById']),
        ...mapGetters('sessions', ['getSessionsByModuleId']),
        ...mapGetters('exercises', ['getExercisesBySessionId']),

        module(){
            return this.getModuleById(this.moduleId) || {name: 'Loading...'}
        },
        moduleId() {
            return parseInt(this.$route.params.id)
        },
        sessions(){
            return this.getSessionsByModuleId(this.moduleId)
        }
    },
    methods: {
        ...mapActions('modules', ['fetchModule']),
        ...mapActions('sessions', ['fetchSessionsForModule']),
        ...mapActions('exercises', ['fetchExercisesForSessions'])
    }
}
</script>