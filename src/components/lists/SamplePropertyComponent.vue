<template lang="pug">
span sample value component, path is "{{ part.path }}", value "{{ part.value }}", extra field "{{ part.extra }}"
</template>
<script>
export default {
    props: {
        part: Object
    }
}
</script>
