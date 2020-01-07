<template lang="pug">
span sample value component, path is "{{ paths }}", value "{{ value }}", extra field "{{ layout.extra }}"
</template>
<script>
export default {
    props: ['context', 'layout', 'data', 'paths', 'value', 'values']
}
</script>
