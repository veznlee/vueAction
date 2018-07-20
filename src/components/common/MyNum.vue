<template>
    <span>
        <!-- 折叠按钮 -->
        <b>:{{currentValue}}:</b>
        <input
        class="el-input__inner"
        :type="type"
        :disabled="inputDisabled"
        :value="currentValue"
        :max="max"
        :min="min"
        :name="name"
        :label="label"
        @compositionstart="handleComposition"
        @compositionupdate="handleComposition"
        @compositionend="handleComposition"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleInputChange"
        ref="input" >
    </span>
</template>
<script>
    import emitter from '../mixins/emitter';
    import Migrating from '../mixins/migrating';
    export default {
        inheritAttrs: false,//不继承多余的属性
        mixins: [emitter, Migrating],
        inject: {//用以获取父组件通过provide传递过来的数据，elform用于设置input的相关属性，如disabled,elformitem用于判断当前输入框属于哪个form表单
            elForm: {
                default: ''
            },
            elFormItem: {
                default: ''
            }
        },
        data() {
            return {
                currentValue: this.value === undefined || this.value === null ? '': this.value,
                hovering: false,
                focused: false,
                isOnComposition: false
            }
        },
        props: {
            value: [String, Number],
            disabled: Boolean,
            type:{
                type:String,
                default:'text'
            },
            max: {
                type: Number,
                default: Infinity
            },
            min: {
                type: Number,
                default: -Infinity
            },
            name: String,
            label: String
        },
        // watch: {
        //     value: {
        //         immediate: true,
        //         handler(value) {
        //             let newVal = value === undefined ? value : Number(value);
        //             if (newVal !== undefined && isNaN(newVal)) return;
        //             if (newVal >= this.max) newVal = this.max;
        //             if (newVal <= this.min) newVal = this.min;
        //             this.currentValue = newVal;
        //             this.$emit('input', newVal);
        //         }
        //     }
        // },
        // watch: {
        //     'value'(val, oldValue) {
        //         this.setCurrentValue(val);
        //     }
        // },
        computed:{
            inputDisabled() {
                return this.disabled || (this.elForm || {}).disabled;
            }
        },
        methods:{
            isKorean(text) {
                const reg = /([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi;
                return reg.test(text);
            },
            handleFocus(event) {
                this.focused = true;
                this.$emit('focus', event);
            },
            handleBlur(event) {
                this.focused = false;
                this.$emit('blur', event);
                this.$refs.input.setCurrentValue(this.currentValue);
                // if (this.validateEvent) {
                //     this.dispatch('ElFormItem', 'el.form.blur', [this.currentValue]);
                // }
            },
            handleComposition(event) {
                if (event.type === 'compositionend') {
                    this.isOnComposition = false;
                    this.handleInput(event);
                } else {
                    const text = event.target.value;
                    const lastCharacter = text[text.length - 1] || '';
                    this.isOnComposition = !this.isKorean(lastCharacter);
                }
            },
            handleInput(event) {
                if (this.isOnComposition) return;
                const value = event.target.value;
                const newVal = value === '' ? undefined : Number(value);
                //this.setCurrentValue(value);
                if (!isNaN(newVal) || value === '') {
                    this.setCurrentValue(newVal);
                    this.$emit('input', value);
                }
            },
            handleChange(event) {
                this.$emit('change', event.target.value);
            },
            handleInputChange(value) {
                const newVal = value === '' ? undefined : Number(value);
                if (!isNaN(newVal) || value === '') {
                    this.setCurrentValue(newVal);
                }
            },
            setCurrentValue(newVal) {
                if (newVal === this.currentValue) return;
                const oldVal = this.currentValue;
                if (newVal >= this.max) newVal = this.max;
                if (newVal <= this.min) newVal = this.min;
                if (oldVal === newVal) {
                    this.$refs.input.setCurrentValue(this.currentValue);
                    return;
                }
                this.$emit('input', newVal);
                this.$emit('change', newVal, oldVal);
                this.currentValue = newVal;
                // if (this.validateEvent) {
                //     this.dispatch('ElFormItem', 'el.form.change', [value]);
                // }
            },
        }
    }
</script>
<style scoped>

</style>
