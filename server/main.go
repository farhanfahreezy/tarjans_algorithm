package main

import (
	"example/server/algorithm"
	"example/server/initializers"
	"fmt"

	"github.com/gin-gonic/gin"
)

func init(){
	initializers.LoadEnvVariables()
}

func mainn(){
	fmt.Println("Hello123")
	r:= gin.Default()

	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "hello",
		})
	})

	r.GET("/Hellos", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"data":[]gin.H{{"nama":"Farhan", "umur": 20},
			{"nama":"Eji", "umur": 20},
			{"nama":"Gaga", "umur": 20},
			{"nama":"Bava", "umur": 20}},
		})
	})


	r.Run()
}

func main(){
	input := &algorithm.NodeInput{
		Nodes: [][]string{
			{"A","B"},
			{"B","C"},
			{"C","A"},
			{"B","D"},
			{"D","E"},
			{"E","F"},
			{"F","E"},
		},
	}

	sscs := algorithm.GetSSC(input)
	fmt.Println("SSC: ")
	for _,ssc:= range sscs{
			fmt.Println(ssc)
	}

	bridges := algorithm.GetBridges(input)
	fmt.Println("Bridge New: ")
	for _,bridge:= range bridges{
		fmt.Println(bridge)
	}
}