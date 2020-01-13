<template>
    <div class="lifeCircle">
        {{msg}},{{name}}
        <button @click="changeName">click</button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'LifeCircle',
    data() {
        return {
            name: 'ylone',
        };
    },
    computed: {
        msg: function() {
            return `${this.name}@@`;
        }
    },
    watch: {
        name: function(val, oldVal) {
            console.log('watch', val, oldVal);
        }
    },
    methods: {
        changeName: function() {
            this.name = `world ${Number(new Date())}`;
        }
    },
    // 在实例初始化之后，数据观测和event/watcher事件配置之前被调用
    beforeCreate: function() {
        console.log('beforeCreate', this.$el);
    },
    // 实例创建完成之后立即被调用，此时已经完成了：数据观测，属性和方法的运算，watch/event事件回调
    // 挂载阶段还没开始，$el 属性还不可见，即数据准备好了，但是view还没进行挂载
    created: function() {
        console.log('created', this.$el);
    },
     
    // 挂载开始之前被调用：相关的渲染函数首次被调用
    beforeMount: function() {
        console.log('beforeMount', this.$el) ;
    },

    // el 被新创建的 vm.$el 替换，挂载成功
    mounted: function() {
        console.log('mounted', this.$el);
        this.$nextTick(function() {
			console.log('all children components re-rendered');
        });
    },

    beforeUpdate: function() {
        console.log('beforeUpdate');
    },

    updated: function() {
        console.log('update');
    }
});
</script>

<style lang="scss" scoped>
.lifeCircle {
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(3, 100px);
    font {
        size: 12px;
    }
}
</style>