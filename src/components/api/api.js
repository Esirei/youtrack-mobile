import qs from 'qs';
import fields from './api__fields';

class Api {
  constructor(auth) {
    this.auth = auth;
    this.config = auth.config;

    this.youTrackUrl = this.config.backendUrl;
    this.youTrackIssueUrl = `${this.youTrackUrl}/api/issues`;
    this.youTrackIssuesFolderUrl = `${this.youTrackUrl}/api/issueFolders`;
  }

  makeAuthorizedRequest(url, method, body) {
    let sendRequest = () => {
      let authParams = this.auth.authParams;

      return fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
          'Authorization': `${authParams.token_type} ${authParams.access_token}`
        },
        body: JSON.stringify(body)
      });
    };

    return sendRequest()
      .then(res => {
        if (res.status === 401 || (res._bodyText && res._bodyText.indexOf('Token expired') !== -1)) {
          console.info('Looks like the token is expired, will try to refresh', res);
          return this.auth.refreshToken()
            .then(sendRequest);
        }
        return res;
      })
      .then(res => {
        if (res.status < 200 || res.status > 300) {
          throw res;
        }
        return res.json();
      });
  }

  getIssue(id) {
    const queryString = qs.stringify({
      fields: fields.singleIssue.toString()
    });
    return this.makeAuthorizedRequest(`${this.youTrackIssueUrl}/${id}?${queryString}`);
  }

  getIssues(query = '', $top, $skip = 0) {
    const queryString = qs.stringify({
      query, $top, $skip,
      fields: fields.issuesOnList.toString()
    });

    return this.makeAuthorizedRequest(`${this.youTrackIssueUrl}?${queryString}`);
  }

  getIssueFolders() {
    return this.makeAuthorizedRequest(`${this.youTrackIssuesFolderUrl}?fields=name,query`);
  }

  createIssue(issue) {
    return this.makeAuthorizedRequest(this.youTrackIssueUrl, 'POST', issue);
  }

  addComment(issueId, comment) {
    const url = `${this.youTrackIssueUrl}/${issueId}/comments`;
    return this.makeAuthorizedRequest(url, 'POST', {text: comment});
  }

  getUserFromHub(id) {
    const queryString = qs.stringify({fields: 'avatar/url'});

    return this.makeAuthorizedRequest(`${this.config.auth.serverUri}/api/rest/users/${id}?${queryString}`);
  }
}

module.exports = Api;
