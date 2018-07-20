<template>
    <!-- <input
        class="el-input__inner"
        :type="type"
        :disabled="inputDisabled"
        :autocomplete="autoComplete"
        :value="currentValue"
        :max="max"
        :min="min"
        :name="name"
        :label="label"
        ref="input" > -->
        <div class="el-input__inner">dewsfrr</div>
</template>

<script>
// @compositionstart="handleComposition"
// @compositionupdate="handleComposition"
// @compositionend="handleComposition"
// @input="handleInput"
// @focus="handleFocus"
// @blur="handleBlur"
// @change="handleChange"
var MyNumber =  {
    name: 'MyNumber',
    componentName: 'MyNumber',
    inheritAttrs: false,//不继承多余的属性
    data() {
      return {
            currentValue: this.value === undefined || this.value === null
            ? ''
            : this.value,
            hovering: false,
            focused: false,
            isOnComposition: false
        };
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

    computed: {},

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

    methods: {
        focus() {
            (this.$refs.input || this.$refs.textarea).focus();
        },
        blur() {
            (this.$refs.input || this.$refs.textarea).blur();
        },
        handleBlur(event) {
            this.focused = false;
            this.$emit('blur', event);
        },
        select() {
            (this.$refs.input || this.$refs.textarea).select();
        },
        
        handleFocus(event) {
            this.focused = true;
            this.$emit('focus', event);
        },
        handleComposition(event) {
            if (event.type === 'compositionend') {
            this.isOnComposition = false;
            this.handleInput(event);
            } else {
            const text = event.target.value;
            const lastCharacter = text[text.length - 1] || '';
            this.isOnComposition = !isKorean(lastCharacter);
            }
        },
        handleInput(event) {
            if (this.isOnComposition) return;
            const value = event.target.value;
            this.$emit('input', value);
            this.setCurrentValue(value);
        },
        handleChange(event) {
            this.$emit('change', event.target.value);
        },
        toPrecision(num, precision) {
            if (precision === undefined) precision = this.precision;
            return parseFloat(parseFloat(Number(num).toFixed(precision)));
        },
        getPrecision(value) {
            if (value === undefined) return 0;
            const valueString = value.toString();
            const dotPosition = valueString.indexOf('.');
            let precision = 0;
            if (dotPosition !== -1) {
            precision = valueString.length - dotPosition - 1;
            }
            return precision;
        },
        _increase(val, step) {
            if (typeof val !== 'number' && val !== undefined) return this.currentValue;
            const precisionFactor = Math.pow(10, this.precision);
            // Solve the accuracy problem of JS decimal calculation by converting the value to integer.
            return this.toPrecision((precisionFactor * val + precisionFactor * step) / precisionFactor);
        },
        _decrease(val, step) {
            if (typeof val !== 'number' && val !== undefined) return this.currentValue;
            const precisionFactor = Math.pow(10, this.precision);
            return this.toPrecision((precisionFactor * val - precisionFactor * step) / precisionFactor);
        },
        increase() {
            if (this.inputNumberDisabled || this.maxDisabled) return;
            const value = this.value || 0;
            const newVal = this._increase(value, this.step);
            this.setCurrentValue(newVal);
        },
        decrease() {
            if (this.inputNumberDisabled || this.minDisabled) return;
            const value = this.value || 0;
            const newVal = this._decrease(value, this.step);
            this.setCurrentValue(newVal);
        },
        handleBlur(event) {
            this.$emit('blur', event);
            this.$refs.input.setCurrentValue(this.currentValue);
        },
        handleFocus(event) {
            this.$emit('focus', event);
        },
        setCurrentValue(newVal) {
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
        },
        handleInputChange(value) {
            const newVal = value === '' ? undefined : Number(value);
            if (!isNaN(newVal) || value === '') {
                this.setCurrentValue(newVal);
            }
        }
    },

    created() {
      this.$on('inputSelect', this.select);
    },

    mounted() {
        //   let innerInput = this.$refs.input;
        //   innerInput.setAttribute('role', 'spinbutton');
        //   innerInput.setAttribute('aria-valuemax', this.max);
        //   innerInput.setAttribute('aria-valuemin', this.min);
        //   innerInput.setAttribute('aria-valuenow', this.currentValue);
        //   innerInput.setAttribute('aria-disabled', this.inputNumberDisabled);
    }
};
// MyNumber.install = function(Vue) {
//     Vue.component(MyNumber.name, MyNumber.componentName);
// };
export default MyNumber;
</script>