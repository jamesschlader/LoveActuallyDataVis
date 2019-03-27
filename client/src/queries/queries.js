import { gql } from "apollo-boost";

/////////////////////
/// Get ALL Actors///
////////////////////

const getActorsQuery = gql`
  {
    actors {
      id
      name
    }
  }
`;

/////////////////////
/// Get ONE Actor ///
////////////////////

const getActorQuery = gql`
  query($id: ID) {
    actor(id: $id) {
      id
      name
      role
      sceneIds
    }
  }
`;

/////////////////////////////////
/// Get ONE Actor with Scenes ///
////////////////////////////////

const getActorWithScenesQuery = gql`
  query($id: ID) {
    actor(id: $id) {
      id
      name
      role
      sceneIds
      scenes {
        scene
      }
    }
  }
`;

//////////////////////
/// Get ALL Scenes ///
/////////////////////

const getScenesQuery = gql`
  {
    scenes {
      id
      scene
    }
  }
`;

/////////////////////
/// Get ONE Scene ///
////////////////////

const getSceneQuery = gql`
  query($id: ID) {
    scene(id: $id) {
      id
      scene
      actorIds
      actors {
        id
        name
        role
      }
    }
  }
`;

//// ****************************////
////  Mutations!                ////
///////////////////////////////////

//////////////////////
/// Add Scene      ///
/////////////////////
const addSceneMutation = gql`
  mutation($scene: String!, $actorIds: [ID]) {
    addScene(scene: $scene, actorIds: $actorIds) {
      scene
      id
      actors {
        name
        role
      }
    }
  }
`;

//////////////////////
/// Update Scene   ///
/////////////////////
const updateSceneMutation = gql`
  mutation($id: ID!, $scene: String, $actorIds: [ID]) {
    updateScene(id: $id, scene: $scene, actorIds: $actorIds) {
      scene
      id
      actors {
        name
        role
      }
    }
  }
`;

/////////////////////
/// Add Actor     ///
////////////////////
const addActorMutation = gql`
  mutation($name: String!, $role: String, $sceneIds: [ID]) {
    addActor(name: $name, role: $role, sceneIds: $sceneIds) {
      name
      role
      id
      sceneIds
    }
  }
`;

/////////////////////
/// Update Actor  ///
////////////////////
const updateActorMutation = gql`
  mutation($id: ID!, $name: String, $role: String, $sceneIds: [ID]) {
    updateActor(id: $id, name: $name, role: $role, sceneIds: $sceneIds) {
      name
      role
      id
      sceneIds
    }
  }
`;

export {
  getActorsQuery,
  getScenesQuery,
  addSceneMutation,
  getSceneQuery,
  addActorMutation,
  getActorQuery,
  updateSceneMutation,
  updateActorMutation,
  getActorWithScenesQuery
};
