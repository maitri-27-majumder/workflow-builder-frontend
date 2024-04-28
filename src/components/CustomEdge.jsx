import {
    BaseEdge,
    EdgeLabelRenderer,
    getStraightPath,
    useReactFlow,
  } from 'reactflow';
   
  export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY }) {
    const { setEdges } = useReactFlow();
    const [edgePath] = getStraightPath({
      sourceX,
      sourceY,
      targetX,
      targetY,
    });
   
    return (
      <>
        <BaseEdge id={id} path={edgePath} />
        <EdgeLabelRenderer>
          <button 
            onClick={() => setEdges((edges) => edges.filter((e) => e.id !== id))}
          >
            delete
          </button>
        </EdgeLabelRenderer>
      </>
    );
  }