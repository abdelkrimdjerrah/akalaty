declare namespace Entities {

  export interface IRecipe extends Creatable {
    _id: mongoose.Schema.Types.ObjectId;
    userId: mongoose.Schema.Types.ObjectId;
    title: string;
    description: string;
    type:
        "breakfast"
      | "appetizer"
      | "main"
      | "dessert"
      | "drink"
      | "vegan"
      | "other";
    rating: number;
    ingredients: [
      {
        name: string;
        amount: number;
        unit:
            "cups"
          | "ounces"
          | "grams"
          | "kilograms"
          | "tablespoons"
          | "milliliters"
          | "liters"
          | "count"
          | "teaspoons";
      }
    ];
    duration: number;
    images: string[];
    createdAt?: Date;
    updatedAt?: Date;
  }

  export interface IFeedback extends Creatable {
    recipeId: mongoose.Schema.Types.ObjectId;
    userId: mongoose.Schema.Types.ObjectId;
    text: string;
    rating: 1 | 2 | 3 | 4 | 5;
    images: string[];
    createdAt?: Date;
    updatedAt?: Date;
  }
}
