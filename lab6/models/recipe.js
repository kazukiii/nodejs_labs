const { v4: uuid } = require('uuid')
const supabase = require('../service/supabase')

module.exports = class Recipe {
  constructor(name, ingredient, instruction) {
    this.id = uuid()
    this.name = name
    this.ingredient = ingredient
    this.instruction = instruction
  }

  async save(callback) {
    const { data: recipeData, error: recipeError } = await supabase
      .from('recipes')
      .insert({ id: this.id, name: this.name })

    if (recipeError) {
      callback({ message: 'Could not insert recipe', status: 500 })
      return
    }

    for (const ingredient of this.ingredient) {
      const { data: ingredientData, error: ingredientError } = await supabase.from('ingredients').insert({
        id: uuid(),
        name: ingredient.name,
        quantity: ingredient.quantity,
        recipe_id: this.id,
      })

      if (ingredientError) {
        callback({ message: 'Could not insert ingredient', status: 500 })
        return
      }
    }

    for (const step of this.instruction) {
      const { data: instructionData, error: instructionError } = await supabase.from('instructions').insert({
        id: uuid(),
        step: step,
        recipe_id: this.id,
      })

      if (instructionError) {
        callback({ message: 'Could not insert instruction', status: 500 })
        return
      }
    }

    callback({ message: 'Recipe saved successfully', status: 201 })
  }

  static async fetchAllRecipes(callback) {
    const { data: recipesData, error: recipesError } = await supabase.from('recipes').select(`
      *,
      ingredients (
        *
      ),
      instructions (
        *
      )
    `)

    if (recipesError) {
      callback(null, { message: 'No recipe list found', err: recipesError })
      return
    }

    callback(recipesData)
  }
}
