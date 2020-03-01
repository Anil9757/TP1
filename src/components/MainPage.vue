<template>
  <div class="custom-ace-editor" ref="editor">

  </div>
</template>

<script>
import ace from 'ace-builds/src-noconflict/ace'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/webpack-resolver'
export default {
  props: ['value'],
  data () {
    return {
      editor: null,
      editorLang: 'python'
    }
  },
  mounted () {
    this.editor = ace.edit(this.$refs.editor)
    this.editor.setTheme('ace/theme/monokai')
    this.editor.session.setMode(`ace/mode/${this.editorLang}`)
    this.editor.selection.addRange()
    this.editor.setOptions({
      selectionStyle: 'line',
      cursorStyle: 'ace'
    })
    this.editor.resize()
    this.editor.on('change', () => {
      this.$emit('input', this.editor.getValue())
    })
  }
}
</script>

<style scoped>
.custom-ace-editor {
  position: relative;
  min-height: 20rem;
}
</style>
