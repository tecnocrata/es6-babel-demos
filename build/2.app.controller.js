/**
 * Using Rails-like standard naming convention for endpoints.
 * GET      /api/admin/apps/:name             -> getUserApplicationByName
 * GET      /api/admin/apps/filter            -> getFilteredUserApplications
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserApplicationByName = getUserApplicationByName;
exports.getFilteredUserApplications = getFilteredUserApplications;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

var _model = require('../../../common/enums/model.enums');

var _errorfactory = require('../../../infrastructure/errorfactory');

var _errorfactory2 = _interopRequireDefault(_errorfactory);

var _postgres = require('../../../common/db/postgres');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Get application using  its name
function getUserApplicationByName(req, res, next) {
  var appName = req.params.name;

  if (!appName) {
    return new Promise(function (resolve, reject) {
      next(_errorfactory2.default.new(_httpStatusCodes2.default.BAD_REQUEST, 'The parameter "name" (aka appname) is required in the path.'));
      resolve(res);
    });
  } else {
    var abxUser = req.user.userid;
    var allowAccess = true;
    var sql = 'SELECT partner."partnerName", partner."partnerFullName",' + 'partnerApp."appRequirements",' + 'app."appName", app."appFullName", app."description", app."appStatus",' + 'CASE WHEN userApp."installed" IS  NULL THEN false ELSE userApp."installed" END AS "installed"' + ' FROM "Partners" partner' + ' INNER JOIN "PartnerApplications" partnerApp ON partnerApp."partnerId" = partner."partnerId"' + ' INNER JOIN "Applications" app ON app."applicationId" = partnerApp."applicationId"' + ' AND app."appName" = $1' + ' INNER JOIN "AllowedApplications" allowApp ON allowApp."applicationId" = app."applicationId"' + ' AND allowApp."companyId" = (' + ' SELECT comp."companyId"' + ' FROM "Companies" comp' + ' INNER JOIN "AbxUsers" abxuser ON abxuser."companyId" = comp."companyId"' + ' WHERE abxuser."abxUserId" = $2)' + ' AND allowApp."allowedAccess" = $3' + ' LEFT JOIN "UserApplications" userApp ON userApp."applicationId" = allowApp."applicationId"' + ' AND userApp."abxUserId" = $2;';

    return _postgres.db.any(sql, [appName, abxUser, allowAccess]).then(function (data) {
      if (data.length === 0) {
        throw _errorfactory2.default.new(_httpStatusCodes2.default.NOT_FOUND, 'Application not found or user has not installed the application');
      }

      var application = {};
      var app = {};
      var partner = {};
      var installed = data[0].installed;

      app.appName = data[0].appName;
      app.appFullName = data[0].appFullName;
      app.description = data[0].description;
      app.appStatus = data[0].appStatus;
      app.appRequirements = [data[0].appRequirements];

      partner.partnerName = data[0].partnerName;
      partner.partnerFullName = data[0].partnerFullName;

      application.app = app;
      application.partner = partner;
      application.installed = installed;

      res.status(_httpStatusCodes2.default.OK).json(application);
    }).catch(next);
  }
}

function getFilteredUserApplications(req, res, next) {
  var appInstalled = req.query.installed || null;
  var appStatus = req.query.status || null;
  var size = req.query.size || null;

  var appInstalledIsValid = _lodash2.default.includes(['true', 'false', true, false, null], appInstalled);
  var appStatusIsValid = _lodash2.default.includes(['active', 'inactive', 'comingsoon', null], appStatus);
  var sizeValid = size === null || parseFloat(size) === parseInt(size) && !isNaN(size);

  if (size !== null) sizeValid = size < 0 ? false : true;

  if (!appInstalledIsValid || !appStatusIsValid || !sizeValid) {

    return new Promise(function (resolve, reject) {
      next(_errorfactory2.default.new(_httpStatusCodes2.default.BAD_REQUEST, 'Invalid data for parameters: installed or status or size'));
      resolve(res);
    });
  } else {

    switch (appStatus) {
      case 'active':
        appStatus = _model.applicationStatus.ACTIVE.value;break;
      case 'inactive':
        appStatus = _model.applicationStatus.INACTIVE.value;break;
      case 'comingsoon':
        appStatus = _model.applicationStatus.COMING_SOON.value;break;
    }

    size = size || null;

    return _postgres.db.func('"abx_getFilteredUserApplications"', [req.user.userid, appStatus, appInstalled, size]).then(function (data) {
      var result = _lodash2.default.map(data, function (item) {
        return {
          app: {
            appName: item.appName,
            appFullName: item.appFullName,
            description: item.description,
            appStatus: item.appStatus,
            appRequirements: [item.appRequirements]
          },
          partner: {
            partnerName: item.partnerName,
            partnerFullName: item.partnerFullName
          },
          installed: item.installed
        };
      });

      res.status(_httpStatusCodes2.default.OK).send(result);
    }).catch(next);
  }
}