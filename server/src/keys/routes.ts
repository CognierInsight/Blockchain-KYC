import * as Hapi from "hapi";
import { IDatabase } from "../database/database";
import { IHyperledgerConfiguration, IServerConfigurations } from "../configurations";
import { LoggerInstance } from 'winston';
import keyController from './key-controller';
import { jwtValidator } from '../auth/auth-validator';
import * as Joi from 'joi';
import ComposerConnectionManager from '../composer/composer-connection-manager';
import * as RequestValidator from "./key-validator";

export default function (
  server: Hapi.Server,
  serverConfigs: IServerConfigurations,
  database: IDatabase,
  hyperledger: IHyperledgerConfiguration,
  logger: LoggerInstance,
  connectionManager: ComposerConnectionManager
) {

  const controller = new keyController(serverConfigs, database, hyperledger, logger, connectionManager);
  server.bind(controller);

  server.route({
    method: 'GET',
    path: `/key`,
    config: {
      handler: controller.getList,
      tags: ['api', 'key'],
      auth: 'jwt',
      description: `Get key list.`,
      validate: {
        headers: jwtValidator
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '201': {
              'description': `key list returned.`,
            },
            '401': {
              'description': `key list not found.`
            }
          }
        }
      }
    }
  });

  server.route({
    method: 'POST',
    path: `/key`,
    config: {
      handler: controller.create,
      tags: ['api', 'key'],
      description: `Create a key.`,
      auth: 'jwt',
      validate: {
        payload: RequestValidator.createModel,
        headers: jwtValidator
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '201': {
              'description': `Created key.`
            }
          }
        }
      }
    }
  });

  server.route({
    method: 'PUT',
    path: `/key/{id}`,
    config: {
      handler: controller.update,
      tags: ['api', 'key'],
      description: `Update key by id.`,
      auth: 'jwt',
      validate: {
        params: {
          id: Joi.string().required()
        },
        payload: RequestValidator.updateModel,
        headers: jwtValidator
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              'description': `Updated key.`,
            },
            '404': {
              'description': `key does not exists.`
            }
          }
        }
      }
    }
  });

  server.route({
    method: 'DELETE',
    path: `/key/{id}`,
    config: {
      handler: controller.delete,
      tags: ['api', 'key'],
      description: `Delete key by id.`,
      auth: 'jwt',
      validate: {
        params: {
          id: Joi.string().required()
        },
        headers: jwtValidator
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              'description': `Deleted key.`,
            },
            '404': {
              'description': `key does not exists.`
            }
          }
        }
      }
    }
  });

  server.route({
    method: 'GET',
    path: `/key/{id}`,
    config: {
      handler: controller.getById,
      tags: ['api', 'key'],
      description: `Get key by id.`,
      auth: 'jwt',
      validate: {
        params: {
          id: Joi.string().required()
        },
        headers: jwtValidator
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              'description': `key found.`
            },
            '404': {
              'description': `key does not exists.`
            }
          }
        }
      }
    }
  });
}
