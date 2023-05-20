const fs = require('fs')
const path = require('path')
const { v4: uuid } = require('uuid')

const supabase = require('../../service/supabase')

const dataPath = path.join(__dirname, '..', '..', 'data', 'recipes.json')
const data = fs.readFileSync(dataPath, 'utf8')
const recipes = JSON.parse(data)

const insertData = async () => {
  for (const recipe of recipes) {
    const recipeInsertResult = await supabase
      .from('recipes')
      .insert([{ id: uuid(), name: recipe.name }])
      .select('*')

    if (recipeInsertResult.error) {
      console.error('Error inserting recipe:', recipeInsertResult.error)
      continue
    }

    const recipeId = recipeInsertResult.data[0].id

    const ingredientInserts = recipe.ingredient.map((ingredient) => ({
      id: uuid(),
      recipe_id: recipeId,
      name: ingredient.name,
      quantity: ingredient.quantity,
    }))
    const instructionInserts = recipe.instruction.map((instruction) => ({
      id: uuid(),
      recipe_id: recipeId,
      step: instruction,
    }))

    const [ingredientInsertResult, instructionInsertResult] = await Promise.all([
      supabase.from('ingredients').insert(ingredientInserts),
      supabase.from('instructions').insert(instructionInserts),
    ])

    if (ingredientInsertResult.error) {
      console.error('Error inserting ingredients:', ingredientInsertResult.error)
    }
    if (instructionInsertResult.error) {
      console.error('Error inserting instructions:', instructionInsertResult.error)
    }
  }
}

insertData()
