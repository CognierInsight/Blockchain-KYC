import * as Hapi from "hapi";
import { IDatabase } from "../database/database";
import { IHyperledgerConfiguration, IServerConfigurations } from "../configurations";
import { LoggerInstance } from 'winston';
import documentController from './document-controller';
import { jwtValidator } from '../auth/auth-validator';
import * as Joi from 'joi';
import ComposerConnectionManager from '../composer/composer-connection-manager';
import * as RequestValidator from "./document-validator";

export default function (
  server: Hapi.Server,
  serverConfigs: IServerConfigurations,
  database: IDatabase,
  hyperledger: IHyperledgerConfiguration,
  logger: LoggerInstance,
  connectionManager: ComposerConnectionManager
) {

  const controller = new documentController(serverConfigs, database, hyperledger, logger, connectionManager);
  server.bind(controller);

  server.route({
    method: 'GET',
    path: `/documents`,
    config: {
      handler: controller.getList,
      tags: ['api', 'documents'],
      auth: 'jwt',
      description: `Get document list.`,
      validate: {
        headers: jwtValidator
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '201': {
              'description': `document list returned.`,
            },
            '401': {
              'description': `document list not found.`
            }
          }
        }
      }
    }
  });

  server.route({
    method: 'POST',
    path: `/documents`,
    config: {
      handler: controller.create,
      tags: ['api', 'documents'],
      description: `Create a document.`,
      auth: 'jwt',
      validate: {
        payload: RequestValidator.createModel,
        headers: jwtValidator
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '201': {
              'description': `Created document.`
            }
          }
        }
      }
    }
  });

  server.route({
    method: 'PUT',
    path: `/documents/{id}`,
    config: {
      handler: controller.update,
      tags: ['api', 'documents'],
      description: `Update document by documentId.`,
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
              'description': `Updated document.`,
            },
            '404': {
              'description': `document does not exists.`
            }
          }
        }
      }
    }
  });

/*  server.route({
    method: 'PUT',
    path: `/trucks/{id}/change-driver`,
    config: {
      handler: controller.changeTruckDriverWithTransaction,
      tags: ['api', 'trucks'],
      description: `Update truck driver.`,
      auth: 'jwt',
      validate: {
        params: {
          id: Joi.string().required()
        },
        payload: RequestValidator.changeDriverModel,
        headers: jwtValidator
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              'description': `Updated truck driver.`,
            },
            '404': {
              'description': `truck does not exists.`
            }
          }
        }
      }
    }
  });
*/
  server.route({
    method: 'DELETE',
    path: `/documents/{id}`,
    config: {
      handler: controller.delete,
      tags: ['api', 'documents'],
      description: `Delete document by id.`,
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
              'description': `Deleted document.`,
            },
            '404': {
              'description': `document does not exists.`
            }
          }
        }
      }
    }
  });

  server.route({
    method: 'GET',
    path: `/documents/{id}`,
    config: {
      handler: controller.getById,
      tags: ['api', 'documents'],
      description: `Get document by id.`,
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
              'description': `document found.`
            },
            '404': {
              'description': `documents does not exists.`
            }
          }
        }
      }
    }
  });
}
