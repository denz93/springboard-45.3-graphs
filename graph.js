class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.nodes.add(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    this.nodes.delete(vertex);
    for (let node of this.nodes) {
      if (node.adjacent.has(vertex)) {
        node.adjacent.delete(vertex);
      }
    }
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const visited = new Set();
    function dfs(node) {
      if (visited.has(node)) return [];
      visited.add(node)
      let result = [node.value]
      for (let neighbor of node.adjacent) {
        if (visited.has(neighbor)) continue;
        const deeper = dfs(neighbor)
        result = [...result, ...deeper]
      }
      return result

    }
    const result = dfs(start)
    return result
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const visited = new Set();
    const queue = [start]
    const result = []
    while (queue.length) {
      const node = queue.shift()
      if (visited.has(node)) continue
      visited.add(node)
      result.push(node.value)
      for (let neighbor of node.adjacent) {
        if (visited.has(neighbor)) continue
        queue.push(neighbor)
      }
    }
    return result
  }
}

module.exports = {Graph, Node}