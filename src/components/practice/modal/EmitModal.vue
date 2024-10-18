<template>
    <div>

    </div>
</template>

<script>
import {EventBus} from '@/components/practice/modal/EventBus'
    export default {
        name:"EmitModal",
        mounted(){
            EventBus.$on("modalcheck",this.ModalHandler)
        },
        methods:{
          ModalHandler(){
            console.log("ModalHandler called")
          }
        }
    }
</script>

<style lang="scss" scoped>

</style>