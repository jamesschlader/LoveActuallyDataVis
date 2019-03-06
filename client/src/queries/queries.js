import { gql } from "apollo-boost";

const getActorsQuery = gql`
  {
    actors {
      id
      name
    }
  }
`;

const getScenesQuery = gql`
  {
    scenes {
      id
      scene
    }
  }
`;

const addSceneMutation = gql`
  mutation($scene: String!) {
    addScene(scene: $scene) {
      scene
      id
    }
  }
`;

export { getActorsQuery, getScenesQuery, addSceneMutation };
