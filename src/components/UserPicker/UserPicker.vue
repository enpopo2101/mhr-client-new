<template>
  <div class="form-group row">
    <label for="controls label" class="col-md-2 col-form-label">{{
      label
    }}</label>
    <div class="controls col-md-9">
      <vue-autosuggest
        v-model="item"
        :suggestions="filteredOptions"
        @input="onInputChange"
        @selected="onSelected"
        :get-suggestion-value="getSuggestionValue"
        :input-props="{
          class: 'form-control col-md',
          placeholder: 'Họ tên hoặc mã nhân viên'
        }"
      >
        <div
          slot-scope="{ suggestion }"
          style="display: flex; align-items: center;list-style-type: none"
        >
          <div style="{ display: 'flex', color: 'navyblue'}">
            {{ suggestion.item.fullName }} - {{ suggestion.item.code }}
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
      users: [],
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
  async created() {
    try {
      const res = await this.$axios.get("/users");
      this.users = res.data.data;
      this.$notify({
        title: "Tải dữ liệu thành công",
        horizontalAlign: "right",
        verticalAlign: "top",
        type: "success"
      });
    } catch (error) {
      this.$notify({
        title: "Tải dữ liệu người dùng thất bại",
        horizontalAlign: "right",
        verticalAlign: "top",
        type: "danger"
      });
    }
  },
  methods: {
    onSelected(item) {
      this.selected = `${item.fullName} - ${item.code}`;
    },
    async onInputChange(text) {
      // event fired when the input changes
      try {
        const suggestionData = this.users.filter(user => {
          return user.fullName.includes(text) || user.code.includes(text);
        });

        this.suggestions[0].data = suggestionData;
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
      return suggestion.item.fullName
        ? `${suggestion.item.fullName} - ${suggestion.item.code}`
        : null;
    }
  }
};
</script>
<style>
.autosuggest__results-item--highlighted {
  background-color: rgba(51, 217, 178, 0.2);
}
#autosuggest__input {
  outline: none;
  position: relative;
  display: block;
  font-family: monospace;
  font-size: 20px;
  border: 1px solid #616161;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}

#autosuggest__input.autosuggest__input-open {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.autosuggest__results-container {
  position: relative;
  width: 100%;
}

.autosuggest__results {
  font-weight: 300;
  margin: 0;
  position: absolute;
  z-index: 10000001;
  width: 100%;
  border: 1px solid #e0e0e0;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  background: white;
  padding: 0px;
  overflow: none;
  max-height: 200px;
}

.autosuggest__results ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.autosuggest__results .autosuggest__results_item {
  cursor: pointer;
  padding: 15px;
}

#autosuggest ul:nth-child(1) > .autosuggest__results_title {
  border-top: none;
}

.autosuggest__results .autosuggest__results_title {
  color: gray;
  font-size: 11px;
  margin-left: 0;
  padding: 15px 13px 5px;
  border-top: 1px solid lightgray;
}

.autosuggest__results .autosuggest__results_item:active,
.autosuggest__results .autosuggest__results_item:hover,
.autosuggest__results .autosuggest__results_item:focus,
.autosuggest__results
  .autosuggest__results_item.autosuggest__results_item-highlighted {
  background-color: rgb(81, 131, 165);
}
</style>
