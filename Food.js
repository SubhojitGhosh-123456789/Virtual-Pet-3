class Food{
    constructor(foodStock, lastFed){
        this.image = loadImage("Milk.png");
        this.image1 = loadImage("Food Stock.png")
        this.foodStock = 20;
        this.lastFed = lastFed;
    }

    getFoodStock(){
        var getFoodStockRef = database.ref('Food');
        getFoodStockRef.on("value", function(data){
            foods = data.val();
        })

    }

    updateFoodStock(count){
        database.ref("/").update({
            Food : count
        })
    }

    deductFoodStock(count){
        database.ref("/").update({
            Food : count--
        })
    }

    display(){

        imageMode(CENTER);
        image(this.image1,720,270,100,100);

        var x = 50, y = 150;

        if(this.foodStock!=0){
           for(var i=0; i<this.foodStock; i++){
               if(i%10==0){
                   x=50;
                   y=y+50;
               }
               image(this.image,x,y,50,50);
               x=x+30;
           }
        }
    }
}

