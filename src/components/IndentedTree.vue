<template>
    <div>
        <svg ref="svg" :width="width" :height="height">
            <g :style="{transform: `translate(${margin.left}px, ${margin.top}px)`}"></g>
        </svg>
    </div>
</template>

<script>
import * as d3 from 'd3';
const json = require("../assets/render_index.json");

export default {
    data: function () {
        return {
            margin: { top: 30, right: 20, bottom: 30, left: 20 },
            width: 2000,
            height: 500,
            barHeight: 20,
            barWidth: 500,
            duration: 400,
            root: null,
            i: 0
        }
    },
    mounted: function () {
        this.init();
    },
    methods: {
        init: function () {
            this.root = d3.hierarchy(json);
            this.root.x0 = 0;
            this.root.y0 = 0;
            this.update(this.root);
        },
        update: function (source) {
            let diagonal = d3.linkHorizontal()
                .x(function(d) { return d.y; })
                .y(function(d) { return d.x; });
            let svg = d3.select("g");
            // Compute the flattened node list.
            let nodes = this.root.descendants();
            this.height = Math.max(500, nodes.length * this.barHeight + this.margin.top + this.margin.bottom);
            // Compute the "layout".
            let index = -1;
            this.root.eachBefore(n => {
                n.x = ++index * this.barHeight;
                n.y = n.depth * 20;
            });
            // Update the nodes…
            let node = svg.selectAll(".node")
                .data(nodes, function(d) { return d.id || (d.id = ++this.i); });
            let nodeEnter = node.enter().append("g")
                .attr("class", "node")
                .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
                .style("opacity", 0);
            // Enter any new nodes at the parent's previous position.
            nodeEnter.append("rect")
                .attr("y", -this.barHeight / 2)
                .attr("height", this.barHeight)
                .attr("width", this.barWidth)
                .style("fill", this.color)
                .on("click", this.click);
            nodeEnter.append("text")
                .attr("dy", 3.5)
                .attr("dx", 5.5)
                .text(function(d) { return d.data.name; });
            // Transition nodes to their new position.
            nodeEnter.transition()
                .duration(this.duration)
                .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
                .style("opacity", 1);
            node.transition()
                .duration(this.duration)
                .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
                .style("opacity", 1)
                .select("rect")
                .style("fill", this.color);
            // Transition exiting nodes to the parent's new position.
            node.exit().transition()
                .duration(this.duration)
                .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
                .style("opacity", 0)
                .remove();
            // Update the links
            let link = svg.selectAll(".link")
                .data(this.root.links(), function(d) { return d.target.id; });
            // Enter any new links at the parent's previous position.
            link.enter().insert("path", "g")
                .attr("class", "link")
                .attr("d", function(d) {
                    var o = {x: source.x0, y: source.y0};
                    return diagonal({source: o, target: o});
                })
                .transition()
                .duration(this.duration)
                .attr("d", diagonal);
            // Transition links to their new position.
            link.transition()
                .duration(this.duration)
                .attr("d", diagonal);
            // Transition exiting nodes to the parent's new position.
            link.exit().transition()
                .duration(this.duration)
                .attr("d", function(d) {
                    var o = {x: source.x, y: source.y};
                    return diagonal({source: o, target: o});
                })
                .remove();
            // Stash the old positions for transition.
            this.root.each(function(d) {
                d.x0 = d.x;
                d.y0 = d.y;
            });
        },
        click: function (d) {
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }
            this.update(d);
        },
        color: function (d) {
            return d._children ? "#3182bd" : d.children ? "#c6dbef" : "#fd8d3c";
        },
        getData: function () {
            return {
                name: "flare",
                children: [
                    {
                        name: "analytics",
                        children: [
                            {
                                name: "cluster",
                                children: [
                                    { name: "AgglomerativeCluster", size: 3938 },
                                    { name: "CommunityStructure", size: 3812 },
                                    { name: "HierarchicalCluster", size: 6714 },
                                    { name: "MergeEdge", size: 743 }
                                ]
                            }
                        ]
                    }
                ]
            }
        }
    }
}
</script>

<style>
.node rect {
    cursor: pointer;
    fill: #fff;
    fill-opacity: 0.5;
    stroke: #3182bd;
    stroke-width: 1.5px;
}

.node text {
    font: 10px sans-serif;
    pointer-events: none;
}

.link {
    fill: none;
    stroke: #9ecae1;
    stroke-width: 1.5px;
}
</style>
