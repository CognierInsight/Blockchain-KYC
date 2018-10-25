import { ComposerModel, ComposerTypes } from './composer-model';
import { MemberInterface } from "../members/member";
import { IKey } from "../keys/key";
import { IDocument } from "../documents/document";
import { ICategory} from "../category/category";

// import { IDriver } from "../drivers/driver";
// import { ITruck } from "../trucks/truck";
// import {ICargo} from "../cargo/cargo";

export class ComposerModelFactory {

  /**
   * Constructor for the ComposerModelFactory class
   * @param businessNetworkDefinition
   */
  constructor(private businessNetworkDefinition: any) {
  }

  /**
   * Get the namespace for the specified asset, participant or transaction
   * @param {ComposerTypes} type
   * @param {string} id
   * @returns {string}
   */
  getNamespaceForResource(type: ComposerTypes, id: string = ""): string {
    switch (type) {
      // case ComposerTypes.Truck:
      //   return `resource:${ComposerModel.NAMESPACE}.${ComposerModel.ASSET.TRUCK}#${id}`;
      case ComposerTypes.Member:
        return `resource:${ComposerModel.NAMESPACE}.${ComposerModel.PARTICIPANT.MEMBER}#${id}`;
      case ComposerTypes.Documents:
        return `resource:${ComposerModel.NAMESPACE}.${ComposerModel.ASSET.DOCUMENTS}#${id}`;
      case ComposerTypes.Keys:
        return `resource:${ComposerModel.NAMESPACE}.${ComposerModel.ASSET.KEYS}#${id}`;
      case ComposerTypes.Category:
        return `resource:${ComposerModel.NAMESPACE}.${ComposerModel.ASSET.CATEGORY}#${id}`;
      case ComposerTypes.CreateKey:
        return `${ComposerModel.NAMESPACE}.${ComposerModel.TRANSACTION.CREATE_KEY}`;
      case ComposerTypes.RevokeKeyAccess:
        return `${ComposerModel.NAMESPACE}.${ComposerModel.TRANSACTION.REVOKE_KEY_ACCESS}`;
      case ComposerTypes.Search:
        return `${ComposerModel.NAMESPACE}.${ComposerModel.TRANSACTION.SEARCH_KEY}`;
      case ComposerTypes.MemberTransaction:
        return `${ComposerModel.NAMESPACE}.${ComposerModel.TRANSACTION.MEMBER_TRANSACTION}`;
      case ComposerTypes.KeyTransaction:
        return `${ComposerModel.NAMESPACE}.${ComposerModel.TRANSACTION.KEY_TRANSACTION}`;
      // case ComposerTypes.Driver:
      //   return `resource:${ComposerModel.NAMESPACE}.${ComposerModel.PARTICIPANT.DRIVER}#${id}`;
      // case ComposerTypes.Cargo:
      //   return `resource:${ComposerModel.NAMESPACE}.${ComposerModel.ASSET.CARGO}#${id}`;
      // case ComposerTypes.ChangeTruckDriver:
      //   return `${ComposerModel.NAMESPACE}.${ComposerModel.TRANSACTION.CHANGE_TRUCK_DRIVER}`;
    }
  }

  /**
   * Create new driver Composer model entity for saving
   * @param {MemberInterface} member
   * @returns {any}
   */
  createMember(member: MemberInterface): any {
    const factory = this.businessNetworkDefinition.getFactory();
    // We create a new resource through the factory, we set the driver.id as the resource identifier as specified in the cto model file
    const newMember = factory.newResource(ComposerModel.NAMESPACE, ComposerModel.PARTICIPANT.MEMBER, member.id);

    newMember.email = member.email;
    newMember.password = member.password;
    newMember.firstName = member.firstName;
    newMember.lastName = member.lastName;
    newMember.dob = member.dob; //yyyy-mm-dd
    newMember.contact = member.contact;
    //newMember.authorized = member.authorized;

    // Creating a address
    //newMember.address = this.createConcept(ComposerModel.CONCEPT.ADDRESS);
    //newMember.address.street = member.address.street;
    //newMember.address.country = member.address.country;
    //newMember.address.city = member.address.city;
    //newMember.address.state = member.address.state;
    //newMember.address.zip = member.address.zip;

    //creating a kyc process
    //newMember.kycDetails = this.createConcept(ComposerModel.CONCEPT.KYC);
    //newMember.kycDetails.status = member.kycDetails.status;
    //newMember.kycDetails.documentRequired = member.kycDetails.documentRequired;

    return newMember;
  }

  /**
   * Update member Composer model entity, to be saved later
   * @param composerEntity
   * @param {MemberInterface} member
   * @returns {any}
   */
  editMember(composerEntity: any, member: MemberInterface) {
    // For demo purposes the email address also can be changed
    // of course if you match the business network card name to the email address you should not allow this
    //composerEntity.email = driver.email;
    composerEntity.firstName = member.firstName;
    composerEntity.lastName = member.lastName;
    composerEntity.dob = member.dob;
    composerEntity.authorized = member.authorized;
    composerEntity.address = this.createConcept(ComposerModel.CONCEPT.ADDRESS);
    composerEntity.address.street = member.address.street;
    composerEntity.address.country = member.address.country;
    composerEntity.address.city = member.address.city;
    composerEntity.address.state = member.address.state;
    composerEntity.address.zip = member.address.zip;

    //creating a kyc process
    composerEntity.kycDetails = this.createConcept(ComposerModel.CONCEPT.KYC);
    composerEntity.kycDetails.status = member.kycDetails.status;
    composerEntity.kycDetails.documentRequired = member.kycDetails.documentRequired;

    return composerEntity;
  }

/**
   * Create new document Composer model entity for saving
   * @param {IDocument} document
   * @returns {any}
   */
  createDocument(document: IDocument): any {
    const factory = this.businessNetworkDefinition.getFactory();
    const newDocument = factory.newResource(ComposerModel.NAMESPACE, ComposerModel.ASSET.DOCUMENTS, document.id);

    newDocument.documentName = document.documentName;
    newDocument.documentImage = document.documentImage;
    newDocument.status = document.status;
    if (document.MemberObject) {
      newDocument.MemberObject = this.createRelationship(ComposerModel.PARTICIPANT.MEMBER, document.MemberObject);
    }
    if (document.categoryObject) {
      newDocument.categoryObject = this.createRelationship(ComposerModel.ASSET.CATEGORY, document.categoryObject);
    }
    // newDriver.cargo = [];
    // if (truck.cargoIds && truck.cargoIds.length > 0) {
    //   for (const id of truck.cargoIds) {
    //     newTruck.cargo.push(this.createRelationship(ComposerModel.ASSET.CARGO, id));
    //   }
    // }
    return newDocument;
  }

  /**
   * Update document Composer model entity, to be saved later
   * @param composerEntity
   * @param {IDocument} document
   * @returns {any}
   */
  editDocument(composerEntity: any, document: IDocument) {
    composerEntity.documentName = document.documentName;
    composerEntity.documentImage = document.documentImage;

    if (document.MemberObject) {
      composerEntity.MemberObject = this.createRelationship(ComposerModel.PARTICIPANT.MEMBER, document.MemberObject);
    } else {
      composerEntity.MemberObject = null;
    }

    if (document.categoryObject) {
      composerEntity.categoryObject = this.createRelationship(ComposerModel.ASSET.CATEGORY, document.categoryObject);
    }

    // composerEntity.cargo = [];
    // if (truck.cargoIds && truck.cargoIds.length > 0) {
    //   composerEntity.cargo = [];
    //   for (const id of truck.cargoIds) {
    //     composerEntity.cargo.push(this.createRelationship(ComposerModel.ASSET.CARGO, id));
    //   }
    // }
    return composerEntity;
  }

  /**
   * Create new truck Composer model entity for saving
   * @param {IKey} key
   * @returns {any}
   */
  createKey(key: IKey): any {
    const factory = this.businessNetworkDefinition.getFactory();
    const newKey = factory.newResource(ComposerModel.NAMESPACE, ComposerModel.ASSET.KEYS, key.id);

    newKey.keyTypeObject = key.keyTypeObject;
    newKey.startTime = key.startTime;

    if (key.keyTypeObject === "time") {
      newKey.hours = key.hours;
      newKey.endTime = key.endTime;
    }else if (key.keyTypeObject === "views") {
      newKey.views = key.views;
    }else if (key.keyTypeObject === "permanent") {
      newKey.authorized = key.authorized;
    }
    newKey.status = key.status;
    if (key.MemberObject) {
      newKey.MemberObject = this.createRelationship(ComposerModel.PARTICIPANT.MEMBER, key.MemberObject);
    }
    newKey.documentObject = [];
    if (key.documentIds && key.documentIds.length > 0) {
      for (const id of key.documentIds) {
        newKey.documentObject.push(this.createRelationship(ComposerModel.ASSET.DOCUMENTS, id));
      }
    }
    return newKey;
  }

  /**
   * Update truck Composer model entity, to be saved later
   * @param composerEntity
   * @param {IKey} key
   * @returns {any}
   */
  editKey(composerEntity: any, key: IKey) {

    if (key.keyTypeObject === "time") {
      composerEntity.hours = key.hours;
      composerEntity.endTime = key.endTime;
    }else if (key.keyTypeObject === "views") {
      composerEntity.views = key.views;
    }else if (key.keyTypeObject === "permanent") {
      composerEntity.authorized = key.authorized;
    }
    composerEntity.status = key.status;
    if (key.MemberObject) {
      composerEntity.MemberObject = this.createRelationship(ComposerModel.PARTICIPANT.MEMBER, key.MemberObject);
    }
    composerEntity.documentObject = [];
    if (key.documentIds && key.documentIds.length > 0) {
      for (const id of key.documentIds) {
        composerEntity.documentObject.push(this.createRelationship(ComposerModel.ASSET.DOCUMENTS, id));
      }
    }

    return composerEntity;
  }

  /**
   * Create new cargo Composer model entity for saving
   * @param {ICategory} category
   * @returns {any}
   */
  createCategory(category: ICategory): any {
    const factory = this.businessNetworkDefinition.getFactory();
    const newCargo = factory.newResource(ComposerModel.NAMESPACE, ComposerModel.ASSET.CATEGORY, category.id);

    newCargo.categoryName = category.categoryName;
    newCargo.description = category.description;

    return newCargo;
  }

  /**
   * Update cargo Composer model entity, to be saved later
   * @param composerEntity
   * @param {ICategory} category
   * @returns {any}
   */
  editCategory(composerEntity: any, category: ICategory) {
    composerEntity.categoryName = category.categoryName;
    composerEntity.description = category.description;
    return composerEntity;
  }
  // /**
  //  * Create new truck Composer model entity for saving
  //  * @param {ITruck} truck
  //  * @returns {any}
  //  */
  // createTruck(truck: ITruck): any {
  //   const factory = this.businessNetworkDefinition.getFactory();
  //   const newTruck = factory.newResource(ComposerModel.NAMESPACE, ComposerModel.ASSET.TRUCK, truck.id);

  //   newTruck.code = truck.code;

  //   if (truck.driverId) {
  //     newTruck.driver = this.createRelationship(ComposerModel.PARTICIPANT.DRIVER, truck.driverId);
  //   }

  //   newTruck.cargo = [];
  //   if (truck.cargoIds && truck.cargoIds.length > 0) {
  //     for (const id of truck.cargoIds) {
  //       newTruck.cargo.push(this.createRelationship(ComposerModel.ASSET.CARGO, id));
  //     }
  //   }

  //   return newTruck;
  // }

  // /**
  //  * Update truck Composer model entity, to be saved later
  //  * @param composerEntity
  //  * @param {ITruck} truck
  //  * @returns {any}
  //  */
  // editTruck(composerEntity: any, truck: ITruck) {
  //   composerEntity.code = truck.code;

  //   if (truck.driverId) {
  //     composerEntity.driver = this.createRelationship(ComposerModel.PARTICIPANT.DRIVER, truck.driverId);
  //   } else {
  //     composerEntity.driver = null;
  //   }

  //   composerEntity.cargo = [];
  //   if (truck.cargoIds && truck.cargoIds.length > 0) {
  //     composerEntity.cargo = [];
  //     for (const id of truck.cargoIds) {
  //       composerEntity.cargo.push(this.createRelationship(ComposerModel.ASSET.CARGO, id));
  //     }
  //   }

  //   return composerEntity;
  // }


  // /**
  //  * Create new cargo Composer model entity for saving
  //  * @param {ICargo} cargo
  //  * @returns {any}
  //  */
  // createCargo(cargo: ICargo): any {
  //   const factory = this.businessNetworkDefinition.getFactory();
  //   const newCargo = factory.newResource(ComposerModel.NAMESPACE, ComposerModel.ASSET.CARGO, cargo.id);

  //   newCargo.name = cargo.name;
  //   newCargo.type = cargo.type;

  //   return newCargo;
  // }

  // /**
  //  * Update cargo Composer model entity, to be saved later
  //  * @param composerEntity
  //  * @param {ICargo} cargo
  //  * @returns {any}
  //  */
  // editCargo(composerEntity: any, cargo: ICargo) {
  //   composerEntity.name = cargo.name;
  //   composerEntity.type = cargo.type;
  //   return composerEntity;
  // }

  /**
   * Create a new Hyperledger Composer concept
   * @param {string} conceptName
   * @returns {any}
   */
  createConcept(conceptName: string): any {
    return this.businessNetworkDefinition.getFactory().newConcept(ComposerModel.NAMESPACE, conceptName);
  }

  /**
   * Create a new Hyperledger Composer relationship pointing to an asset or  participant
   * @param {string} type
   * @param {string} identifier
   * @returns {any}
   */
  createRelationship(type: string, identifier: string): any {
    return this.businessNetworkDefinition.getFactory().newRelationship(ComposerModel.NAMESPACE, type, identifier);
  }
}
