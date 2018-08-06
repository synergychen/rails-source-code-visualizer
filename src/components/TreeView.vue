<template>
    <li>
        <div ref="name"
             class="name"
             @click="opened = !opened"
             @mouseover="highlightChildren"
             @mouseout="unhighlightChildren">
            {{ tree.name }}
        </div>
        <ul v-show="opened">
            <template v-for="child in tree.children">
                <TreeView ref="treeViews" :tree="child" :level="level + 1"/>
            </template>
        </ul>
    </li>
</template>

<script>
export default {
    name: "TreeView",
    props: {
        tree: {
            type: Object,
            default: {
                name: null,
                children: []
            },
        },
        level: {
            type: Number,
            default: 0
        }
    },
    watched: {
        highlighted: {
        }
    },
    data: function () {
        return {
            opened: true
        }
    },
    methods: {
        highlightChildren: function () {
            (this.$refs.treeViews || []).forEach(treeView => {
                treeView.$refs.name.style.backgroundColor = "#BBDEFB";
            });
        },
        unhighlightChildren: function () {
            (this.$refs.treeViews || []).forEach(treeView => {
                treeView.$refs.name.style.backgroundColor = "";
            });
        }
    }
}
</script>

<style>
ul, li {
    margin: 0;
    list-style-type: none;
    text-align: left;
}

.name {
    border: 1px solid rgba(0,0,0,.12);
    background-color: #F5F5F5;
    cursor: pointer;
    display: inline-block;
    padding: 3px 10px;
    min-width: 200px;
    font-size: 0.9em;
}

.name:hover {
    background-color: #448AFF;
}

.highlighted {
    background-color: red;
}
</style>
