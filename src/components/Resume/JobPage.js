import React from 'react';
import PropTypes from 'prop-types';
import H1 from '../H1';
import BreadCrumb from '../BreadCrumb';
import { injectIntl, FormattedMessage } from 'react-intl';
import Helmet from 'react-helmet';
import JobDates from './JobDates';
import styled from 'styled-components';
import Technologies from './Technologies';
import Projects from './Projects';

const Header = styled.header`
  padding-bottom: ${({ theme }) => theme.scale(1)};
`;

const getBreadCrumb = (langKey) => [
  {
    link: `/${langKey}/resume/`,
    label: 'resume'
  },
  {
    link: `/${langKey}/resume/jobs-and-clients/`,
    label: 'resume.jobsAndClients'
  }
];

const Job = ({ job, intl }) => {
  const description = job.description;
  const langKey = intl.locale;

  return (
    <section>
      <FormattedMessage id="resume">
        {(resume) => (
          <Helmet
            title={`${resume} - ${job.name}`}
            meta={[{ name: 'description', content: description }]}
          />
        )}
      </FormattedMessage>
      <Header>
        <BreadCrumb
          items={getBreadCrumb(langKey)}
        />
        <H1>{job.name}</H1>
      </Header>
      <JobDates {...job.date} />
      <Projects 
        projects={job.projects} 
        langKey={langKey}
        job={job}
      />
      <Technologies technologies={job.technologies} />
    </section>
  );
};

Job.propTypes = {
  job: PropTypes.shape({
    name: PropTypes.string
  }),
  intl: PropTypes.object.isRequired
};

export default injectIntl(Job);