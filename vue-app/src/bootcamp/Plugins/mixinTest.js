export let mixinTest = {
    created() {
        this.hello();
    },
    methods: {
        hello() {
            console.log('hello');
        }
    }
};