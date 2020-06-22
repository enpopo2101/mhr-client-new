import { FormGroupInput, Card, DropDown, Button } from "../components/index";
import VuetableFieldCheckbox from "vuetable-2/src/components/VuetableFieldCheckbox.vue";
import UserPicker from "../components/UserPicker/UserPicker.vue";
import Datepicker from "vuejs-datepicker";



/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
  install(Vue) {
    
    Vue.component("fg-input", FormGroupInput);
    Vue.component("drop-down", DropDown);
    Vue.component("card", Card);
    Vue.component("p-button", Button);
    Vue.component("vuetable-field-checkbox", VuetableFieldCheckbox);
    Vue.component("user-picker", UserPicker);
    Vue.component("date-picker", Datepicker);
  }
};

export default GlobalComponents;
