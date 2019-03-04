<template>
  <div :class="['custom-form-item', position === 'top' ?  'label-position__top' : '']" :style="{width, display: inline ? 'inline-block' : 'block'}">
    <div class="custom-form-item__el custom-form-item__label" :style="{width: typeof labelWidth === 'string' ? labelWidth : labelWidth + 'px'}"><slot name="label"></slot></div>
    <div class="custom-form-item__el custom-form-item__content" :style="{marginLeft: typeof labelWidth === 'string' ? labelWidth : labelWidth + 'px', color: contentColor}"><slot></slot></div>
  </div>
</template>

<script>
	export default {
	  props: {
	    width: String,
      labelWidth: [String, Number],
      contentColor: String,
      inline: {
	      type: Boolean,
        default: false
      },
      position: {
	      type: String,
        default: 'left'
      }
    }
	}
</script>

<style lang="scss" scoped>
  .custom-form-item{
    &.label-position__top{
      .custom-form-item__el.custom-form-item__label{
        float: none;
        display: inline-block;
        text-align: left;
      }
      .custom-form-item__el.custom-form-item__content{
        margin-left: 0;
      }
    }
  }

</style>
