<template>
  <div class="form-group row">
    <label for="controls label" class="col-md-3 col-form-label">{{
      label
    }}</label>
    <div class="controls col-md-8">
      <vue-autosuggest
        v-model="item"
        :suggestions="filteredOptions"
        @input="onInputChange"
        @selected="onSelected"
        :get-suggestion-value="getSuggestionValue"
        :input-props="{
          class: 'form-control col-md',
          placeholder: 'Họ tên hoặc email'
        }"
      >
        <div
          slot-scope="{ suggestion }"
          style="display: flex; align-items: center;"
        >
          <div style="{ display: 'flex', color: 'navyblue'}">
            {{ suggestion.item.fullName }}
          </div>
        </div>
      </vue-autosuggest>
    </div>
  </div>
</template>

<script>
import { VueAutosuggest } from "vue-autosuggest";

export default {
  components: {
    VueAutosuggest
  },
  props: {
    label: {
      type: String,
      default: "Họ và tên"
    }
  },
  data() {
    return {
      item: "",
      selected: "",
      suggestions: [
        {
          data: []
        }
      ]
    };
  },
  computed: {
    filteredOptions() {
      return [
        {
          data: this.suggestions[0].data
        }
      ];
    }
  },
  methods: {
    onSelected(item) {
      this.selected = item.fullName;
    },
    async onInputChange(text) {
      // event fired when the input changes
      try {
        const res = await this.$axios.post("/users/search", { text: text });
        this.suggestions[0].data = res.data.data;
      } catch (error) {
        this.$notify({
          title: "Đã có lỗi xảy ra",
          horizontalAlign: "right",
          verticalAlign: "top",
          type: "danger"
        });
      }
    },
    /**
     * This is what the <input/> value is set to when you are selecting a suggestion.
     */
    getSuggestionValue(suggestion) {
      this.$emit("get-user-value", suggestion.item);
      console.log(suggestion.item);
      return suggestion.item.fullName ? suggestion.item.fullName : null;
    }
  }
};
</script>
<style>
.autosuggest__results-item--highlighted {
  background-color: rgba(51, 217, 178, 0.2);
}
</style>
