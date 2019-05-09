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
      previousDirectionGroup = {};
    this.priorities[start] = {};
    this.alt = null;
    this.prioritieSum = 0;

    if (this.vertices[start][finish]) {
      this.alt = this.vertices[start][finish];
      this.priorities = {
        [start]: { ...this.vertices[start] },
        [finish]: 0
      };
      this.prioritieSum = this.vertices[start][finish];
      return [finish];
    }

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
          if (previous[smallest] === start) {
            this.prioritieSum += this.priorities[start][smallest];
          } else {
            this.prioritieSum += this.priorities[smallest];
          }
          path.push(smallest);
          smallest = previous[smallest];
        }

        break;
      }

      if (!smallest || distances[smallest] === INFINITY) {
        continue;
      }
      previousDirectionGroup[smallest] = {};
      for (neighbor in this.vertices[smallest]) {
        let points = 0;

        const smallestNum = Number(smallest);
        const neighborNum = Number(neighbor);
        previousDirectionGroup[smallest][neighbor] = getDirectionGroup(
          smallestNum,
          neighborNum
        );
        if (smallest !== start && neighbor !== start) {
          const currentDirectionGroup = getDirectionGroup(
            smallestNum,
            neighborNum
          );
          if (
            currentDirectionGroup !==
            previousDirectionGroup[previous[smallest]][smallest]
          ) {
            points = 2;
          }
        } else if (neighbor === start) {
          this.priorities[start][smallest] = this.vertices[smallest][neighbor];
        }
        this.alt =
          distances[smallest] + this.vertices[smallest][neighbor] + points;

        if (this.alt < distances[neighbor]) {
          this.priorities[neighbor] = points;
          distances[neighbor] = this.alt;

          previous[neighbor] = smallest;

          this.nodes.enqueue(this.alt, neighbor);
        }
      }
    }

    return path;
  };
}
