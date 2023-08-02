package algorithm

import "fmt"

func GetSSC(nodeInput *NodeInput) [][]string{
	// nodes := []Node{
	// 	{"A", []string{"B"}, -1, -1, false},
	// 	{"B", []string{"C","D"}, -1, -1, false},
	// 	{"C", []string{"A"}, -1, -1, false},
	// 	{"D", []string{"E"}, -1, -1, false},
	// 	{"E", []string{"F"}, -1, -1, false},
	// 	{"F", []string{"E"}, -1, -1, false},
	// }
	// nodeArray := NodeArray {nodes}
	nodeArray := InputToNodeArray(nodeInput)
	return tarjansSSC(nodeArray)
}

func tarjansSSC(nodeArray *NodeArray) [][]string {
	var sscs [][]string
	index := 0
	stack := make([]string, 0)
	sscsptr := &sscs
	stackptr := &stack

	// set id and low_link for each node to -1
	for _,node := range nodeArray.nodes{
		node.id = -1
		node.low_link = -1
	}	

	for _, node := range nodeArray.nodes {
		if !node.visited {
			dfsSSC(node.name, nodeArray, sscsptr, &index, stackptr)
		}
	}

	return sscs

}

func dfsSSC(nodeName string, nodeArray *NodeArray, sscsptr *[][]string, index *int, stackptr *[]string){
	var v *Node
	var err error
	v, err = getNodeByName(nodeArray, nodeName)
	if (err != nil){
		return
	}
	v.id = *index
	v.low_link = *index
	*index++
	*stackptr = append(*stackptr, v.name)
	v.visited = true

	for _, neighborName := range v.neighbours {
		var neighbor *Node
		neighbor, err = getNodeByName(nodeArray, neighborName)
		if(err != nil){
			break
		}

		if !neighbor.visited {
			dfsSSC(neighbor.name, nodeArray, sscsptr, index, stackptr)
			v.low_link = min(v.low_link, neighbor.low_link)
		} else if isOnStack(*stackptr,neighbor.name) {
			v.low_link = min(v.low_link, neighbor.id)
		}
	}

	if v.low_link == v.id {
		var scc []string
		for {
			stack := *stackptr
			w := stack[len(*stackptr)-1]
			*stackptr = stack[:len(*stackptr)-1]
			scc = append(scc, w)
			if w == v.name {
				break
			}
		}
		*sscsptr = append(*sscsptr, scc)
	}
}


func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func isOnStack(stack []string, nodeName string) bool{
	for _,stackName := range stack{
		if(stackName == nodeName){
			return true
		}
	}
	return false
}

func getNodeByName(nodeArray *NodeArray, name string) (*Node, error) {
	for i := 0; i < len(nodeArray.nodes); i++ {
		if nodeArray.nodes[i].name == name {
			return &nodeArray.nodes[i], nil
		}
	}
	return &nodeArray.nodes[0], fmt.Errorf("Node not found")
}