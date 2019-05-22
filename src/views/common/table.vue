<template>
    <div :class="$style['customize-table']" v-if="tableColumns && tableData">
      <el-table
      :data.sync="tableData"
      header-row-class-name="customize-header-row"
      row-class-name="customize-row"
      :border="border"
      :max-height="600"
      fit
      :style="{'width': width}"
      ref="customize-table"
      v-bind="$attrs"
      v-on="$listeners">
        <template v-for="column in tableColumns">
          <el-table-column
          :type="column.type || null"
          :width="column.width || null"
          :prop="column.key"
          :label="column.title"
          :align="column.align || 'center'"
          :fixed="column.fixed || null"
          :sortable="column.sortable || null"
          :formatter="column.formatter || null"
          :selectable="column.selectable || null"
          :show-overflow-tooltip="column.isTooltip !== undefined ? column.isTooltip : true"
          :key="column.title"
          :render-header="column.renderHeader || null"
          v-if="!column.render">
          </el-table-column>
          <el-table-column
            v-else
            :type="column.type || null"
            :width="column.width || null"
            :label="column.title"
            :align="column.align || 'center'"
            :fixed="column.fixed || null"
            :sortable="column.sortable || null"
            :formatter="column.formatter || null"
            :selectable="column.selectable || null"
            :show-overflow-tooltip="column.isTooltip || true"
            :key="column.title"
            :render-header="column.renderHeader || null">
            <template slot-scope="scope">
              <expand
              :render="column.render"
              :options="{
                index: scope.$index,
                column: column,
                row: scope.row
              }">
              </expand>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
</template>

<script>
  import expand from '../base/expand'
    export default {
      name: "customizeTable",
      props: {
        width: {
          type: String,
          default: '100%'
        },
        tableData: {
          type: Array,
          required: true
        },
        tableColumns: {
          type: Array,
          required: true
        },
        border: {
          type: Boolean,
          default: true
        }
      },
      data(){
        return {
        }
      },
      components: {
        expand
      }
    }
</script>

<style lang="scss" module>
.customize-table{
  margin-bottom: 15px;
}
</style>
