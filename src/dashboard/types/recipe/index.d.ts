
declare namespace Types {
  export type IRecipeType =
    | "breakfast"
    | "appetizer"
    | "main"
    | "dessert"
    | "drink"
    | "vegan"
    | "other"
    | "";
}

declare namespace Entities {

  export interface IRecipe extends Creatable {
    _id: mongoose.Schema.Types.ObjectId;
    userId: mongoose.Schema.Types.ObjectId;
    title: string;
    description: string;
    type: IRecipeType
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
    _id: mongoose.Schema.Types.ObjectId;
    recipeId: mongoose.Schema.Types.ObjectId;
    userId: mongoose.Schema.Types.ObjectId;
    text: string;
    rating: 1 | 2 | 3 | 4 | 5;
    images: string[];
    createdAt?: Date;
    updatedAt?: Date;
  }
}


