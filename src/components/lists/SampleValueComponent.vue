<template lang="pug">
span sample value component, path is "{{ paths }}", value "{{ value }}", extra field "{{ definition.extra }}"
</template>
<script>
export default {
    props: ['context', 'definition', 'data', 'paths', 'value', 'values']
}
</script>
