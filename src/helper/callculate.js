export default ({ nodes, branches, current, accuracy}) => {

  const schema = {
    nodes1: JSON.parse(JSON.stringify(nodes)),
    branches: JSON.parse(JSON.stringify(branches))
  }
  function stop(nodes2) {
    const result = nodes2.some(
      ({ isFinal }) => isFinal

    );
    console.log(result);
    return result;
  }

  const nodes2 = schema.nodes1.filter(({ isFinal }) => !isFinal);
  var count = 0;

  do {
    nodes2.forEach((node) => {
      const nodeBranches = schema.branches.filter(
        ({ startNode, endNode }) => startNode === node.id || endNode === node.id
      );

      const conductance = nodeBranches
        .map(({ conductance }) => conductance)
        .reduce((result, value) => result + value, 0);

      const value1 = 1 / conductance;

      const value2 = nodeBranches
        .map(({ startNode, endNode, conductance }) => {
          const nodeId = node.id === startNode ? endNode : startNode;
          const potential = schema.nodes1.find(({ id }) => id === nodeId).potential;

          return conductance * potential;
        })
        .reduce((result, value) => result + value, 0);

      console.log(
        count,
        "nodeId = ",
        node.id,
        "before potential =",
        node.potential,
        Math.abs(node.potential - value1 * value2)
      );
      node.isFinal = Math.abs(node.potential - value1 * value2) >= accuracy
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
  } while (stop(nodes2) && count !== 10);
  // const result = 1

  const kzNode = schema.nodes1.find(({ potential }) => potential === 0);

  const kzNodeBranches = schema.branches.filter(
    ({ startNode, endNode }) => startNode === kzNode?.id || endNode === kzNode?.id
  );

  const I = kzNodeBranches.map(({ id, startNode, endNode, conductance }) => {
    const nodeId = kzNode.id === startNode ? endNode : startNode;
    const potential = schema.nodes1.find(({ id }) => id === nodeId).potential;

    const result = Math.abs(kzNode.potential - potential) * conductance

    console.log(`Ток ${nodeId}-${kzNode.id} = ${result}`);
    return result;
  })

  const fullI = I.reduce((result, value) => result + value, 0)
  const fullIKA = fullI * current
  const fullIHitKA = fullIKA * Math.sqrt(2) * 2

  console.log(`Полный ток КЗ, О.Е.= ${fullI}`);
  console.log(`Полный ток КЗ, кА = ${fullIKA}`);
  console.log(`Ударный ток КЗ, кА = ${fullIHitKA}`);

  return {
    fullIKA,
    fullIHitKA
  }
}