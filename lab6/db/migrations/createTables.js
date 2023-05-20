const supabase = require('../../service/supabase')

const createTables = async () => {
  const { error: recipesError } = await supabase.rpc('create_recipes_table')

  const { error: ingredientsError } = await supabase.rpc('create_ingredients_table')

  const { error: instructionsError } = await supabase.rpc('create_instructions_table')

  if (recipesError || ingredientsError || instructionsError) {
    console.error('Error creating tables:', recipesError, ingredientsError, instructionsError)
    return
  }

  console.log('Successful creation of the tables')
}

createTables()
