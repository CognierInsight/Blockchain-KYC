import * as Hapi from "hapi";
import { IDatabase } from "../database/database";
import { IHyperledgerConfiguration, IServerConfigurations } from "../configurations";
import { LoggerInstance } from 'winston';
import MemberController from './member-controller';
import { jwtValidator } from '../auth/auth-validator';
import * as Joi from 'joi';
import ComposerConnectionManager from '../composer/composer-connection-manager';
import * as RequestValidator from "./member-validator";

export default function (
  server: Hapi.Server,
  serverConfigs: IServerConfigurations,
  database: IDatabase,
  hyperledger: IHyperledgerConfiguration,
  logger: LoggerInstance,
  connectionManager: ComposerConnectionManager
) {

  const controller = new MemberController(serverConfigs, database, hyperledger, logger, connectionManager);
  server.bind(controller);

  server.route({
    method: 'GET',
    path: `/members`,
    config: {
      handler: controller.getList,
      tags: ['api', 'members'],
      auth: 'jwt',
      description: `Get member list.`,
      validate: {
        headers: jwtValidator
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '201': {
              'description': `member list returned.`,
            },
            '401': {
              'description': `member list not found.`
            }
          }
        }
      }
    }
  });

  server.route({
    method: 'GET',
    path: `/members/query`,
    config: {
      handler: controller.getListByQuery,
      tags: ['api', 'members'],
      auth: 'jwt',
      description: `Get members list by query`,
      validate: {
        headers: jwtValidator
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '201': {
              'description': `member list returned.`,
            },
            '401': {
              'description': `member list not found.`
            }
          }
        }
      }
    }
  });

  server.route({
    method: 'POST',
    path: `/members`,
    config: {
      handler: controller.create,
      tags: ['api', 'members'],
      description: `Create a member.`,
      auth: 'jwt',
      validate: {
        payload: RequestValidator.createModel,
        headers: jwtValidator
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '201': {
              'description': `Created member.`
            }
          }
        }
      }
    }
  });

  server.route({
    method: 'PUT',
    path: `/members/{id}`,
    config: {
      handler: controller.update,
      tags: ['api', 'member'],
      description: `Update member by id.`,
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
              'description': `Updated member.`,
            },
            '404': {
              'description': `member does not exists.`
            }
          }
        }
      }
    }
  });

  server.route({
    method: 'DELETE',
    path: `/members/{id}`,
    config: {
      handler: controller.delete,
      tags: ['api', 'members'],
      description: `Delete member by id.`,
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
              'description': `Deleted member.`,
            },
            '404': {
              'description': `member does not exists.`
            }
          }
        }
      }
    }
  });

  server.route({
    method: 'GET',
    path: `/members/{id}`,
    config: {
      handler: controller.getById,
      tags: ['api', 'members'],
      description: `Get member by id.`,
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
              'description': `member found.`
            },
            '404': {
              'description': `member does not exists.`
            }
          }
        }
      }
    }
  });

  server.route({
    method: 'GET',
    path: `/members/{id}/documents`,
    config: {
      handler: controller.getAllDocumentsForMemberByQuery,
      tags: ['api', 'members'],
      description: `Get all documents for the member`,
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
              'description': `document for member found.`
            },
            '404': {
              'description': `member does not exists.`
            }
          }
        }
      }
    }
  });

  server.route({
    method: 'GET',
    path: `/members/{id}/keys`,
    config: {
      handler: controller.getAllKeysForMemberByQuery,
      tags: ['api', 'members'],
      description: `Get all keys for the member`,
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
              'description': `key for member found.`
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
