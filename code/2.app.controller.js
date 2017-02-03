/**
 * Using Rails-like standard naming convention for endpoints.
 * GET      /api/admin/apps/:name             -> getUserApplicationByName
 * GET      /api/admin/apps/filter            -> getFilteredUserApplications
 */

'use strict';

import _ from 'lodash';
import httpStatus from 'http-status-codes';
import { applicationStatus } from '../../../common/enums/model.enums';
import errorFactory from '../../../infrastructure/errorfactory';
import { db } from '../../../common/db/postgres';

// Get application using  its name
export function getUserApplicationByName(req, res, next) {
  let appName = req.params.name;

  if (!appName) {
    return new Promise((resolve, reject) => {
      next(errorFactory.new(httpStatus.BAD_REQUEST, 'The parameter "name" (aka appname) is required in the path.'));
      resolve(res);
    });
  } else {
    let abxUser = req.user.userid;
    let allowAccess = true;
    let sql = 'SELECT partner."partnerName", partner."partnerFullName",' +
      'partnerApp."appRequirements",' +
      'app."appName", app."appFullName", app."description", app."appStatus",' +
      'CASE WHEN userApp."installed" IS  NULL THEN false ELSE userApp."installed" END AS "installed"' +
      ' FROM "Partners" partner' +
      ' INNER JOIN "PartnerApplications" partnerApp ON partnerApp."partnerId" = partner."partnerId"' +
      ' INNER JOIN "Applications" app ON app."applicationId" = partnerApp."applicationId"' +
      ' AND app."appName" = $1' +
      ' INNER JOIN "AllowedApplications" allowApp ON allowApp."applicationId" = app."applicationId"' +
      ' AND allowApp."companyId" = (' +
      ' SELECT comp."companyId"' +
      ' FROM "Companies" comp' +
      ' INNER JOIN "AbxUsers" abxuser ON abxuser."companyId" = comp."companyId"' +
      ' WHERE abxuser."abxUserId" = $2)' +
      ' AND allowApp."allowedAccess" = $3' +
      ' LEFT JOIN "UserApplications" userApp ON userApp."applicationId" = allowApp."applicationId"' +
      ' AND userApp."abxUserId" = $2;';

    return db.any(sql, [appName, abxUser, allowAccess])
      .then(data => {
        if (data.length === 0) {
          throw errorFactory.new(httpStatus.NOT_FOUND, 'Application not found or user has not installed the application');
        }

        let application = {};
        let app = {};
        let partner = {};
        let installed = data[0].installed;

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

        res.status(httpStatus.OK).json(application);
      })
      .catch(next);
  }

}

export function getFilteredUserApplications(req, res, next) {
  let appInstalled = req.query.installed || null;
  let appStatus = req.query.status || null;
  let size = req.query.size || null;

  let appInstalledIsValid = _.includes(['true', 'false', true, false, null], appInstalled);
  let appStatusIsValid = _.includes(['active', 'inactive', 'comingsoon', null], appStatus);
  let sizeValid = size === null || ((parseFloat(size) === parseInt(size)) && !isNaN(size))

  if (size !== null)
    sizeValid = size < 0 ? false : true;

  if (!appInstalledIsValid || !appStatusIsValid || !sizeValid) {

    return new Promise((resolve, reject) => {
      next(errorFactory.new(httpStatus.BAD_REQUEST, 'Invalid data for parameters: installed or status or size'));
      resolve(res);
    });
  }else {

    switch (appStatus) {
      case 'active': appStatus = applicationStatus.ACTIVE.value; break;
      case 'inactive': appStatus = applicationStatus.INACTIVE.value; break;
      case 'comingsoon': appStatus = applicationStatus.COMING_SOON.value; break;
    }

    size = size || null;

    return db.func(`"abx_getFilteredUserApplications"`, [req.user.userid, appStatus, appInstalled, size])
      .then(data => {
        let result = _.map(data, function(item) {
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

        res.status(httpStatus.OK).send(result);
      })
      .catch(next);
  }
}
