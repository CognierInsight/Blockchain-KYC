export class ComposerModel {

  static QUERY = {
    //SELECT_ALL_TRUCKS_FOR_DRIVER: 'selectAllTrucksForDriver',
    //SELECT_ALL_DRIVERS: 'selectAllDrivers',
    SELECT_ALL_MEMBERS: 'selectAllMembers',
    SELECT_ALL_KEYS_BY_MEMBERS: 'selectAllKeysByMember',
    SELECT_ALL_DOCUMENTS_BY_MEMBERS: 'selectAllDocumentsByMember'
  };

  static PARTICIPANT = {
    MEMBER: 'Member',
    DRIVER: 'Driver'
  };

  static CONCEPT = {
    ADDRESS: 'Address',
    KYC: 'Kyc'
  };

  static ASSET = {
    DOCUMENTS: 'Documents',
    KEYS:'Keys',
    CATEGORY: 'Category'
    //CARGO: 'Cargo',
    //TRUCK: 'Truck',
  };

  static TRANSACTION = {
    CREATE_KEY: 'createKey',
    SEARCH_KEY: 'search',
    REVOKE_KEY_ACCESS: 'revokeKeyAccess',
    MEMBER_TRANSACTION: 'MemberTransaction',
    KEY_TRANSACTION: 'keyTransaction'
    //CHANGE_TRUCK_DRIVER: 'ChangeTruckDriver'
  };

  static NAMESPACE = 'org.quickkyc';
}

export enum ComposerTypes {
  Member,
  Kyc,
  Documents,
  Keys,
  Driver,
  Category,
  CreateKey,
  Search,
  RevokeKeyAccess,
  MemberTransaction,
  KeyTransaction
}
