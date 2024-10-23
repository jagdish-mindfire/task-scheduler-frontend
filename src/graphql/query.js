import { gql } from "@apollo/client";

export const FETCH_ALL_TASKS_QUERY = gql`
  query GetAllTasks($sort : String!) {
     getAllTasks(sort:$sort) {
    _id,title,description,dueDate,isCompleted,
  }
  }
`;