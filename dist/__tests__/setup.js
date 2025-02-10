"use strict";

var fail = function fail(msg) {
  return {
    message: function message() {
      return msg;
    },
    pass: false
  };
};

expect.extend({
  toConformToJSONAPI: function toConformToJSONAPI(received) {
    if (!Array.isArray(received.data) && typeof received.data !== 'object') return fail('expected response to have a `data` property');

    if (Array.isArray(received.data)) {
      if (typeof received.next !== 'boolean') return fail('expected response to have a boolean `next` property');
      if (typeof received.skip !== 'number') return fail('expected response to have a `skip` property');
    }

    return {
      message: function message() {
        return 'expected response to conform to JSON API';
      },
      pass: true
    };
  },
  toHaveDocumentIdentity: function toHaveDocumentIdentity(received) {
    if (!received.id) return fail('expected document to have an `id` property');
    if (!received._id) return fail('expected document to have an `_id` property');
    if (!received._type) return fail('expected document to have a `_type` property');
    return {
      message: function message() {
        return 'expected document to be normalized';
      },
      pass: true
    };
  }
});
jest.spyOn(console, 'warn').mockImplementation(function (msg) {
  throw new Error(msg);
}); // In Node v7 unhandled promise rejections will terminate the process

if (!process.env.LISTENING_TO_UNHANDLED_REJECTION) {
  process.on('unhandledRejection', function (reason) {
    console.log('REJECTION', reason);
  }); // Avoid memory leak by adding too many listeners

  process.env.LISTENING_TO_UNHANDLED_REJECTION = true;
}