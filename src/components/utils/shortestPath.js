import { getDirectionGroup } from "../Game/store/utils";
function PriorityQueue() {
  this._nodes = [];

  this.enqueue = function(priority, key) {
    this._nodes.push({ key: key, priority: priority });
    this.sort();
  };
  this.dequeue = function() {
    return this._nodes.shift().key;
  };
  this.sort = function() {
    this._nodes.sort(function(a, b) {
      return a.priority - b.priority;
    });
  };
  this.isEmpty = function() {
    return !this._nodes.length;
  };
}

/**
 * Pathfinding starts here
 */

export function Graph(mazeLength) {
  var INFINITY = 1 / 0;
  this.mazeLength = mazeLength;
  this.vertices = {};
  this.distances = {};
  this.addVertex = function(name, edges) {
    this.vertices[name] = edges;
  };

  this.shortestPath = function(start, finish) {
    let nodes = new PriorityQueue(),
      previous = {},
      path = [],
      smallest,
      vertex,
      neighbor,
      alt,
      previousDirectionGroup;

    for (vertex in this.vertices) {
      if (vertex === start) {
        this.distances[vertex] = 0;
        nodes.enqueue(0, vertex);
      } else {
        this.distances[vertex] = INFINITY;
        nodes.enqueue(INFINITY, vertex);
      }

      previous[vertex] = null;
    }

    while (!nodes.isEmpty()) {
      smallest = nodes.dequeue();

      if (smallest === finish) {
        path = [];

        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }

        break;
      }

      if (!smallest || this.distances[smallest] === INFINITY) {
        continue;
      }

      for (neighbor in this.vertices[smallest]) {
        alt = this.distances[smallest] + this.vertices[smallest][neighbor];

        const smallestNum = Number(smallest);
        const neighborNum = Number(neighbor);

        previousDirectionGroup = getDirectionGroup(smallestNum, neighborNum);
        if (smallest !== start) {
          const currentDirectionGroup = getDirectionGroup(
            smallestNum,
            neighborNum
          );
          if (currentDirectionGroup !== previousDirectionGroup) {
            alt += 2;
          }
        }

        if (alt < this.distances[neighbor]) {
          this.distances[neighbor] = alt;
          // Need to
          previous[neighbor] = smallest;

          nodes.enqueue(alt, neighbor);
        }
      }
    }

    return path;
  };
}
