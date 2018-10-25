/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * A Member revokes access to their record from another Member.
 * @param {org.quickkyc.revokeKeyAccess} revoke - the revoke key transaction
 * @transaction
 */
function revokeKeyAccess(revoke){
  var me = getCurrentParticipant();
  
  if(!me) {
        throw new Error('A participant/certificate mapping does not exist.');
  }
  
  var key =  getAssetRegistry('org.quickkyc.keys#'+ revoke.keyID);
  var current = new Date();
  
  console.log("time compare" + key.endTime + "--" + current );
  
  if(key.keyTypeObject === 'time' && key.endTime > current){
    console.log("revoked access based on time");
    key.status = false;
    return getAssetRegistry('org.quickkyc.keys').then(function (assetRegistry) {
        return assetRegistry.update(key);
    });
  }
  else if(key.keyTypeObject === 'views' && key.views == 0){	
    //key.views = make.keyObject.views;
    key.views = key.views - 1;
    key.status = false;
    return getAssetRegistry('org.quickkyc.keys').then(function (assetRegistry) {
        return assetRegistry.update(key);
    });
  }
  else if(key.keyTypeObject === 'permanent'){
    //code to revoke permanent access
    // if the member is authorized, we remove them
    var index = me.authorized ? me.authorized.indexOf(revoke.memberId) : -1;

    if(index>-1) {
        me.authorized.splice(index, 1);

        return getParticipantRegistry('org.quickkyc.Member')
        .then(function (memberRegistry) {

            // emit an event
            var event = getFactory().newEvent('org.quickkyc', 'MemberEvent');
            event.memberTransaction = revoke;
            emit(event);

            // persist the state of the member
            return memberRegistry.update(me);
        });
    }
  }
  else{
    throw new Error('Illegal Key type.');
  }
}


/**
 * A Member revokes access to their record from another Member.
 * @param {org.quickkyc.searchKey} search - the revoke key transaction
 * @transaction
 */
function searchKey(search){
  var me = getCurrentParticipant();
  
  var key =  getAssetRegistry('org.quickkyc.keys#'+ search.keyObject.keyID);
  var current = new Date();
  console.log("time compare" + key.endTime + "--" + current );
  if(key.keyTypeObject === 'time' && key.endTime > current){
    console.log("revoked access based on time");
    key.status = false;
    return getAssetRegistry('org.quickkyc.keys').then(function (assetRegistry) {
        return assetRegistry.update(key);
    });
  }
  else if(key.keyTypeObject === 'views' && key.views != 0){	
    //key.views = make.keyObject.views;
    key.views = key.views - 1;
    key.status = false;
    return getAssetRegistry('org.quickkyc.keys').then(function (assetRegistry) {
        return assetRegistry.update(key);
    });
  }
  else if(key.keyTypeObject === 'permanent'){
    //code to revoke permanent access
    // if the member is authorized, we remove them
    var index = me.authorized ? me.authorized.indexOf(search.memberId) : -1;

    if(index>-1) {
        me.authorized.splice(index, 1);

        return getParticipantRegistry('org.quickkyc.Member')
        .then(function (memberRegistry) {

            // emit an event
            var event = getFactory().newEvent('org.quickkyc', 'MemberEvent');
            event.memberTransaction = search;
            emit(event);

            // persist the state of the member
            return memberRegistry.update(me);
        });
    }
  }
  else{
    throw new Error('Illegal Key type.');
  }
}

/**
 * A Member revokes access to their record from another Member.
 * @param {org.quickkyc.createKey} make - the create key to be processed
 * @transaction
 */
function createKey(make) {
  console.log(make);
  var sharedKey = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 64; i++)
    sharedKey += possible.charAt(Math.floor(Math.random() * possible.length));
  var me = getCurrentParticipant();
  
  var key =  getFactory().newResource('org.quickkyc','keys',make.keyObject.keyID);
  //key.cartonId = make.Id;
  
  var now = new Date();
  key.MemberObject = me;
  key.startTime = now;
  key.keyTypeObject = make.keyObject.keyTypeObject;
  //var documents = ["resource:org.acme.pii.document#2256"]; //query('selectCommoditiesByOwner');
  //key.documentObject = query('selectCommoditiesByOwner');
  //if(!key) {
  //      throw new Error('A key/certificate mapping does not exist.');
  //  }
 
  key.documentObject = [];
  
  if(make.keyObject.keyTypeObject === 'time'){
    var revokeTime = make.timestamp;
    //var hours = 2; //make.hours;
    
    key.hours = make.keyObject.hours;
    if(key.hours > 0 )
      revokeTime.setTime(revokeTime.getTime() + (key.hours)*60*60*1000);
    else
      revokeTime.setTime(revokeTime.getTime() + 2*60*60*1000);

    //var tomorrow = make.timestamp;
    //tomorrow.setDate(tomorrow.getDate() + 1);
    key.endTime = revokeTime;
    key.views = 0;
    return getAssetRegistry('org.quickkyc.keys').then(function (assetRegistry) {
        return assetRegistry.add(key);
    });
  }
  else if(key.keyTypeObject === 'views'){	
    key.views = make.keyObject.views;
    key.hours = 0;
    var expTime = new Date();
    expTime.setYear(expTime.getYear()+ 1);
    key.endTime = new Date();
    return getAssetRegistry('org.quickkyc.keys').then(function (assetRegistry) {
        return assetRegistry.add(key);
    });
  }
  else if(key.keyTypeObject === 'permanent'){
    //var me = getCurrentParticipant();
    console.log('**** AUTH: ' + me.getIdentifier() + ' granting access to ' + make.memberId );

    if(!me) {
        throw new Error('A participant/certificate mapping does not exist.');
    }

    // if the member is not already authorized, we authorize them
    var index = -1;

    if(!me.authorized) {
        me.authorized = [];
    }
    else {
        index = me.authorized.indexOf(make.memberId);
    }

    if(index < 0) {
        me.authorized.push(make.memberId);

        return getParticipantRegistry('org.quickkyc.Member')
        .then(function (memberRegistry) {

            // emit an event
            //var event = getFactory().newEvent('org.acme.pii', 'MemberEvent');
            //event.memberTransaction = make;
            //emit(event);

            // persist the state of the member
            return memberRegistry.update(me);
        });
    }
  }
  
}