import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import {Http} from '@angular/http';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Tasty Schnitzel',
  //     'A super-tasty Schnitzel - just awesome!',
  //     'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
  //     [
  //       new Ingredient('Meat', 1),
  //       new Ingredient('French Fries', 20)
  //     ]),
  //   new Recipe('Big Fat Burger',
  //     'What else you need to say?',
  //     'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
  //     [
  //       new Ingredient('Buns', 2),
  //       new Ingredient('Meat', 1)
  //     ])
  // ];

  constructor(private slService: ShoppingListService, private http: Http) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.http.get('http://localhost:3000/api/recipes');
    // return this.recipes.slice();
  }

  getRecipeFromList() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    // return this.http.get('http://localhost:3000/api/recipes/' + index )
    return this.recipes[index];

  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    // this.recipes.push(recipe);
    // this.recipesChanged.next(this.recipes.slice());

    return this.http.post('http://localhost:3000/api/recipes', recipe);

  }

  updateRecipe(id: number, newRecipe: Recipe) {
    return this.http.put('http://localhost:3000/api/recipes/' + id, newRecipe);
  }

  deleteRecipe(id: number) {
    return this.http.delete('http://localhost:3000/api/recipes/' + id);
  }

  private handleError(error: any): Promise<any> {
    console.log('handleError');
    return Promise.reject(error.message || error);
  }
}
