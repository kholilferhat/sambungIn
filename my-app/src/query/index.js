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
    Company {
      companyLogo
      email
      name
    }
    title
    jobType
    description
    Skills {
      level
      name
    }
  }
}
`