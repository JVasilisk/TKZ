const baseU = 115;
const baseI = 1000 / Math.sqrt(3) / baseU;


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

function stop(nodes) {
  const result = nodes.some(
    ({ isFinal }) => isFinal
     
  );
  console.log(result);
  return result;
}

const nodes = schema.nodes.filter(({ isFinal }) => !isFinal);
var count = 0;

do {
  nodes.forEach((node) => {
    const nodeBranches = schema.branches.filter(
      ({ startNode, endNode }) => startNode === node.id || endNode === node.id
    );

    const conductance = nodeBranches
      .map(({ conductance }) => conductance)
      .reduce((result, value) => result + value);

    const value1 = 1 / conductance;

    const value2 = nodeBranches
      .map(({ startNode, endNode, conductance }) => {
        const nodeId = node.id === startNode ? endNode : startNode;
        const potential = schema.nodes.find(({ id }) => id === nodeId).potential;

        return conductance * potential;
      })
      .reduce((result, value) => result + value);

    console.log(
      count,
      "nodeId = ",
      node.id,
      "before potential =",
      node.potential,
      Math.abs(node.potential - value1 * value2)
    );
    node.isFinal = Math.abs(node.potential - value1 * value2) >= 0.001
    node.potential = value1 * value2;
    console.log(
      count,
      "nodeId = ",
      node.id,
      "after potential =",
      node.potential
    );
  });

  count++;
} while (stop(nodes) && count !== 10);
// const result = 1

const kzNode = schema.nodes.find(({ potential }) => potential === 0);

const kzNodeBranches = schema.branches.filter(
  ({ startNode, endNode }) => startNode === kzNode.id || endNode === kzNode.id
);

const I = kzNodeBranches.map(({ id, startNode, endNode, conductance }) => {
  const nodeId = kzNode.id === startNode ? endNode : startNode;
  const potential = schema.nodes.find(({ id }) => id === nodeId).potential;

  const result = Math.abs(kzNode.potential - potential) * conductance

  console.log(`Ток ${nodeId}-${kzNode.id} = ${result}`);
  return result;
})

const fullI = I.reduce((result, value) => result + value)
const fullIKA = fullI * baseI
const fullIHitKA = fullIKA * Math.sqrt(2) * 2

console.log(`Полный ток КЗ, О.Е.= ${fullI}`);
console.log(`Полный ток КЗ, кА = ${fullIKA}`);
console.log(`Ударный ток КЗ, кА = ${fullIHitKA}`);



