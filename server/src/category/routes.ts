import * as Hapi from "hapi";
import { IDatabase } from "../database/database";
import { IHyperledgerConfiguration, IServerConfigurations } from "../configurations";
import { LoggerInstance } from 'winston';
import categoryController from './category-controller';
import { jwtValidator } from '../auth/auth-validator';
import * as Joi from 'joi';
import ComposerConnectionManager from '../composer/composer-connection-manager';
import * as RequestValidator from "./category-validator";

export default function (
  server: Hapi.Server,
  serverConfigs: IServerConfigurations,
  database: IDatabase,
  hyperledger: IHyperledgerConfiguration,
  logger: LoggerInstance,
  connectionManager: ComposerConnectionManager
) {

  const controller = new categoryController(serverConfigs, database, hyperledger, logger, connectionManager);
  server.bind(controller);

  server.route({
    method: 'GET',
    path: `/categorys`,
    config: {
      handler: controller.getList,
      tags: ['api', 'categorys'],
      auth: 'jwt',
      description: `Get category list.`,
      validate: {
        headers: jwtValidator
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '201': {
              'description': `category list returned.`,
            },
            '401': {
              'description': `category list not found.`
            }
          }
        }
      }
    }
  });

  server.route({
    method: 'POST',
    path: `/categorys`,
    config: {
      handler: controller.create,
      tags: ['api', 'categorys'],
      description: `Create a category.`,
      auth: 'jwt',
      validate: {
        payload: RequestValidator.createModel,
        headers: jwtValidator
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '201': {
              'description': `Created category.`
            }
          }
        }
      }
    }
  });

  server.route({
    method: 'PUT',
    path: `/categorys/{id}`,
    config: {
      handler: controller.update,
      tags: ['api', 'categorys'],
      description: `Update category by id.`,
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
              'description': `Updated category.`,
            },
            '404': {
              'description': `category does not exists.`
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
    path: `/categorys/{id}`,
    config: {
      handler: controller.delete,
      tags: ['api', 'categorys'],
      description: `Delete category by id.`,
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
              'description': `Deleted category.`,
            },
            '404': {
              'description': `category does not exists.`
            }
          }
        }
      }
    }
  });

  server.route({
    method: 'GET',
    path: `/categorys/{id}`,
    config: {
      handler: controller.getById,
      tags: ['api', 'categorys'],
      description: `Get category by id.`,
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
              'description': `category found.`
            },
            '404': {
              'description': `categorys does not exists.`
            }
          }
        }
      }
    }
  });
}
