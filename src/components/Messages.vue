<template>
    <div>
        <p>
            <b v-if="this.errors.length > 0">Please correct the following error {{this.errors.length > 1?  's' : '' }}:</b>
            <ul class="errors">
                <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
        </p>
        <p>
            <ul class="success">
                <li v-for="success in success" :key="success">{{ success }}</li>
            </ul>
        </p>
    </div>
</template>
<script>
export default {
  name: "Messages",
  props: ["errors", "success"],
  data() {
    return {};
  }
};
</script>