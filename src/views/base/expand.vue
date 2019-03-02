<script>
    export default {
      name: "expand",
      props: {
        render: {
          type: Function,
          require: true
        },
        options: {
            type: Object
        }
      },
      functional: true,
      render: function (h, ctx) {
        const render = ctx.props.render;
        const params = ctx.props.options || {};
        return render(h, params)
      }
    }
</script>

<style scoped>

</style>
