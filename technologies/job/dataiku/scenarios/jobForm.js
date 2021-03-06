const axios = require('axios');
const { Response } = require('@saagie/sdk');
const { getAuthHeaders } = require('../utils');
const { ERRORS_MESSAGES, hasLoginError } = require('../errors');

/**
 * Example of function to retrieve select options from an external endpoint.
 * @param {Object} entity - Contains entity data including featuresValues.
 * @param {Object} entity.featuresValues - Contains all the values from the entity features declared in the context.yaml
 */
exports.getProjects = async ({ featuresValues }) => {
  try {
    const { data: projects } = await axios.get(
      `${featuresValues.endpoint.url}/public/api/projects/`,
      getAuthHeaders(featuresValues)
    );

    if (!projects || !projects.length) {
      return Response.empty(ERRORS_MESSAGES.NO_PROJECTS);
    }

    return Response.success(
      projects.map(({ name, projectKey }) => ({
        id: projectKey,
        label: name,
      })),
    );
  } catch (error) {
    if (hasLoginError(error)) {
      return Response.error(ERRORS_MESSAGES.LOGIN_ERROR, { error });
    }
    return Response.error(ERRORS_MESSAGES.PROJECTS_ERROR, { error });
  }
};

/**
 * Example of function to retrieve select options from an external endpoint.
 * @param {Object} entity - Contains entity data including featuresValues.
 * @param {Object} entity.featuresValues - Contains all the values from the entity features declared in the context.yaml
 */
exports.getScenarios = async ({ featuresValues }) => {
  try {
    const { data: datasets } = await axios.get(
      `${featuresValues.endpoint.url}/public/api/projects/${featuresValues.project.id}/scenarios/`,
      getAuthHeaders(featuresValues)
    );

    if (!datasets || !datasets.length) {
      return Response.empty(ERRORS_MESSAGES.NO_SCENARIOS);
    }

    return Response.success(
      datasets.map(({ id, name }) => ({
        id,
        label: name,
      })),
    );
  } catch (error) {
    return Response.error(ERRORS_MESSAGES.SCENARIOS_ERROR, { error });
  }
};
