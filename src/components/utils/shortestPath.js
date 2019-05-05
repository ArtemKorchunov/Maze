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
  this.priorities = {};
  this.vertices = {};
  this.addVertex = function(name, edges) {
    this.vertices[name] = edges;
  };
  this.nodes = new PriorityQueue();

  this.shortestPath = function(start, finish) {
    let previous = {},
      path = [],
      smallest,
      distances = {},
      vertex,
      neighbor,
      alt,
      previousDirectionGroup;

    for (vertex in this.vertices) {
      if (vertex === start) {
        distances[vertex] = 0;
        this.nodes.enqueue(0, vertex);
      } else {
        distances[vertex] = INFINITY;
        this.nodes.enqueue(INFINITY, vertex);
      }

      previous[vertex] = null;
    }

    while (!this.nodes.isEmpty()) {
      smallest = this.nodes.dequeue();

      if (smallest === finish) {
        path = [];

        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }

        break;
      }

      if (!smallest || distances[smallest] === INFINITY) {
        continue;
      }

      for (neighbor in this.vertices[smallest]) {
        let points = 0;

        const smallestNum = Number(smallest);
        const neighborNum = Number(neighbor);

        if (smallest !== start && neighbor !== start) {
          const currentDirectionGroup = getDirectionGroup(
            smallestNum,
            neighborNum
          );
          if (currentDirectionGroup !== previousDirectionGroup) {
            points = 2;
          }
        } else if (neighbor === start) {
          this.priorities[start] = this.vertices[smallest][neighbor];
        }

        alt = distances[smallest] + this.vertices[smallest][neighbor] + points;
        if (alt < distances[neighbor]) {
          this.priorities[neighbor] = points;
          distances[neighbor] = alt;
          // Need to
          previous[neighbor] = smallest;

          this.nodes.enqueue(alt, neighbor);
        }
        previousDirectionGroup = getDirectionGroup(smallestNum, neighborNum);
      }
    }

    return path;
  };
}
