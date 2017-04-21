Test = new Mongo.Collection("test", {
  transform: function(doc) {
  	console.log(doc);
    if (Meteor.isClient) {
      if (doc._encrypted) {
        doc.data = CryptoJS.AES.decrypt(doc.data_enc, Session.get("passphrase")).toString(CryptoJS.enc.Utf8);
        delete doc.data_enc;
        delete doc._encrypted;
      }
    }
    return doc;
  }
});