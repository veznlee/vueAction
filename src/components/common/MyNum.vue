<template>
    <span>
        <!-- 折叠按钮 -->
        <b>:{{currentValue}}:</b>
        <input
        class="el-input__inner"
        v-bind="$attrs"
        :type="type"
        :disabled="inputDisabled"
        :value="currentValue"
        @compositionstart="handleComposition"
        @compositionupdate="handleComposition"
        @compositionend="handleComposition"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
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
        watch: {
            value: {
                immediate: true,
                handler(value) {
                    let newVal = value === undefined ? value : Number(value);
                    if (newVal !== undefined && isNaN(newVal)) return;
                    if (newVal >= this.max) newVal = this.max;
                    if (newVal <= this.min) newVal = this.min;
                    this.currentValue = newVal;
                    this.$emit('input', newVal);
                }
            }
        },
        computed:{
            inputDisabled() {
                return this.disabled || (this.elForm || {}).disabled;
            }
        },
        methods:{
            focus() {
                (this.$refs.input || this.$refs.textarea).focus();
            },
            blur() {
                (this.$refs.input || this.$refs.textarea).blur();
            },
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
                this.setCurrentValue(this.currentValue);
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
                var value = event.target.value;
                value = value.replace(/[^\d\.]/g,'').replace(/^\./,'');//.replace(/\.\.$/,'.');
                var newVal = value === '' ? undefined : Number(value);
                if (!isNaN(newVal) || value === '') {
                    this.$emit('input', value);
                    if (newVal >= this.max) newVal = this.max;
                    if (newVal <= this.min) newVal = this.min;
                    //event.target.value = newVal;
                    this.setCurrentValue(newVal);
                } else{
                    //event.target.value = this.currentValue;
                    //this.$emit('input', this.currentValue);
                }
            },
            handleChange(event) {
                var value = event.target.value;
                var newVal = value === '' ? undefined : Number(value);
                if (!isNaN(newVal) || value === '') {
                    if (newVal >= this.max) newVal = this.max;
                    if (newVal <= this.min) newVal = this.min;
                    console.log(newVal);
                    event.target.value = newVal;
                    this.setCurrentValue(newVal);
                    this.$emit('change', newVal);
                } else{
                    console.log(this.currentValue);
                    
                    event.target.value = this.currentValue;
                    this.$emit('change', this.currentValue);
                }
            },
            setCurrentValue(newVal) {
                if (newVal === this.currentValue) return;
                const oldVal = this.currentValue;
                if (newVal >= this.max) newVal = this.max;
                if (newVal <= this.min) newVal = this.min;
                this.$emit('input', newVal);
                this.$emit('change', newVal, oldVal);
                this.currentValue = newVal;
            }
        }
    }
</script>
<style scoped>

</style>
