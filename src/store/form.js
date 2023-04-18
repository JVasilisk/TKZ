import { createContext, useContext } from 'react';
import { makeAutoObservable } from "mobx";

const schema = {
  nodes: [
    {
      id: 1,
      potential: 1.15,
      isFinal: true
    },
    {
      id: 2,
      potential: 0.5,
      provisionalPotential: 0,
      isFinal: false
    },
    {
      id: 3,
      potential: 1,
      isFinal: true
    },
    {
      id: 4,
      potential: 1.15,
      isFinal: true
    },
    {
      id: 5,
      potential: 0.5,
      provisionalPotential: 0,
      isFinal: false
    },
    {
      id: 6,
      potential: 0,
      isFinal: true
    }
  ],
  branches: [
    {
      id: 1,
      resistance: 0.25,
      conductance: 4,
      startNode: 1,
      endNode: 2
    },
    {
      id: 2,
      resistance: 1.15,
      conductance: 0.869565217,
      startNode: 3,
      endNode: 5
    },
    {
      id: 3,
      resistance: 0.55,
      conductance: 1.818181818,
      startNode: 4,
      endNode: 5
    },
    {
      id: 4,
      resistance: 1.5,
      conductance: 0.666666667,
      startNode: 2,
      endNode: 5
    },
    {
      id: 5,
      resistance: 1.87,
      conductance: 0.534759358,
      startNode: 2,
      endNode: 6
    },
    {
      id: 6,
      resistance: 0.92,
      conductance: 1.086956522,
      startNode: 5,
      endNode: 6
    }
  ]
};

class FormState {
  nodes = [...schema.nodes];
  branches = [...schema.branches];
  accuracy = 0.001;
  voltage = '';

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get current() {
    return this.voltage ? (1000 / Math.sqrt(3) / this.voltage).toFixed(2) : 0
  }

  get result() {
    return {}
  }

  get printValue() {
    console.log(this.current, this.voltage)
  }

  setAccuracy(value) {
    this.accuracy = value;
  }

  setVoltage(value) {
    this.voltage = value;
  }

  addNode({ potential, conditional }) {
    this.nodes.push({
      id: this.nodes.length + 1,
      potential,
      conditional
    })
  }

  addBranch({ resistance, startNode, endNode }) {
    this.branches.push({
      id: this.branches.length + 1,
      resistance,
      conductance: 1 / resistance,
      startNode,
      endNode
    })
  }
}

const FormStateContext = createContext(new FormState());
const useFormState = () => useContext(FormStateContext);

export { FormState, FormStateContext, useFormState }
