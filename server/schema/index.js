const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLScalarType,
  } = require("graphql");

  const db = require("../models");
  
  const carType = new GraphQLObjectType({
    name: "Car",
    fields: () => ({
      _id: {
        type: new GraphQLNonNull(GraphQLID),
        description: "ID",
      },
      make: {
        type: new GraphQLNonNull(GraphQLString),
        description: "The brand of the car.",
      },
      model: {
        type: new GraphQLNonNull(GraphQLString),
        description: "The model of the car.",
      },
      colour: {
        type: new GraphQLNonNull(GraphQLString),
        description: "The colour of the car.",
      },
      year: {
        type: new GraphQLNonNull(GraphQLInt),
        description: "The build year of the car.",
      },
      location_id: {
        type: new GraphQLNonNull(GraphQLInt),
        description: "The id of designated parking spot for the car.",
      },
      location_description: {
        type: GraphQLString,
        description: "The description of designated parking spot for the car.",
      },
      user: {
        type: new GraphQLNonNull(GraphQLID),
        description: "the user ID of the owner",
      },
      createdAt: {
        type: new GraphQLNonNull(GraphQLString),
        description: "entry created time",
      },
    }),
  });
     
  const rootQuery = new GraphQLObjectType({
    name: "Query",
    fields: {
      cars: {
        type: new GraphQLList(carType),
        resolve: async () => {
          try {
            return await db.Car.find()
            .sort({ createdAt: "desc" }) || [];
          } catch (err) {
            return new Error(err.message);
          }
        },
      },
      car: {
        type: carType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLID),
          },
        },
        resolve: async (_, args) => {
          try {
            return await db.Car.findById(args.id);
          } catch (err) {
            return new Error(err.message);
          }
        },
      },
    },
  });

  const rootMutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        placeHolderField: {
            type: GraphQLBoolean,
            resolve: () => (true)
        }
    },
  });
  
  module.exports = new GraphQLSchema({
    query: rootQuery,
    mutation: rootMutation,
  });