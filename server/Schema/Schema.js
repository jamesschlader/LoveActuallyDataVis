const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = graphql;
const { Actor } = require("../models/Actor");
const { Scene } = require("../models/Scene");

const ActorType = new GraphQLObjectType({
  name: "Actor",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    role: {
      type: GraphQLString
    },
    sceneIds: {
      type: new GraphQLList(GraphQLID)
    },
    scenes: {
      type: new GraphQLList(SceneType),
      resolve(parent, args) {
        return parent.sceneIds.map(id => Scene.findById({ _id: id }));
      }
    }
  })
});

const SceneType = new GraphQLObjectType({
  name: "Scene",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    scene: {
      type: new GraphQLNonNull(GraphQLString)
    },
    actorIds: {
      type: new GraphQLList(GraphQLID)
    },
    actors: {
      type: new GraphQLList(ActorType),
      resolve(parent, args) {
        return parent.actorIds.map(id => Actor.findById({ _id: id }));
      }
    }
  })
});

////////////////////////////////////////////////////////
////// CRUD Operations Start Here           ////////////
////////////////////////////////////////////////////////

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // Actor Read Methods...
    actor: {
      type: ActorType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        //Code that gets data from db for a scene
        return Actor.findById(args.id);
      }
    },
    actors: {
      type: new GraphQLList(ActorType),
      resolve(parent, args) {
        return Actor.find({});
      }
    },

    // End Actor Read Methods...

    // Scene Read Methods...
    scene: {
      type: SceneType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        //Code that get data from db for a scene
        return Scene.findById(args.id);
      }
    },
    scenes: {
      type: new GraphQLList(SceneType),
      resolve(parent, args) {
        return Scene.find({});
      }
    }
  }

  // End Scene Read Methods
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // Actor CUD Methods...
    addActor: {
      type: ActorType,
      args: {
        name: { type: GraphQLString },
        role: { type: GraphQLString },
        sceneIds: { type: new GraphQLList(GraphQLID) }
      },
      resolve(parent, args) {
        let actor = new Actor({
          ...args
        });
        return actor.save();
      }
    },

    updateActor: {
      type: ActorType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        role: { type: GraphQLString },
        sceneIds: { type: new GraphQLList(GraphQLID) }
      },
      resolve(parent, args) {
        return Actor.findOneAndUpdate(
          args.id,
          {
            ...args
          },
          { upsert: true }
        );
      }
    },

    deleteActor: {
      type: ActorType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Actor.findByIdAndRemove({ _id: args.id });
      }
    },

    // End Actor CUD methods...

    // Begin Scene CUD methods...

    addScene: {
      type: SceneType,
      args: {
        scene: { type: GraphQLString },
        actorIds: { type: new GraphQLList(GraphQLID) }
      },

      resolve(parent, args) {
        let scene = new Scene({
          ...args
        });
        return scene.save();
      }
    },

    updateScene: {
      type: SceneType,
      args: {
        id: { type: GraphQLID },
        scene: { type: GraphQLString },
        actorIds: { type: new GraphQLList(GraphQLID) }
      },
      resolve(parent, args) {
        return Scene.findOneAndUpdate(args.id, {
          ...args
        });
      }
    },

    deleteScene: {
      type: SceneType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Scene.findByIdAndRemove({ _id: args.id });
      }
    }
  }

  // End Scene CUD Methods...
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
