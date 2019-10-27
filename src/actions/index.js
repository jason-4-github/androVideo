import * as actionTypes from './../constants/actionTypes';
import _ from 'lodash';

const importAll = (route) => { return route.keys().map(route); }

export const loadMarkdownFile = () => {
  return (dispatch) => {

    dispatch({ type: actionTypes.LOAD_MARKDOWN_REQUEST });
    const articlePath = importAll(require.context('./../constants', false, /\.(md)$/));
    const articleTitles = [];
    const articles = {};
    const articlesOutline = {};

    // fetch article titles
    _.map(articlePath, value => {
      const articleFileNameSplit = value.split("/");
      articleTitles.push(articleFileNameSplit[articleFileNameSplit.length - 1].split(".")[0]);
    })

    Promise.all(articlePath.map(path => fetch(path).then(res => res.text()) ))
    .then(texts => {
      _.map(texts, (value, key) => {
        articles[articleTitles[key]] = value;
        articlesOutline[articleTitles[key]] = value.substring(0,30);
      })

      dispatch({
        type: actionTypes.LOAD_MARKDOWN_SUCCESS,
        articles,
        articlesOutline,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.LOAD_MARKDOWN_FAILURE,
        message: err,
      });
    });




    // fetch(path)
    // .then(data => {
    //   return data.text();
    // })
    // .then(text => {
    //   const obj = { type: actionTypes.LOAD_MARKDOWN_SUCCESS };
    //   articles[actionName] = text;
    //   articlesOutline[actionName] = text.substring(0,30);
    //   dispatch({
    //     type: actionTypes.LOAD_MARKDOWN_SUCCESS,
    //     articles,
    //     articlesOutline,
    //   });
    // })
    // .catch((err) => {
    //   dispatch({
    //     type: actionTypes.LOAD_MARKDOWN_FAILURE,
    //     message: err,
    //   });
    // });
  }
}