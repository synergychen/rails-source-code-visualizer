<template>
    <div>
        <TreeView :tree="tree"/>
    </div>
</template>

<script>
import TreeView from "@/components/TreeView.vue"

const callTreeData = require("@/assets/render_index.json")
export default {
    data: function () {
        return {
            tree: callTreeData
        }
    },
    components: {
        TreeView
    }
}
</script>
