import { gql } from "@apollo/client";

export const GET_JOBS = gql`
  query ExampleQuery {
    jobs {
      title
      Company {
        name
        email
        companyLogo
      }
      Skills {
        name
        level
      }
      description
      jobType
      id
    }
  }
`

export const GET_JOB_BY_ID = gql`
  query JobDetail($jobDetailId: ID!) {
  jobDetail(id: $jobDetailId) {
    title
    mongoAuthor
    jobType
    id
    description
    companyId
    Skills {
      level
      name
    }
    Company {
      name
      email
      companyLogo
    }
  }
}
`

export const GET_USER_BY_ID = gql`
  query UserDetail($id: String!) {
    userDetail(_id: $id) {
      email
      username
    }
  }
`