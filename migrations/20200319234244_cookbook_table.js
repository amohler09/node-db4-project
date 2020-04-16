exports.up = function(knex) {
  return knex.schema
    .createTable("recipe_names", tbl => {
      tbl.increments();

      tbl
        .string("name", 255)
        .notNullable()
        .unique();
    })

    .createTable("recipe_instructions", tbl => {
      tbl.primary("recipe_id");

      tbl.integer("step_number").notNullable();

      tbl.string("instructions", 800).notNullable();

      tbl
        .integer("recipe_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("recipe_names")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })

    .createTable("ingredients", tbl => {
      tbl.increments();

      tbl.string("name", 255).notNullable();
    })

    .createTable("measurements", tbl => {
      tbl.primary(["recipe_id", "ingredient_id"]);

      tbl.integer("quantity").notNullable();

      tbl.string("unit", 100);

      tbl
        .integer("recipe_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("recipe_names")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      tbl
        .integer("ingredient_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("ingredients")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex) {
    return (
        knex.schema
            .dropTableIfExists('measurements')
            .dropTableIfExists('ingredients')
            .dropTableIfExists('recipe_instructions')
            .dropTableIfExists('recipe_names')
    )
};
