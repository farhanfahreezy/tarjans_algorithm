package main

import (
	"example/server/initializers"
	"fmt"

	"github.com/gin-gonic/gin"
)

func init(){
	initializers.LoadEnvVariables()
}

func main(){
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